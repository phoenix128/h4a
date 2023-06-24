import { useState } from 'react';
import useEventListener from '@h4a/core/hooks/use-event-listener';
import { IVariantChangeEventDetail } from '@h4a/bigcommerce/interface/product-option-interface';
import { Variant } from '@h4a/bigcommerce/generated/gql/graphql';

/**
 * Return the selected variant for a specific product
 * @param productId
 */
const useProductVariantChange = (productId: number): Variant | undefined => {
    const [variant, setVariant] = useState<Variant | undefined>();

    if (productId === undefined) {
        console.warn('useProductVariantChange: productId is undefined');
    }

    // Sync with variant selection
    useEventListener<IVariantChangeEventDetail>('variant-change', (payload) => {
        if (productId !== payload.productId) return;

        if (payload.variant?.isPurchasable) {
            setVariant(payload.variant);
        } else {
            setVariant(undefined);
        }
    });

    return variant;
};

export default useProductVariantChange;
