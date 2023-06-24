import { IPluginContext } from '@h4a/core/interface/plugin-interface';
import { gql } from 'graphql-tag';
import managementApi from '@h4a/bigcommerce/libs/management-api';
import convertCartResponse from '@h4a/bigcommerce/libs/convert-cart-response';
import { GraphQLSchema } from 'graphql/type';

interface IArgs {
    cartId: string;
}

const typeDefs = gql`
    type Cart {
        id: String!
        customerId: Int
        email: String
        currency: String
        taxIncluded: Boolean
        baseAmount: Float!
        discountAmount: Float
        cartAmount: Float!
        coupons: [Coupon]
        discounts: [CartDiscount]
        lineItems: CartLineItems
        createdTime: String!
        updatedTime: String!
        channelId: Int!
        locale: String!
        promotions: [CartPromotion]
    }

    type CartLineItems {
        physicalItems: [CartPhysicalItem]
        digitalItems: [CartDigitalItem]
        giftCertificates: [CartGiftCertificateItem]
        customItems: [CartCustomItem]
    }

    type Coupon {
        id: String!
        code: String!
        couponType: CartCouponType!
        discountedAmount: Float!
    }

    enum CartCouponType {
        PER_ITEM_DISCOUNT
        PERCENTAGE_DISCOUNT
        PER_TOTAL_DISCOUNT
        SHIPPING_DISCOUNT
        FREE_SHIPPING
        PROMOTION
    }

    type CartDiscount {
        id: String!
        discountedAmount: Float!
    }

    type CartPhysicalItem {
        id: String!
        variantId: Int!
        productId: Int!
        sku: String
        name: String
        weight: Float
        dimensions: CartDimensions
        url: String
        quantity: Int!
        isTaxable: Boolean
        imageUrl: String
        discounts: [CartDiscount]
        coupons: [Coupon]
        discountedAmount: Float
        couponAmount: Float
        originalPrice: Float
        listPrice: Float
        salePrice: Float
        extendedListPrice: Float
        extendedSalePrice: Float
        options: [CartOption]
    }

    type CartPromotion {
        banners: [CartBanner]
    }

    type CartBanner {
        id: String!
        type: String
        page: [String]
        text: String
    }

    type CartDigitalItem {
        id: String!
        variantId: Int!
        productId: Int!
        sku: String
        name: String
        url: String
        quantity: Int!
        isTaxable: Boolean
        imageUrl: String
        discounts: [CartDiscount]
        coupons: [Coupon]
        discountedAmount: Float
        couponAmount: Float
        originalPrice: Float
        listPrice: Float
        salePrice: Float
        extendedListPrice: Float
        extendedSalePrice: Float
        options: [CartOption]
        downloadFileUrls: [String]
        downloadPageUrl: String
        downloadSize: Float
    }

    type CartOption {
        name: String
        nameId: Int
        value: String
        valueId: Int
    }

    type CartDimensions {
        height: Float
        width: Float
        depth: Float
    }

    type CartEmailContact {
        name: String
        email: String
    }

    type CartGiftCertificateItem {
        id: String!
        name: String
        theme: String
        amount: Float
        sender: CartEmailContact
        recipient: CartEmailContact
        message: String
    }

    type CartCustomItem {
        id: String!
        name: String
        quantity: Int
        sku: String
        listPrice: Float
    }

    type Query {
        cart(cartId: String!): Cart
    }
`;

const cart = async (
    parent: any,
    { cartId }: IArgs,
    context: IPluginContext
) => {
    const {
        bigcommerce: {
            customerData: { customerId },
        },
    } = context;

    const include =
        'line_items.physical_items.options,line_items.digital_items.options';

    const { status, data, error } = await managementApi(
        'GET',
        `/carts/${cartId}`,
        {
            include,
        },
        null,
        context
    );

    if (status === 404 || (data && data.customer_id !== customerId)) {
        throw new Error(`Cart not found: ${cartId}`);
    }

    if (error) {
        throw new Error(`Failed to fetch cart: ${error}`);
    }

    return convertCartResponse(data);
};

const resolvers = (bigCommerceSchema: GraphQLSchema) => ({
    Query: {
        cart,
    },
});

const resolverCartSchema = {
    typeDefs,
    resolvers,
};

export default resolverCartSchema;
