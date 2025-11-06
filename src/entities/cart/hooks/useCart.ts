import { useState, useEffect } from 'react';
import { getCart, addToCart, removeFromCart, leaveOrder, CartItem } from '../model/cart';

export function useCart() {
    const [ cart, setCart ] = useState<CartItem[]>([]);

    useEffect(() => {
        setCart(getCart());

        function syncCart() {
            setCart(getCart());
        }

        window.addEventListener('_cart_changed', syncCart);
        return () => window.removeEventListener('_cart_changed', syncCart);
    }, []);

    // Диспатчеры
    const add = (id: string, start: string, end: string) => {
        addToCart({
            id,
            start,
            end,
        });
        window.dispatchEvent(new CustomEvent('_cart_changed'));
    };

    const remove = (id: string) => {
        removeFromCart(id);
        window.dispatchEvent(new CustomEvent('_cart_changed'));
    };

    const clearCart = () => {
        leaveOrder();
        window.dispatchEvent(new CustomEvent('_cart_changed'));
    };

    return { cart, add, remove, clearCart };
}
