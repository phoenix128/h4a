import { gql } from '@apollo/client';
import settings from '@h4a/bigcommerce/settings';
import { FRAGMENT_PRICES } from '@h4a/bigcommerce/graphql/gql/fragment-prices';

const {
    imagesSizes: { max, swatches },
    prices: { includeTax },
} = settings;

export const FRAGMENT_PRODUCT = gql`
    ${FRAGMENT_PRICES}
    fragment FragmentProduct on Product {
        id
        entityId
        name
        sku
        path
        defaultImage {
            url(width: ${max.width}, height: ${max.height})
            altText
        }
        prices(includeTax: ${includeTax}) {
            ...FragmentPrices
        }
        variants {
            edges {
                node {
                    entityId
                }
            }  
        }
    }
`;

export const FRAGMENT_PRODUCT_DETAILS = gql`
    ${FRAGMENT_PRICES}
    fragment FragmentProductDetails on Product {
        id
        entityId
        name
        sku
        path
        description
        defaultImage {
            url(width: ${max.width}, height: ${max.height})
            altText
        }
        brand {
            name
        }
        inventory {
            isInStock
        }
        prices(includeTax: ${includeTax}) {
            ...FragmentPrices
        }
        productOptions {
            edges {
                node {
                    displayName
                    entityId
                    isVariantOption
                    isRequired
                    ... on TextFieldOption {
                        defaultValue
                        minLength
                        maxLength
                    }
                    ... on MultiLineTextFieldOption {
                        defaultValue
                        minLength
                        maxLength
                        maxLines
                    }
                    ... on MultipleChoiceOption
                    {
                        displayStyle
                        values {
                            edges {
                                node {
                                    entityId
                                    isDefault
                                    label
                                    ... on SwatchOptionValue {
                                        hexColors
                                        imageUrl(width: ${swatches.width}, height: ${swatches.height})
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        variants(first: 250) {
            edges {
                node {
                    sku
                    entityId
                    isPurchasable
                    inventory {
                        isInStock
                    }
                    prices(includeTax: ${includeTax}) {
                        ...FragmentPrices
                    }
                    options {
                        edges {
                            node {
                                entityId
                                values {
                                    edges {
                                        node {
                                            entityId
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;
