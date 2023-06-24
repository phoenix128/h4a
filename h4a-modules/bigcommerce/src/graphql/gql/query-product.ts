import { gql } from '@apollo/client';
import {
    FRAGMENT_PRODUCT,
    FRAGMENT_PRODUCT_DETAILS,
} from '@h4a/bigcommerce/graphql/gql/fragment-product';

export const QUERY_PRODUCT = gql`
    ${FRAGMENT_PRODUCT}
    query Product($entityId: Int!) {
        site {
            product(entityId: $entityId, useDefaultOptionSelections: true) {
                ...FragmentProduct
            }
        }
    }
`;

export const QUERY_PRODUCTS_LIST = gql`
    ${FRAGMENT_PRODUCT}
    query Product($entityIds: [Int!]) {
        site {
            products(entityIds: $entityIds) {
                edges {
                    node {
                        ...FragmentProduct
                    }
                }
            }
        }
    }
`;

export const QUERY_PRODUCT_DETAILS = gql`
    ${FRAGMENT_PRODUCT_DETAILS}
    query ProductDetails($entityId: Int!) {
        site {
            product(entityId: $entityId, useDefaultOptionSelections: true) {
                ...FragmentProductDetails
            }
        }
    }
`;

export const QUERY_PRODUCT_SEARCH = gql`
    ${FRAGMENT_PRODUCT}
    query ProductSearch($searchTerm: String!) {
        site {
            search {
                searchProducts(filters: { searchTerm: $searchTerm }) {
                    products {
                        edges {
                            node {
                                ...FragmentProduct
                            }
                        }
                    }
                }
            }
        }
    }
`;
