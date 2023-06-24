import usePageContextVariable from '@h4a/core/hooks/use-page-context-variable';
import useH4aQuery from '@h4a/core/hooks/use-h4a-query';
import { QUERY_PRODUCTS_LIST } from '@h4a/bigcommerce/graphql/gql/query-product';

const useProductsList = (productIds: number[]) => {
    const realProductIds =
        usePageContextVariable<number[]>(productIds, 'products.entityId') || [];

    return useH4aQuery('@h4a/bigcommerce', QUERY_PRODUCTS_LIST, {
        variables: { entityIds: realProductIds },
    });
};

export default useProductsList;
