import useProduct from '@h4a/bigcommerce/hooks/use-product';

const useProductImage = (productId?: number) => {
    const { data } = useProduct(productId);
    const product = data?.site.product;
    if (!product) {
        return null; // TODO: Use fallback image
    }

    return product.defaultImage;
};

export default useProductImage;
