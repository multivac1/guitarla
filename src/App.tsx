import { useReducer } from 'react';
import { useCart } from './hooks/useCart';
import Header from './components/Header';
import Guitar from './components/Guitar';
import { cartReducer, initialState } from './reducers/cart-reducer';

function App() {
    const { cleanCart, removeFromCart, decreaseQty, increaseQty } = useCart();

    const [state, dispatch] = useReducer(cartReducer, initialState);

    console.log(state);

    return (
        <>
            <Header
                cart={state.cart}
                cleanCart={cleanCart}
                removeFromCart={removeFromCart}
                decreaseQty={decreaseQty}
                increaseQty={increaseQty}
            />

            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>

                <div className="row mt-5">
                    {state.data.map((guitarData) => (
                        <Guitar
                            key={guitarData.id}
                            guitarData={guitarData}
                            dispatch={dispatch}
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
