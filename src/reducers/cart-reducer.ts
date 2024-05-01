import { db } from '../data/db';
import { Guitar, CartItem } from '../types';

export type CartActions =
    | { type: 'add-to-cart'; payload: { item: Guitar } }
    | { type: 'remove-from-cart'; payload: { id: Guitar['id'] } }
    | { type: 'decrease-qty'; payload: { id: Guitar['id'] } }
    | { type: 'increase-qty'; payload: { id: Guitar['id'] } }
    | { type: 'clean-cart' };

export type CartState = {
    data: Guitar[];
    cart: CartItem[];
};

export const initialState: CartState = {
    data: db,
    cart: [],
};

export const cartReducer = (
    state: CartState = initialState,
    action: CartActions
) => {
    const MAX_ITEMS: number = 5;
    const MIN_ITEMS: number = 1;

    if (action.type === 'add-to-cart') {
        const itemExists = state.cart.find(
            (guitar) => guitar.id === action.payload.item.id
        );

        let updatedCart: CartItem[] = [];
        if (itemExists) {
            updatedCart = state.cart.map((item) => {
                if (item.id === action.payload.item.id) {
                    if (item.quantity < MAX_ITEMS) {
                        return { ...item, quantity: item.quantity + 1 };
                    } else {
                        return item;
                    }
                } else {
                    return item;
                }
            });
        } else {
            const newItem: CartItem = { ...action.payload.item, quantity: 1 };

            updatedCart = [...state.cart, newItem];
        }

        return {
            ...state,
            cart: updatedCart,
        };
    }

    if (action.type === 'remove-from-cart') {
        return {
            ...state,
        };
    }

    if (action.type === 'increase-qty') {
        return {
            ...state,
        };
    }

    if (action.type === 'decrease-qty') {
        return {
            ...state,
        };
    }

    if (action.type === 'clean-cart') {
        return {
            ...state,
        };
    }

    return state;
};
