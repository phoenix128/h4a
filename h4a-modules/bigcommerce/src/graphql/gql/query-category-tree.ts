import { gql } from '@apollo/client';
import { FRAGMENT_CATEGORY_TREE_ITEM } from '@h4a/bigcommerce/graphql/gql/fragment-category-tree-item';

export const QUERY_CATEGORY_TREE = gql`
    ${FRAGMENT_CATEGORY_TREE_ITEM}
    query CategoryTree {
        site {
            categoryTree {
                ...FragmentCategoryTreeItem
            }
        }
    }
`;

export const QUERY_CATEGORY_TREE_DEEP = gql`
    ${FRAGMENT_CATEGORY_TREE_ITEM}
    query CategoryTree {
        site {
            categoryTree {
                ...FragmentCategoryTreeItem
                children {
                    ...FragmentCategoryTreeItem
                    children {
                        ...FragmentCategoryTreeItem
                        children {
                            ...FragmentCategoryTreeItem
                        }
                    }
                }
            }
        }
    }
`;
