import { useEffect, useState } from 'react';
import { Prices, Product } from '@h4a/bigcommerce/generated/gql/graphql';
import useProductVariantChange from '@h4a/bigcommerce/hooks/use-product-variant-change';

/**
 * Return the selected variant prices for a specific product
 * @param product
 */
const useProductVariantPricesChange = (
    product: Product | undefined
): Prices | undefined => {
    const variant = useProductVariantChange(product?.entityId || 0);
    const [prices, setPrices] = useState<Prices | undefined>(
        product?.prices || undefined
    );

    if (product === undefined) {
        console.warn('useProductVariantPriceChange: product is undefined');
    }

    useEffect(() => {
        if (variant?.prices) {
            setPrices(variant.prices);
        } else {
            setPrices(product?.prices || undefined);
        }
    }, [product?.prices, variant?.prices]);

    return prices;
};

export default useProductVariantPricesChange;
