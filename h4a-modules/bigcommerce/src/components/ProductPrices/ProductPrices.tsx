import React from 'react';
import settings from '@h4a/bigcommerce/settings';
import { IComponentProps } from '@h4a/core/interface/component-interface';
import Price from '@h4a/bigcommerce/components/Price';
import useProduct from '@h4a/bigcommerce/hooks/use-product';
import useProductVariantPricesChange from '@h4a/bigcommerce/hooks/use-product-variant-prices-change';

export interface IProductCardProps extends IComponentProps {
    productId: number;
}

const ProductPrices: React.FC<IProductCardProps> = ({
    productId,
    className = 'h4a-bigcommerce-product-prices',
}) => {
    const { data } = useProduct(productId);
    const product = data?.site.product;
    const prices = useProductVariantPricesChange(product);

    const basePrice = prices?.basePrice?.value || 0;
    const price = prices?.price?.value || 0;
    const currencyCode = prices?.price?.currencyCode || 'EUR';

    const {
        imagesSizes: { card },
    } = settings;

    return (
        <div
            className={className}
            data-h4a-component="bigcommerce/product-prices"
        >
            {price < basePrice && (
                <Price
                    className="h4a-price-strike"
                    amount={basePrice}
                    currencyCode={currencyCode}
                />
            )}
            <Price
                className="h4a-price-final"
                amount={price}
                currencyCode={currencyCode}
            />
        </div>
    );
};

export default ProductPrices;
