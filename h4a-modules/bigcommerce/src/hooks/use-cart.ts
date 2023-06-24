import useCartContext from '@h4a/bigcommerce/hooks/use-cart-context';

const useCart = () => {
    const { cart } = useCartContext();
    return cart;
};

export default useCart;
