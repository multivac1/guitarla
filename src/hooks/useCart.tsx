import { useState, useEffect } from 'react';
import { GuitarProps } from '../types/GuitarProps';

export const useCart = () => {
    const MAX_ITEMS: number = 5;
    const MIN_ITEMS: number = 1;

    const initialCart = () => {
        const getCartFromStorage = localStorage.getItem('cart');

        return getCartFromStorage ? JSON.parse(getCartFromStorage) : [];
    };

    const [cart, setCart] = useState<GuitarProps[]>(initialCart);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item: GuitarProps) => {
        const itemExists = cart.findIndex((guitar) => guitar.id === item.id);

        if (itemExists >= 0) {
            if (cart[itemExists].quantity >= MAX_ITEMS) return;
            const updatedCart = [...cart];
            updatedCart[itemExists].quantity++;
            setCart(updatedCart);
        } else {
            item.quantity = 1;
            setCart([...cart, item]);
        }
    };

    const removeFromCart = (id: number) => {
        const itemToDelete = cart.filter((guitar) => guitar.id !== id);

        setCart(itemToDelete);
    };

    const decreaseQty = (id: number) => {
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

    const cleanCart = () => setCart([]);

    const increaseQty = (id: number) => {
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

    return {
        cart,
        setCart,
        addToCart,
        removeFromCart,
        decreaseQty,
        cleanCart,
        increaseQty,
    };
};
