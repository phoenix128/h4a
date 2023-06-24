import {
    OperationVariables,
    DocumentNode,
    TypedDocumentNode,
    DefaultContext,
    ApolloCache,
} from '@apollo/client/core';
import {
    MutationHookOptions,
    MutationTuple,
} from '@apollo/client/react/types/types';
import useH4aClient from '@h4a/core/hooks/use-h4a-client';
import { useMutation } from '@apollo/client';
import { useEffect } from 'react';

const useH4aMutation = <
    TData = any,
    TVariables = OperationVariables,
    TContext = DefaultContext,
    TCache extends ApolloCache<any> = ApolloCache<any>
>(
    module: string,
    mutation: DocumentNode | TypedDocumentNode<TData, TVariables>,
    options?: MutationHookOptions<TData, TVariables, TContext, TCache>
): MutationTuple<TData, TVariables, TContext, TCache> => {
    const client = useH4aClient(module);
    const res = useMutation(mutation, {
        ...options,
        client,
    });

    const { error } = res[1];

    useEffect(() => {
        if (error) {
            console.error(error);
        }
    }, [error]);

    return res;
};

export default useH4aMutation;
