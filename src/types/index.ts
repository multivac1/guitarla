import { Dispatch } from 'react';
import { CartActions } from '../reducers/cart-reducer';

export type Guitar = {
    id: number;
    name: string;
    image: string;
    description: string;
    price: number;
    quantity?: number;
};

export type GuitarProps = {
    guitarData: Guitar;
    dispatch: Dispatch<CartActions>;
};

export type CartItem = Omit<Guitar, 'description'> & {
    quantity: number;
};

export type HeaderProps = {
    cart: CartItem[];
    dispatch: Dispatch<CartActions>;
    cleanCart: () => void;
};
