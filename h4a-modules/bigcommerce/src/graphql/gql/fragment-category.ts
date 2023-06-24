import { gql } from '@apollo/client';
import { FRAGMENT_PRODUCT } from '@h4a/bigcommerce/graphql/gql/fragment-product';

export const FRAGMENT_CATEGORY = gql`
    ${FRAGMENT_PRODUCT}
    fragment FragmentCategory on Category {
        id
        entityId
        name
        paginatedProducts(page: $page, limit: $limit) {
            items {
                ...FragmentProduct
            }
            totalItems
            totalPages
            perPage
            currentPage
        }
    }
`;
