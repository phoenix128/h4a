import {
    CatalogProductOption,
    MultipleChoiceOption,
} from '@h4a/bigcommerce/generated/gql/graphql';
import { useMemo } from 'react';
import { IProductOptionsState } from '@h4a/bigcommerce/interface/product-option-interface';

/**
 * Hook to retrieve the initial options values
 * @param productOptions
 */
const useInitialOptionsValues = (
    productOptions?: CatalogProductOption[]
): IProductOptionsState => {
    return useMemo(() => {
        const initialSelection: IProductOptionsState = {};

        if (productOptions) {
            for (const productOption of productOptions) {
                if (
                    (productOption as any).__typename === 'MultipleChoiceOption'
                ) {
                    const multipleChoiceOption =
                        productOption as MultipleChoiceOption;
                    // Find the node with "isDefault" set to true
                    const defaultValue =
                        multipleChoiceOption.values?.edges?.find(
                            (e) => e?.node?.isDefault
                        )?.node?.entityId;

                    if (defaultValue !== undefined)
                        initialSelection[multipleChoiceOption.entityId] =
                            defaultValue;
                } else {
                    initialSelection[productOption.entityId] = (
                        productOption as any
                    ).defaultValue;
                }
            }
        }

        return initialSelection;
    }, [productOptions]);
};

export default useInitialOptionsValues;
