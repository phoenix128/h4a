import { gql } from '@apollo/client';
import { FRAGMENT_PRODUCT } from '@h4a/bigcommerce/graphql/gql/fragment-product';

export const QUERY_PRODUCTS_BY_IDS = gql`
    ${FRAGMENT_PRODUCT}
    query ProductsByIds($entityIds: [Int!], $first: Int!) {
        site {
            products(entityIds: $entityIds, first: $first) {
                edges {
                    node {
                        ...FragmentProduct
                    }
                }
            }
        }
    }
`;
