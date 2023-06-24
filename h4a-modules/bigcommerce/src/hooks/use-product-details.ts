import usePageContextVariable from '@h4a/core/hooks/use-page-context-variable';
import useH4aQuery from '@h4a/core/hooks/use-h4a-query';
import { QUERY_PRODUCT_DETAILS } from '@h4a/bigcommerce/graphql/gql/query-product';
import { Site } from '@h4a/bigcommerce/generated/gql/graphql';

const useProductDetails = (productId?: number) => {
    const rProductId = usePageContextVariable<number>(
        productId,
        'product.entityId'
    );
    return useH4aQuery<{ site: Site }>(
        '@h4a/bigcommerce',
        QUERY_PRODUCT_DETAILS,
        {
            variables: { entityId: rProductId },
        }
    );
};

export default useProductDetails;
