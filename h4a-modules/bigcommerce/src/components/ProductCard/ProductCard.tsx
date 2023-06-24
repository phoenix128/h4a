import React from 'react';
import settings from '@h4a/bigcommerce/settings';
import { IComponentProps } from '@h4a/core/interface/component-interface';
import ProductImage, {
    ProductImageType,
} from '@h4a/bigcommerce/components/ProductImage/ProductImage';
import Card from '@h4a/ui/components/Card';
import ProductPrices from '@h4a/bigcommerce/components/ProductPrices';
import AddToCart from '@h4a/bigcommerce/components/AddToCart';
import H4aLink from '@h4a/core/components/H4aLink';
import useProduct from '@h4a/bigcommerce/hooks/use-product';

export interface IProductCardProps extends IComponentProps {
    productId: number;
}

const ProductCard: React.FC<IProductCardProps> = ({
    productId,
    className = 'h4a-bigcommerce-product-card',
}) => {
    const { data } = useProduct(productId);
    const product = data?.site.product;

    const {
        imagesSizes: { card },
    } = settings;

    return (
        <Card
            className={className}
            data-h4a-component="bigcommerce/product-card"
        >
            {product && (
                <>
                    <H4aLink path={product.path}>
                        <ProductImage
                            productId={productId}
                            format={ProductImageType.card}
                        />
                        <div className="h4a-product-name">{product.name}</div>
                        <ProductPrices productId={productId} />
                    </H4aLink>
                    <AddToCart productId={productId} />
                </>
            )}
        </Card>
    );
};

export default ProductCard;
