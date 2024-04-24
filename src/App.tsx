import { useState } from 'react';
import { db } from './data/db';
import { useCart } from './hooks/useCart';
import Header from './components/Header';
import Guitar from './components/Guitar';

function App() {
    const [data] = useState(db);
    const {
        cart,
        addToCart,
        cleanCart,
        removeFromCart,
        decreaseQty,
        increaseQty,
        isEmpty,
        total,
    } = useCart();

    return (
        <>
            <Header
                cart={cart}
                cleanCart={cleanCart}
                removeFromCart={removeFromCart}
                decreaseQty={decreaseQty}
                increaseQty={increaseQty}
                isEmpty={isEmpty}
                total={total}
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
