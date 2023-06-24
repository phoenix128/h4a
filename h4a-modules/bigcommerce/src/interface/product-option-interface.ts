import { Variant } from '@h4a/bigcommerce/generated/gql/graphql';

export type IProductOptionsState = Record<number, any>;

export interface IVariantChangeEventDetail {
    productId: number;
    variant?: Variant;
}
