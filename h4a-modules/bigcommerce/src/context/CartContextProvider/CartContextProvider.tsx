'use client';

import React, {
    createContext,
    useState,
    PropsWithChildren,
    useCallback,
} from 'react';
import { ICart } from '@h4a/bigcommerce/interface/cart-interface';
import useSerializedCallback from '@h4a/core/hooks/use-serialized-callback';
import usePageContext from '@h4a/core/hooks/use-page-context';
import { useLocalStorage } from 'usehooks-ts';
import useSessionEffect from '@h4a/core/hooks/use-session-effect';
import useUpdateCartOwner from '@h4a/bigcommerce/hooks/use-update-cart-owner';

export interface ICartContext {
    cartId?: string;
    cart?: ICart;
    setCart: (cart: ICart) => void;
    setCartId: (cartId: string) => void;
    reloadCart: () => void;
}

interface ICartContextProviderProps {}

export const CartContext = createContext<ICartContext>({} as ICartContext);

const CartContextProvider = ({
    children,
}: PropsWithChildren<ICartContextProviderProps>) => {
    const ctx = usePageContext();
    const [cart, setCart] = useState<ICart>(null);
    const [cartId, setCartId] = useLocalStorage<string>(
        `bigcommerce-cart-id-${ctx?.area}`,
        ''
    );
    const [updateCartOwner, _] = useUpdateCartOwner();

    const handleSetCart = useSerializedCallback(
        (cart: ICart) => {
            setCart(cart);
            setCartId(cart?.id);
        },
        [setCart, setCartId]
    );

    const reloadCart = useCallback(async () => {
        if (!cartId) return;

        // Update cart owner returns the cart information. No need to call the query again.
        const res = await updateCartOwner(cartId);

        handleSetCart(res.data.updateCartOwner);
    }, [cartId, handleSetCart, updateCartOwner]);

    useSessionEffect(
        'bigcommerce-cart-load',
        () => {
            reloadCart().then();
        },
        []
    );

    return (
        <CartContext.Provider
            value={{
                cart,
                cartId,
                setCart: handleSetCart,
                setCartId,
                reloadCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartContextProvider;
