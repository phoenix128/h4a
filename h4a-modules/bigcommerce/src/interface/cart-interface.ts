export interface IAddToCartItem {
    cartId?: string;
    productId: number;
    variantId?: number;
    quantity?: number;
}

export type ICart = any;
