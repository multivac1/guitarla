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
    addToCart: (item: Guitar) => void;
};

export type CartItem = Omit<Guitar, 'description'> & {
    quantity: number;
};

export type HeaderProps = {
    cart: CartItem[];
    removeFromCart: (id: Guitar['id']) => void;
    decreaseQty: (id: Guitar['id']) => void;
    increaseQty: (id: Guitar['id']) => void;
    cleanCart: () => void;
    isEmpty: boolean;
    total: number;
};