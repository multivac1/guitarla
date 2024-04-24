import { useState, useEffect } from 'react';
import Header from './components/Header';
import Guitar from './components/Guitar';
import { db } from './data/db';
import { GuitarProps } from './types/GuitarProps';

function App() {
    const initialCart = () => {
        const getCartFromStorage = localStorage.getItem('cart');

        return getCartFromStorage ? JSON.parse(getCartFromStorage) : [];
    };
    const [data] = useState(db);
    const [cart, setCart] = useState<GuitarProps[]>(initialCart);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const MAX_ITEMS: number = 5;
    const MIN_ITEMS: number = 1;

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

    return (
        <>
            <Header
                cart={cart}
                cleanCart={cleanCart}
                removeFromCart={removeFromCart}
                decreaseQty={decreaseQty}
                increaseQty={increaseQty}
            />

            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>

                <div className="row mt-5">
                    {data.map((guitarData) => (
                        <Guitar
                            key={guitarData.id}
                            guitarData={guitarData}
                            addToCart={addToCart}
                        />
                    ))}
                </div>
            </main>

            <footer className="bg-dark mt-5 py-5">
                <div className="container-xl">
                    <p className="text-white text-center fs-4 mt-4 m-md-0">
                        GuitarLA - Todos los derechos Reservados
                    </p>
                </div>
            </footer>
        </>
    );
}

export default App;
