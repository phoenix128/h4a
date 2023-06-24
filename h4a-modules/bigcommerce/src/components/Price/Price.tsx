import React from 'react';
import { IComponentProps } from '@h4a/core/interface/component-interface';
import getSymbolFromCurrency from 'currency-symbol-map';

export interface IProductCardProps extends IComponentProps {
    amount: number;
    decimals?: number;
    currencyCode: string;
}

const ProductPrice: React.FC<IProductCardProps> = ({
    amount,
    currencyCode,
    decimals = 2,
    className = 'h4a-bigcommerce-price',
}) => {
    return (
        <div className={className} data-h4a-component="bigcommerce/price">
            {getSymbolFromCurrency(currencyCode)} {amount.toFixed(decimals)}
        </div>
    );
};

export default ProductPrice;
