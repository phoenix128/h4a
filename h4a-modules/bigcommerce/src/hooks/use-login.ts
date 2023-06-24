import { MUTATION_LOGIN } from '@h4a/bigcommerce/graphql/gql/mutation-login';
import { useCallback } from 'react';
import useH4aMutation from '@h4a/core/hooks/use-h4a-mutation';
import useSerializedEffect from '@h4a/core/hooks/use-serialized-effect';
import useCustomerContext from '@h4a/bigcommerce/hooks/use-customer-context';
import { ApolloCache, DefaultContext } from '@apollo/client/core';
import {
    MutationFunctionOptions,
    MutationResult,
} from '@apollo/client/react/types/types';
import { FetchResult } from '@apollo/client/link/core';

type MutationTuple<
    TData,
    TVariables,
    TContext = DefaultContext,
    TCache extends ApolloCache<any> = ApolloCache<any>
> = [
    (
        email: string,
        password: string,
        options?: MutationFunctionOptions<TData, TVariables, TContext, TCache>
    ) => Promise<FetchResult<TData>>,
    MutationResult<TData>
];

/**
 * Lazy login callback
 */
const useLogin = (): MutationTuple<any, any> => {
    const [cb, loginRes] = useH4aMutation('@h4a/bigcommerce', MUTATION_LOGIN);
    const { setCustomer } = useCustomerContext();
    const { data } = loginRes;

    const loginCb = useCallback(
        async (
            email: string,
            password: string,
            options?: MutationFunctionOptions
        ) => {
            return cb({
                ...options,
                variables: {
                    ...options?.variables,
                    email,
                    password,
                },
            });
        },
        [cb]
    );

    useSerializedEffect(() => {
        setCustomer(data?.login?.customer);
    }, [setCustomer, data]);

    return [loginCb, loginRes];
};

export default useLogin;
