'use client';

import React from 'react';
import useProductDetails from '@h4a/bigcommerce/hooks/use-product-details';
import {
    IComponentProps,
    IComponentSchema,
} from '@h4a/core/interface/component-interface';
import Html from '@h4a/ui/components/Html';
import ProductPrices from '@h4a/bigcommerce/components/ProductPrices';
import Section from '@h4a/ui/components/Section';
import { useTranslation } from 'react-i18next';
import ProductId from '@h4a/bigcommerce/components/PageBuilder/OptionsFields/ProductId';

export interface IProductDetailsProps extends IComponentProps {
    productId: number;
}

const ProductDetails: React.FC<IProductDetailsProps> = ({
    productId,
    className = 'h4a-bigcommerce-product-details',
}) => {
    const { data } = useProductDetails(productId);
    const product = data?.site.product;
    const { t } = useTranslation();

    return (
        <section
            className={className}
            data-h4a-component="bigcommerce/product-details"
        >
            <h1 className="h4a-product-name">{product?.name}</h1>
            <Section className="h4a-product-sku">
                {t('product.sku')}: <span>{product?.sku}</span>
            </Section>
            <ProductPrices productId={productId} />
            <Html
                className="h4a-product-description"
                html={product?.description}
            />
        </section>
    );
};

export const ProductDetailsSchema: IComponentSchema = {
    title: 'Product Details',
    maxChildren: 0,
    props: {
        productId: {
            title: 'Product',
            component: ProductId,
        },
    },
};

export default ProductDetails;
