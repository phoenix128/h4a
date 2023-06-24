'use client';

import React from 'react';
import {
    IComponentProps,
    IComponentSchema,
} from '@h4a/core/interface/component-interface';
import Image from 'next/image';
import useProductImage from '@h4a/bigcommerce/hooks/use-product-image';
import useSettings from '@h4a/bigcommerce/hooks/use-settings';
import ProductId from '@h4a/bigcommerce/components/PageBuilder/OptionsFields/ProductId';
import clsx from 'clsx';

export enum ProductImageType {
    card = 'card',
    max = 'max',
}

interface IProductImageProps extends IComponentProps {
    productId: number;
    format?: ProductImageType;
}

const ProductImage: React.FC<IProductImageProps> = ({
    productId,
    className = 'h4a-bigcommerce-product-image',
    format = ProductImageType.max,
}) => {
    const image = useProductImage(productId);
    const { imagesSizes } = useSettings();

    const { width, height } = imagesSizes[format];

    return (
        <div
            data-h4a-component="bigcommerce/product-image"
            className={clsx(className)}
        >
            <Image
                src={image?.url || ''}
                alt={image?.altText || ''}
                width={width}
                height={height}
            />
        </div>
    );
};

export const ProductImageSchema: IComponentSchema = {
    title: 'Product Image',
    maxChildren: 0,
    props: {
        productId: {
            title: 'Product',
            contextVariable: 'product.entityId',
            component: ProductId,
        },
    },
};

export default ProductImage;
