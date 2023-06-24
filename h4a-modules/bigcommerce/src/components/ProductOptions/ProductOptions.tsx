import {
    IComponentProps,
    IComponentSchema,
} from '@h4a/core/interface/component-interface';
import React, { useCallback, useEffect, useState } from 'react';
import useProductDetails from '@h4a/bigcommerce/hooks/use-product-details';
import Section from '@h4a/ui/components/Section';
import ProductOption from '@h4a/bigcommerce/components/ProductOptions/ProductOption';
import {
    CatalogProductOption,
    MultipleChoiceOption,
} from '@h4a/bigcommerce/generated/gql/graphql';
import useVariantNonCompatibleOptions from '@h4a/bigcommerce/hooks/use-variant-non-compatible-options';
import useInitialOptionsValues from '@h4a/bigcommerce/hooks/use-initial-options-values';
import useVariantBySelectedOptions from '@h4a/bigcommerce/hooks/use-variant-by-selected-options';
import {
    IProductOptionsState,
    IVariantChangeEventDetail,
} from '@h4a/bigcommerce/interface/product-option-interface';
import useEventCallback from '@h4a/core/hooks/use-event-callback';
import { useTimeout } from 'usehooks-ts';
import ProductId from '@h4a/bigcommerce/components/PageBuilder/OptionsFields/ProductId';

export interface IProductOptionsProps extends IComponentProps {
    productId: number;
    onOptionChange?: (option: CatalogProductOption, value: any) => void;
    onVariantChange?: (variant: any) => void;
}

const ProductOptions: React.FC<IProductOptionsProps> = ({
    productId,
    className = 'h4a-bigcommerce-product-options',
    onOptionChange,
    onVariantChange,
}) => {
    const { data } = useProductDetails(productId);
    const product = data?.site.product;
    const productOptions = product?.productOptions.edges?.map((po) => po!.node);

    const initialOptionsValues = useInitialOptionsValues(productOptions);
    const [optionsValues, setOptionsValues] =
        useState<IProductOptionsState>(initialOptionsValues);
    const variants = product?.variants.edges?.map((o) => o!.node);
    const selectedVariant = useVariantBySelectedOptions(
        variants,
        optionsValues
    );
    const variantChangeEvent =
        useEventCallback<IVariantChangeEventDetail>('variant-change');

    const disabledOptions = useVariantNonCompatibleOptions(
        variants!,
        productOptions as MultipleChoiceOption[],
        optionsValues
    );

    const handleOptionChange = useCallback(
        (option: CatalogProductOption, value: any) => {
            onOptionChange && onOptionChange(option, value);
            const newSelection = { ...optionsValues, [option.entityId]: value };
            setOptionsValues(newSelection);
        },
        [onOptionChange, optionsValues]
    );

    useEffect(() => {
        onVariantChange && onVariantChange(selectedVariant);
        variantChangeEvent({
            variant: selectedVariant,
            productId: product!.entityId,
        });
    }, [
        selectedVariant,
        onVariantChange,
        variantChangeEvent,
        productId,
        product,
    ]);

    // FIX: The event is dispatched, but not received
    // TODO: Find a better solution
    useTimeout(() => {
        variantChangeEvent({
            variant: selectedVariant,
            productId: product!.entityId,
        });
    }, 200);

    return (
        <Section
            className={className}
            data-h4a-component="bigcommerce/product-options"
        >
            {productOptions?.map((po: any) => {
                return (
                    <ProductOption
                        key={po.entityId}
                        option={po}
                        onOptionChange={handleOptionChange}
                        disabledOptions={disabledOptions[po.entityId]}
                        value={optionsValues[po.entityId]}
                    />
                );
            })}
        </Section>
    );
};

export const ProductOptionsSchema: IComponentSchema = {
    title: 'Product Options',
    maxChildren: 0,
    props: {
        productId: {
            title: 'Product',
            component: ProductId,
        },
    },
};

export default ProductOptions;
