import { IAddToCartItem } from '@h4a/bigcommerce/interface/cart-interface';
import useCartContext from '@h4a/bigcommerce/hooks/use-cart-context';
import { MUTATION_ADD_TO_CART } from '@h4a/bigcommerce/graphql/gql/mutation-add-to-cart';
import useH4aMutation from '@h4a/core/hooks/use-h4a-mutation';
import { useCallback } from 'react';
import useUpdateCartOwner from '@h4a/bigcommerce/hooks/use-update-cart-owner';
import {
    MutationFunctionOptions,
    MutationResult,
} from '@apollo/client/react/types/types';
import { ApolloCache, DefaultContext } from '@apollo/client/core';
import { FetchResult } from '@apollo/client/link/core';

type MutationTuple<
    TData,
    TVariables,
    TContext = DefaultContext,
    TCache extends ApolloCache<any> = ApolloCache<any>
> = [
    (
        item: IAddToCartItem,
        options?: MutationFunctionOptions<TData, TVariables, TContext, TCache>
    ) => Promise<FetchResult<TData>>,
    MutationResult<TData>
];

/**
 * Add to cart callback hook
 */
const useAddToCart = (): MutationTuple<any, any> => {
    const [cb, addToCartRes] = useH4aMutation(
        '@h4a/bigcommerce',
        MUTATION_ADD_TO_CART
    );
    const { setCart, cartId } = useCartContext();
    const [updateCartOwner, _] = useUpdateCartOwner();

    const addToCartResCb = useCallback(
        async (item: IAddToCartItem, options?: MutationFunctionOptions) => {
            if (cartId) {
                await updateCartOwner(cartId);
            }

            const res = await cb({
                ...options,
                variables: {
                    ...options?.variables,
                    cartId,
                    item,
                },
            });

            setCart(res.data?.addToCart);

            return res;
        },
        [cartId, cb, setCart, updateCartOwner]
    );

    return [addToCartResCb, addToCartRes];
};

export default useAddToCart;
