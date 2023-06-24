import {
    DocumentNode,
    OperationVariables,
    TypedDocumentNode,
} from '@apollo/client/core';
import {
    LazyQueryResultTuple,
    QueryHookOptions,
} from '@apollo/client/react/types/types';
import useH4aClient from '@h4a/core/hooks/use-h4a-client';
import { useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';

const useH4aLazyQuery = <
    TData = any,
    TVariables extends OperationVariables = OperationVariables
>(
    module: string,
    query: DocumentNode | TypedDocumentNode<TData, TVariables>,
    options?: QueryHookOptions<TData, TVariables>
): LazyQueryResultTuple<TData, TVariables> => {
    const client = useH4aClient(module);
    const res = useLazyQuery(query, {
        fetchPolicy: 'cache-first',
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

export default useH4aLazyQuery;
