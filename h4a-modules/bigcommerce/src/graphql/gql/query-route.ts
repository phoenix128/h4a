import { gql } from '@apollo/client';
import { FRAGMENT_CATEGORY } from '@h4a/bigcommerce/graphql/gql/fragment-category';
import { FRAGMENT_PRODUCT_DETAILS } from '@h4a/bigcommerce/graphql/gql/fragment-product';

export const QUERY_ROUTE = gql`
    ${FRAGMENT_PRODUCT_DETAILS}
    ${FRAGMENT_CATEGORY}

    query Route($path: String!, $page: Int, $limit: Int) {
        site {
            route(path: $path) {
                node {
                    id
                    ... on Product {
                        ...FragmentProductDetails
                    }

                    ... on Category {
                        ...FragmentCategory
                    }
                }
            }
        }
    }
`;
