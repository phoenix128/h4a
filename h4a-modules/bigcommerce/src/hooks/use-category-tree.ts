import useH4aQuery from '@h4a/core/hooks/use-h4a-query';
import { QUERY_CATEGORY_TREE } from '@h4a/bigcommerce/graphql/gql/query-category-tree';

const useCategoryTree = () =>
    useH4aQuery('@h4a/bigcommerce', QUERY_CATEGORY_TREE);

export default useCategoryTree;
