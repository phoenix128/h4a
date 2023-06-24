import useH4aMutation from '@h4a/core/hooks/use-h4a-mutation';
import { useCallback } from 'react';
import { MUTATION_UPDATE_CART_OWNER } from '@h4a/bigcommerce/graphql/gql/mutation-update-cart-owner';
import {
    MutationFunctionOptions,
    MutationResult,
} from '@apollo/client/react/types/types';
import { FetchResult } from '@apollo/client/link/core';
import { ApolloCache, DefaultContext } from '@apollo/client/core';

type MutationTuple<
    TData,
    TVariables,
    TContext = DefaultContext,
    TCache extends ApolloCache<any> = ApolloCache<any>
> = [
    (
        cartId: string,
        options?: MutationFunctionOptions<TData, TVariables, TContext, TCache>
    ) => Promise<FetchResult<TData>>,
    MutationResult<TData>
];

const useUpdateCartOwner = (): MutationTuple<any, any> => {
    const [cb, addToCartRes] = useH4aMutation(
        '@h4a/bigcommerce',
        MUTATION_UPDATE_CART_OWNER,
        {
            fetchPolicy: 'no-cache',
        }
    );

    const updateOwnerResCb = useCallback(
        async (
            cartId: string,
            options?: MutationFunctionOptions
        ): Promise<FetchResult<any>> => {
            if (!cartId) return {};

            return await cb({
                ...options,
                variables: {
                    ...options?.variables,
                    cartId,
                },
            });
        },
        [cb]
    );

    return [updateOwnerResCb, addToCartRes];
};

export default useUpdateCartOwner;
