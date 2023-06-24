import { IPluginGraphQl } from '@h4a/core/interface/plugin-interface';
import { stitchSchemas } from '@graphql-tools/stitch';
import { print } from 'graphql';
import _ from 'lodash';
import { schemaFromExecutor, wrapSchema } from '@graphql-tools/wrap';
import { AsyncExecutor } from '@graphql-tools/utils/typings/executor';
import getAreaConfig, {
    getDefaultAreaConfig,
} from '@h4a/core/libs/get-area-config';

import resolverCartSchema from '@h4a/bigcommerce/graphql/resolvers/cart';
import resolverCategoryProductsSchema from '@h4a/bigcommerce/graphql/resolvers/category-products';
import mutationUpdateCartOwnerSchema from '@h4a/bigcommerce/graphql/mutation/update-cart-owner';
import mutationLoginSchema from '@h4a/bigcommerce/graphql/mutation/login';
import mutationAddToCartSchema from '@h4a/bigcommerce/graphql/mutation/add-to-cart';

// Extend the BigCommerce GraphQL schema with custom types and resolvers
const createGraphQlSchema: IPluginGraphQl = async () => {
    /**
     * Custom replacement for "buildHTTPExecutor"
     * @param context
     * @param document
     * @param variables
     * @param operationName
     * @param extensions
     */
    const executor: AsyncExecutor = async ({
        context,
        document,
        variables,
        operationName,
        extensions,
    }) => {
        const query = print(document);
        const { bigcommerce: bigcommerceConfig } = context
            ? getAreaConfig(context.area)
            : getDefaultAreaConfig();

        if (!bigcommerceConfig) {
            throw new Error('BigCommerce config not found in area config');
        }

        // Forwarding area specific headers to BigCommerce
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${bigcommerceConfig.storefrontToken}`,
        };

        // Add the SHOP_TOKEN cookie to the request if it exists
        if (context?.bigcommerce) {
            const {
                customerData: { shopToken },
            } = context?.bigcommerce;

            if (shopToken) {
                headers['Cookie'] = `SHOP_TOKEN=${shopToken}`;
            }
        }

        // Forward the request to the BigCommerce GraphQL API
        try {
            const fetchResult = await fetch(bigcommerceConfig.graphqlEndpoint, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    query,
                    variables,
                    operationName,
                    extensions,
                }),
            });

            return fetchResult.json();
        } catch (e) {
            console.error(e);
            throw e;
        }
    };

    // BigCommerce schema
    const bigCommerceSchema = wrapSchema({
        schema: await schemaFromExecutor(executor),
        executor,
    });

    // Additional schemas H4A is providing
    const schemas: { typeDefs: any; resolvers?: any }[] = [
        // mutationAddToCartSchema,
        mutationLoginSchema,
        // mutationUpdateCartOwnerSchema,
        // resolverCartSchema,
        resolverCategoryProductsSchema,
    ];

    // Merge all typeDefs and resolvers
    // Resolvers will receive the original BigCommerce schema as first argument
    const typeDefs = schemas.map((s) => s.typeDefs);
    const resolvers = schemas.reduce((acc, s) => {
        const resolvers = s.resolvers;
        if (!resolvers) return acc;

        return _.merge(acc, resolvers(bigCommerceSchema));
    }, {});

    // Put all the pieces together
    return stitchSchemas({
        subschemas: [bigCommerceSchema],
        resolvers,
        typeDefs,
    });
};

export default createGraphQlSchema;
