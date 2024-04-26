import { useState, useEffect, useMemo } from 'react';
import { Guitar, CartItem } from '../types';

export const useCart = () => {
    const MAX_ITEMS: number = 5;
    const MIN_ITEMS: number = 1;

    const initialCart = (): CartItem[] => {
        const getCartFromStorage = localStorage.getItem('cart');

        return getCartFromStorage ? JSON.parse(getCartFromStorage) : [];
    };

    const [cart, setCart] = useState<CartItem[]>(initialCart);

    const isEmpty: boolean = useMemo(() => cart.length === 0, [cart]);
    const total: number = useMemo(
        () =>
            cart.reduce((total, item) => total + item.quantity * item.price, 0),
        [cart]
    );

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item: Guitar) => {
        const itemExists = cart.findIndex((guitar) => guitar.id === item.id);

        if (itemExists >= 0) {
            if (cart[itemExists].quantity >= MAX_ITEMS) return;
            const updatedCart = [...cart];
            updatedCart[itemExists].quantity++;
            setCart(updatedCart);
        } else {
            const newItem: CartItem = { ...item, quantity: 1 };

            setCart([...cart, newItem]);
        }
    };

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

    const cleanCart = () => setCart([]);

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

    return {
        cart,
        setCart,
        addToCart,
        removeFromCart,
        decreaseQty,
        cleanCart,
        increaseQty,
        isEmpty,
        total,
    };
};
