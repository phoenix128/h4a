import { IPluginContext } from '@h4a/core/interface/plugin-interface';
import { gql } from 'graphql-tag';
import managementApi from '@h4a/bigcommerce/libs/management-api';
import convertCartResponse from '@h4a/bigcommerce/libs/convert-cart-response';
import { GraphQLSchema } from 'graphql/type';

interface IArgs {
    cartId?: string;
    item: {
        productId: number;
        variantId?: number;
        quantity?: number;
    };
}

export const typeDefs = gql`
    input AddToCartRequest {
        productId: Int!
        variantId: Int
        quantity: Int
    }

    type Mutation {
        addToCart(cartId: String, item: AddToCartRequest!): Cart!
    }
`;

const bigcommerceAddToCart = async (
    cartId: string | undefined,
    request: any,
    context: IPluginContext
) => {
    const {
        bigcommerce: {
            customerData: { customerId },
        },
    } = context;

    const include =
        'line_items.physical_items.options,line_items.digital_items.options';

    if (cartId) {
        return managementApi(
            'POST',
            `/carts/${cartId}/items`,
            { include },
            request,
            context
        );
    }

    return managementApi(
        'POST',
        `/carts`,
        { include },
        {
            ...request,
            customer_id: customerId,
        },
        context
    );
};

const addToCart =
    (bigcommerceSchema: GraphQLSchema) =>
    async (parent: any, { cartId, item }: IArgs, context: IPluginContext) => {
        const {
            bigcommerce: {
                settings: { channelId },
            },
        } = context;
        const { productId, variantId, quantity = 1 } = item;

        const request: any = {
            channel_id: channelId,
            line_items: [
                {
                    quantity,
                    product_id: productId,
                    variant_id: variantId,
                },
            ],
        };

        // Existing cart
        const { status, data, error } = await bigcommerceAddToCart(
            cartId,
            request,
            context
        );

        if (status === 404) {
            throw new Error(`Cart not found: ${cartId}`);
        }

        if (error) {
            throw new Error(`Failed to fetch cart: ${error}`);
        }

        return convertCartResponse(data);
    };

const resolvers = (bigCommerceSchema: GraphQLSchema) => ({
    Mutation: {
        addToCart: addToCart(bigCommerceSchema),
    },
});

const mutationAddToCartSchema = {
    typeDefs,
    resolvers,
};

export default mutationAddToCartSchema;
