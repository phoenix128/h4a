import usePageContextVariable from '@h4a/core/hooks/use-page-context-variable';
import useH4aQuery from '@h4a/core/hooks/use-h4a-query';
import { QUERY_CATEGORY } from '@h4a/bigcommerce/graphql/gql/query-category';

const useCategoryDetails = (categoryId?: number) => {
    const rCategoryId = usePageContextVariable(categoryId, 'category.entityId');
    return useH4aQuery('@h4a/bigcommerce', QUERY_CATEGORY, {
        variables: { entityId: rCategoryId },
    });
};

export default useCategoryDetails;
