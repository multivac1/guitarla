import { useState, useEffect } from 'react';
import { Guitar, CartItem } from '../types';

export const useCart = () => {
    const MAX_ITEMS: number = 5;
    const MIN_ITEMS: number = 1;

    const initialCart = (): CartItem[] => {
        const getCartFromStorage = localStorage.getItem('cart');

        return getCartFromStorage ? JSON.parse(getCartFromStorage) : [];
    };

    const [cart, setCart] = useState<CartItem[]>(initialCart);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const removeFromCart = (id: Guitar['id']) => {
        const itemToDelete = cart.filter((guitar) => guitar.id !== id);

        setCart(itemToDelete);
    };

    const decreaseQty = (id: Guitar['id']) => {
        const updatedCart = cart.map((guitar) => {
            if (guitar.id === id && guitar.quantity > MIN_ITEMS) {
                return {
                    ...guitar,
                    quantity: guitar.quantity - 1,
                };
            }
            return guitar;
        });

        setCart(updatedCart);
    };

    const increaseQty = (id: Guitar['id']) => {
        const updatedCart = cart.map((guitar) => {
            if (guitar.id === id && guitar.quantity < MAX_ITEMS) {
                return {
                    ...guitar,
                    quantity: guitar.quantity + 1,
                };
            }
            return guitar;
        });

        setCart(updatedCart);
    };

    const cleanCart = () => setCart([]);

    return {
        cart,
        setCart,
        removeFromCart,
        decreaseQty,
        cleanCart,
        increaseQty,
    };
};
