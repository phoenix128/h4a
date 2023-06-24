import {
    OperationVariables,
    DocumentNode,
    TypedDocumentNode,
} from '@apollo/client/core';
import {
    QueryHookOptions,
    QueryResult,
} from '@apollo/client/react/types/types';
import useH4aClient from '@h4a/core/hooks/use-h4a-client';
import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import usePageContext from '@h4a/core/hooks/use-page-context';
import cookiesSerialize from '@h4a/core/libs/cookies-serialize';

const useH4aQuery = <
    TData = any,
    TVariables extends OperationVariables = OperationVariables
>(
    module: string,
    query: DocumentNode | TypedDocumentNode<TData, TVariables>,
    options?: QueryHookOptions<TData, TVariables>
): QueryResult<TData, TVariables> => {
    const client = useH4aClient(module);
    const { cookies } = usePageContext();

    const res = useQuery<TData, TVariables>(query, {
        fetchPolicy: 'cache-first',
        context: {
            headers: {
                Cookie: cookiesSerialize(cookies),
            },
        },
        ...options,
        client,
    });

    useEffect(() => {
        if (res.error) {
            console.error(res.error);
        }
    }, [res.error]);

    return res;
};

export default useH4aQuery;
