import usePageContextVariable from '@h4a/core/hooks/use-page-context-variable';
import useH4aQuery from '@h4a/core/hooks/use-h4a-query';
import { QUERY_PRODUCT } from '@h4a/bigcommerce/graphql/gql/query-product';

const useProduct = (productId?: number) => {
    const rProductId = usePageContextVariable<number>(
        productId,
        'product.entityId'
    );
    return useH4aQuery('@h4a/bigcommerce', QUERY_PRODUCT, {
        variables: { entityId: rProductId },
    });
};

export default useProduct;
