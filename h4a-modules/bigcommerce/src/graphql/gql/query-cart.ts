import { gql } from '@apollo/client';
import { FRAGMENT_CART } from '@h4a/bigcommerce/graphql/gql/fragment-cart';

export const QUERY_CART = gql`
    ${FRAGMENT_CART}

    query Cart($cartId: String!) {
        cart(cartId: $cartId) {
            ...FragmentCart
        }
    }
`;
