import { gql } from '@apollo/client';
import { FRAGMENT_MONEY } from '@h4a/bigcommerce/graphql/gql/fragment-money';

export const FRAGMENT_PRICES = gql`
    ${FRAGMENT_MONEY}
    fragment FragmentPrices on Prices {
        price {
            ...FragmentMoney
        }
        basePrice {
            ...FragmentMoney
        }
    }
`;
