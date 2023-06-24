import { Variant } from '@h4a/bigcommerce/generated/gql/graphql';
import { useMemo } from 'react';
import { IProductOptionsState } from '@h4a/bigcommerce/interface/product-option-interface';

const useVariantBySelectedOptions = (
    variants: Variant[] | undefined,
    selection: IProductOptionsState | undefined
) => {
    return useMemo(() => {
        if (!variants || !selection) {
            return;
        }

        return variants.find((variant) => {
            const variantOptions = variant.options?.edges?.map(
                (e) => e?.node.values?.edges?.[0]?.node.entityId as number
            );

            const expectedSelection =
                variant.options?.edges?.reduce<IProductOptionsState>(
                    (acc, edge) => {
                        const optionId = edge?.node.entityId as number;
                        acc[optionId] = edge?.node.values?.edges?.[0]?.node
                            .entityId as number;
                        return acc;
                    },
                    {}
                );

            if (!expectedSelection) {
                return false;
            }

            // Check if the selection has all the values of the expectedSelection
            return Object.entries(expectedSelection).every(
                ([optionId, valueId]) => {
                    return selection[Number(optionId)] === valueId;
                }
            );
        });
    }, [variants, selection]);
};

export default useVariantBySelectedOptions;
