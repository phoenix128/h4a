import useH4aQuery from '@h4a/core/hooks/use-h4a-query';
import { Site } from '@h4a/bigcommerce/generated/gql/graphql';
import { QUERY_PRODUCT_SEARCH } from '@h4a/bigcommerce/graphql/gql/query-product';

const useProductSearch = (text?: string) => {
    return useH4aQuery<{ site: Site }>(
        '@h4a/bigcommerce',
        QUERY_PRODUCT_SEARCH,
        {
            variables: { searchTerm: text || '' },
        }
    );
};

export default useProductSearch;
