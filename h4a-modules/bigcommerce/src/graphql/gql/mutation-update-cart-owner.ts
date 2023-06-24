import { gql } from '@apollo/client';
import { FRAGMENT_CART } from '@h4a/bigcommerce/graphql/gql/fragment-cart';

export const MUTATION_UPDATE_CART_OWNER = gql`
    ${FRAGMENT_CART}

    mutation UpdateCartOwner($cartId: String!) {
        updateCartOwner(cartId: $cartId) {
            ...FragmentCart
        }
    }
`;
