import {
    MultipleChoiceOption,
    Variant,
} from '@h4a/bigcommerce/generated/gql/graphql';
import useSerializedMemo from '@h4a/core/hooks/use-serialized-memo';
import { IProductOptionsState } from '@h4a/bigcommerce/interface/product-option-interface';

type INormalizedVariantsMap = Record<number, [boolean, Record<number, number>]>;

/**
 * Creates a map of normalized variants with following format:
 *
 * {
 *   variantId1: [isPurchasable1, { optionId1: optionValueId1, optionId2: optionValueId2, ... }],
 *   variantId2: [isPurchasable2, { optionId1: optionValueId1, optionId2: optionValueId2, ... }],
 *   ...
 * }
 *
 * @param variants
 */
const buildNormalizedVariantsMap = (
    variants: Variant[]
): INormalizedVariantsMap => {
    return variants.reduce<INormalizedVariantsMap>((acc, variant) => {
        const { isPurchasable, options } = variant;
        const variantOptionValue = options.edges?.reduce((acc: any, edge) => {
            const values = edge!.node.values.edges?.map(
                (e) => e!.node.entityId
            );
            acc[edge!.node.entityId] = values![0];

            return acc;
        }, {});

        acc[variant.entityId] = [isPurchasable, variantOptionValue];

        return acc;
    }, {});
};

/**
 * Find compatible variants based on current selection state
 * @param variantMap
 * @param selectionState
 */
const findAvailableVariants = (
    variantMap: INormalizedVariantsMap,
    selectionState: IProductOptionsState
): INormalizedVariantsMap => {
    const compatibleVariants: INormalizedVariantsMap = {};

    for (const variantId of Object.keys(variantMap).map(Number)) {
        const [isPurchasable, variantOptions] = variantMap[variantId];

        // Check if variant is purchasable
        if (!isPurchasable) {
            continue;
        }

        const hasNonCompatibleOptions = Object.keys(selectionState)
            .map(Number)
            .some((optionId) => {
                const valueId = selectionState[optionId];
                return valueId && variantOptions[optionId] !== valueId;
            });

        if (!hasNonCompatibleOptions) {
            compatibleVariants[variantId] = [isPurchasable, variantOptions];
        }
    }

    return compatibleVariants;
};

/**
 * Returns a map of compatible options for each variant
 * @param variants
 * @param productOptions
 * @param selectionState
 */
const useVariantCompatibleOptions = (
    variants: Variant[],
    productOptions: MultipleChoiceOption[],
    selectionState: IProductOptionsState
): Record<number, number[]> => {
    return useSerializedMemo(() => {
        const res: Record<number, any[]> = {};
        const optionsUsedForVariants = productOptions.filter(
            (o) => o.isVariantOption
        );
        const variantMap = buildNormalizedVariantsMap(variants);

        for (const optionUsedForVariants of optionsUsedForVariants) {
            // Check if at least one variant exists with this option value and the other options selection
            const otherVariantOptionsIds = optionsUsedForVariants
                .map((o) => o.entityId)
                .filter((id) => id !== optionUsedForVariants.entityId);

            // Create a partial selection state without the current option
            const partialSelectionState =
                otherVariantOptionsIds.reduce<IProductOptionsState>(
                    (acc, optionId) => {
                        acc[optionId] = selectionState[optionId];
                        return acc;
                    },
                    {}
                );

            // Find all the variants compatible with the other selected options
            const compatibleVariants = findAvailableVariants(
                variantMap,
                partialSelectionState
            );

            // Create a list of compatible option values for this option
            res[optionUsedForVariants.entityId] = Object.keys(
                Object.values(compatibleVariants).reduce<
                    Record<number, boolean>
                >((acc, [_, variantOptions]) => {
                    const myOption =
                        variantOptions[optionUsedForVariants.entityId];
                    acc[myOption] = true;
                    return acc;
                }, {})
            ).map(Number);
        }

        return res;
    }, [productOptions, selectionState, variants]);
};

export default useVariantCompatibleOptions;
