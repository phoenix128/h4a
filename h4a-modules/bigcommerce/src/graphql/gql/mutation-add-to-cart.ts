import { gql } from '@apollo/client';
import { FRAGMENT_CART } from '@h4a/bigcommerce/graphql/gql/fragment-cart';

export const MUTATION_ADD_TO_CART = gql`
    ${FRAGMENT_CART}

    mutation AddToCart($cartId: String, $item: AddToCartRequest!) {
        addToCart(cartId: $cartId, item: $item) {
            ...FragmentCart
        }
    }
`;
