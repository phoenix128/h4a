import {
    MultipleChoiceOption,
    Variant,
} from '@h4a/bigcommerce/generated/gql/graphql';
import useSerializedMemo from '@h4a/core/hooks/use-serialized-memo';
import useVariantCompatibleOptions from '@h4a/bigcommerce/hooks/use-variant-compatible-options';
import { IProductOptionsState } from '@h4a/bigcommerce/interface/product-option-interface';

/**
 * Inverts the variant compatible options to incompatible options
 * @param variants
 * @param productOptions
 * @param selectionState
 */
const useVariantNonCompatibleOptions = (
    variants: Variant[],
    productOptions: MultipleChoiceOption[],
    selectionState: IProductOptionsState
): Record<number, number[]> => {
    const res: Record<number, number[]> = {};
    const variantCompatibleOptions = useVariantCompatibleOptions(
        variants,
        productOptions,
        selectionState
    );

    return useSerializedMemo(() => {
        for (const productOption of productOptions) {
            if (!productOption.values || !productOption.isVariantOption)
                continue;

            const optionId = productOption.entityId;
            const optionValues =
                productOption.values.edges?.map((e) => e!.node.entityId) || [];
            const compatibleOptions = variantCompatibleOptions[optionId] || [];

            res[optionId] = optionValues.filter(
                (v) => !compatibleOptions.includes(v)
            );
        }

        return res;
    }, [variants, productOptions, selectionState]);
};

export default useVariantNonCompatibleOptions;
