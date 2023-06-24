import { IPluginContext } from '@h4a/core/interface/plugin-interface';
import { gql } from 'graphql-tag';
import managementApi from '@h4a/bigcommerce/libs/management-api';
import convertCartResponse from '@h4a/bigcommerce/libs/convert-cart-response';
import { GraphQLSchema } from 'graphql/type';

interface IArgs {
    cartId: string;
}

export const typeDefs = gql`
    type Mutation {
        updateCartOwner(cartId: String!): Cart!
    }
`;

const updateCartOwner =
    (bigCommerceSchema: GraphQLSchema) =>
    async (parent: any, { cartId }: IArgs, context: IPluginContext) => {
        const {
            bigcommerce: {
                customerData: { customerId },
            },
        } = context;

        const include =
            'line_items.physical_items.options,line_items.digital_items.options';

        const request = {
            customer_id: customerId,
        };

        const { status, data, error } = await managementApi(
            'PUT',
            `/carts/${cartId}`,
            { include },
            request,
            context
        );

        return convertCartResponse(data);
    };

const resolvers = (bigCommerceSchema: GraphQLSchema) => ({
    Mutation: {
        updateCartOwner: updateCartOwner(bigCommerceSchema),
    },
});

const mutationUpdateCartOwnerSchema = {
    typeDefs,
    resolvers,
};

export default mutationUpdateCartOwnerSchema;
