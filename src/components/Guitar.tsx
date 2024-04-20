import { GuitarProps } from '../types/GuitarProps';

const Guitar = ({
    guitarData,
    addToCart,
}: {
    guitarData: GuitarProps;
    addToCart: (item: GuitarProps) => void;
}) => {
    const { name, image, description, price } = guitarData;

    return (
        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
            <div className="col-4">
                <img
                    className="img-fluid"
                    src={`/img/${image}.jpg`}
                    alt="imagen guitarra"
                />
            </div>
            <div className="col-8">
                <h3 className="text-black fs-4 fw-bold text-uppercase">
                    {name}
                </h3>
                <p>{description}</p>
                <p className="fw-black text-primary fs-3">$ {price}</p>
                <button
                    type="button"
                    className="btn btn-dark w-100"
                    onClick={() => addToCart(guitarData)}
                >
                    Agregar al Carrito
                </button>
            </div>
        </div>
    );
};

export default Guitar;
