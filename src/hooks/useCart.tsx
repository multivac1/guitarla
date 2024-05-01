import { useState, useEffect } from 'react';
import { CartItem } from '../types';

export const useCart = () => {
    const initialCart = (): CartItem[] => {
        const getCartFromStorage = localStorage.getItem('cart');

        return getCartFromStorage ? JSON.parse(getCartFromStorage) : [];
    };

    const [cart, setCart] = useState<CartItem[]>(initialCart);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    return {
        cart,
        setCart,
    };
};
