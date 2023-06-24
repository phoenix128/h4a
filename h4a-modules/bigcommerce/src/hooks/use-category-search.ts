import useH4aQuery from '@h4a/core/hooks/use-h4a-query';
import { Site } from '@h4a/bigcommerce/generated/gql/graphql';
import { QUERY_CATEGORY_TREE_DEEP } from '@h4a/bigcommerce/graphql/gql/query-category-tree';

const useCategorySearch = (text?: string) => {
    const res = useH4aQuery<{ site: Site }>(
        '@h4a/bigcommerce',
        QUERY_CATEGORY_TREE_DEEP
    );

    const flattify = (list: any[], level: number): any[] => {
        const res = [];

        for (const item of list) {
            res.push({ ...item, level });
            if (item.children) {
                res.push(...flattify(item.children, level + 1));
            }
        }

        return res;
    };

    const flattenList = flattify(res?.data?.site?.categoryTree || [], 0);

    if (!text) return flattenList;

    return flattenList.filter(
        (item) =>
            item.name.toLowerCase().includes(text.toLowerCase()) ||
            item.path.toLowerCase().includes(text.toLowerCase())
    );
};

export default useCategorySearch;
