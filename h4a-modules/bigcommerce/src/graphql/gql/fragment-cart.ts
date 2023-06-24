import { gql } from '@apollo/client';

export const FRAGMENT_CART = gql`
    fragment FragmentCart on Cart {
        id
        customerId
        email
    }
`;
