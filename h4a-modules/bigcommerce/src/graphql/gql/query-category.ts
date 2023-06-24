import { gql } from '@apollo/client';
import { FRAGMENT_CATEGORY } from '@h4a/bigcommerce/graphql/gql/fragment-category';

export const QUERY_CATEGORY = gql`
    ${FRAGMENT_CATEGORY}
    query Category($entityId: Int!, $page: Int, $limit: Int) {
        site {
            category(entityId: $entityId) {
                ...FragmentCategory
            }
        }
    }
`;
