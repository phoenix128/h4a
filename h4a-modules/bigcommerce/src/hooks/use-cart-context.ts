import { useContext } from 'react';
import { CartContext } from '@h4a/bigcommerce/context/CartContextProvider';
import { ICartContext } from '@h4a/bigcommerce/context/CartContextProvider/CartContextProvider';

const useCartContext = (): ICartContext => useContext(CartContext);

export default useCartContext;
