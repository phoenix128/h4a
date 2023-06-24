import { gql } from '@apollo/client';

export const FRAGMENT_MONEY = gql`
    fragment FragmentMoney on Money {
        currencyCode
        value
    }
`;
