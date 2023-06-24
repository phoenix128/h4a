'use client';

import React, { useCallback, useState } from 'react';
import {
    IComponentProps,
    IComponentSchema,
} from '@h4a/core/interface/component-interface';
import { useTranslation } from 'react-i18next';
import useAddToCart from '@h4a/bigcommerce/hooks/use-add-to-cart';
import Button from '@h4a/ui/components/Button';
import useProduct from '@h4a/bigcommerce/hooks/use-product';
import useProductVariantChange from '@h4a/bigcommerce/hooks/use-product-variant-change';

export interface IAddToCartProps extends IComponentProps {
    productId: number;
    variantId?: number;
    quantity?: number;
    onClick?: () => void;
}

const AddToCart: React.FC<IAddToCartProps> = ({
    productId,
    variantId: initialVariantId,
    quantity = 1,
    className = 'h4a-bigcommerce-add-to-cart',
    onClick,
}) => {
    const { data } = useProduct(productId);
    const product = data?.site.product;

    const [addToCart, { loading }] = useAddToCart();
    const { t } = useTranslation();
    const variant = useProductVariantChange(product.entityId);

    const handleClick = useCallback(() => {
        (async () => {
            if (onClick) {
                onClick();
            }
            await addToCart({
                productId: product.entityId,
                variantId: variant?.entityId,
                quantity,
            });
        })();
    }, [onClick, addToCart, variant?.entityId, product.entityId, quantity]);

    // If the product has variants and no selection is made, disable the button
    const isDisabled = product.variants?.edges?.length > 1 && !variant;

    return (
        <Button
            className={className}
            isPrimary={true}
            onClick={handleClick}
            disabled={loading || isDisabled}
        >
            {t('product.add-to-cart')}
        </Button>
    );
};

export const AddToCartSchema: IComponentSchema = {
    title: 'Add to cart',
    maxChildren: 0,
};

export default AddToCart;
