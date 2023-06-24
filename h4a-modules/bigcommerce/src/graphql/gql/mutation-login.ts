import { gql } from '@apollo/client';

export const MUTATION_LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            result
            customer {
                entityId
                customerGroupId
                email
            }
        }
    }
`;
