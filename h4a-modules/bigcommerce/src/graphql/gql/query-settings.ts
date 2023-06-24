import { gql } from '@apollo/client';

export const QUERY_SETTINGS = gql`
    query Settings {
        site {
            settings {
                id: channelId
                channelId
                inventory {
                    defaultOutOfStockMessage
                    hideInProductFiltering
                    optionOutOfStockBehavior
                    productOutOfStockBehavior
                    showOutOfStockMessage
                    showPreOrderStockLevels
                    stockLevelDisplay
                }
            }
        }
    }
`;
