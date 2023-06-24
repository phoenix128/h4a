import { mutation } from '@h4a/bigcommerce/libs/graphql-storefront';
import { IPluginContext } from '@h4a/core/interface/plugin-interface';
import { gql } from 'graphql-tag';
import { MUTATION_LOGIN } from '@h4a/bigcommerce/graphql/gql/mutation-login';
import getAreaConfig from '@h4a/core/libs/get-area-config';
import jwt from 'jsonwebtoken';
import { COOKIE_CUSTOMER_PREFIX } from '@h4a/bigcommerce/interface/customer-interface';
import { GraphQLSchema } from 'graphql/type';
import { GraphQLResolveInfo, print, parse } from 'graphql/index';
import extractRequestFragments from '@h4a/bigcommerce/libs/extract-request-fragments';

interface IArgs {
    email: string;
    password: string;
}

export const typeDefs = gql`
    type LoginResult {
        result: String!
        customer: Customer
    }

    type Customer {
        entityId: Int!
        customerGroupId: Int!
        email: String!
        shopToken: String!
    }

    type Mutation {
        login(email: String!, password: String!): LoginResult!
    }
`;

const buildSessionCookie = (area: string, headers: Headers, data: any) => {
    if (!headers.get('Set-Cookie'))
        throw new Error('No Set-Cookie header found');

    // @ts-ignore
    const setCookieLines = headers.getAll('Set-Cookie');
    const setShopTokenCookieLine = setCookieLines.find((c: string) =>
        c.startsWith('SHOP_TOKEN=')
    );

    if (!setShopTokenCookieLine) throw new Error('No SHOP_TOKEN cookie found');
    const shopToken = setShopTokenCookieLine.match(/^SHOP_TOKEN=(.+?);/)[1];

    const {
        bigcommerce: { jwtSecret },
    } = getAreaConfig(area);

    const jwtValue = jwt.sign(
        {
            data: {
                ...data,
                shopToken,
            },
        },
        '' + jwtSecret
    );

    const setCookie = setShopTokenCookieLine.replace(
        /^SHOP_TOKEN=.+?;/,
        `${COOKIE_CUSTOMER_PREFIX + area}=${jwtValue};`
    );

    return {
        setCookie,
        shopToken,
    };
};

const login =
    (bigCommerceSchema: GraphQLSchema) =>
    async (
        parent: any,
        { email, password }: IArgs,
        context: IPluginContext,
        info: GraphQLResolveInfo
    ) => {
        // Cannot use a delegate here because BigCommerce will send
        // back cookies and using a delegate will not forward them
        const res = await mutation(
            parse(print(info.operation)),
            {
                email,
                password,
            },
            context
        );

        // Add shop token from cookies to the response
        if (res.data.login.result === 'success') {
            const { setCookie, shopToken } = buildSessionCookie(
                context.area,
                res.headers,
                res.data.login.customer
            );
            res.data.login.customer.shopToken = shopToken;

            if (context.responseHeaders === undefined) {
                context.responseHeaders = {};
            }
            context.responseHeaders['Set-Cookie'] = setCookie;
        }

        return res.data.login;
    };

const resolvers = (bigCommerceSchema: GraphQLSchema) => ({
    Mutation: {
        login: login(bigCommerceSchema),
    },
});

const mutationLoginSchema = {
    typeDefs,
    resolvers,
};

export default mutationLoginSchema;
