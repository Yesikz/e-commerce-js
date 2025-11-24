import { useDispatch } from "react-redux";
import { agregarCarrito } from "../redux/slices/motosSlice.js";

const ProductCard = ({ moto }) => {
  const dispatch = useDispatch();

  return (
    <div className="card">
      <img src={moto.imagen} alt={moto.nombre} />
      <h3>{moto.nombre}</h3>
      <p>{moto.descripcion}</p>
      <p>${moto.precio}</p>
      <button onClick={() => dispatch(agregarCarrito(moto))}>Agregar al carrito</button>
    </div>
  );
};

export default ProductCard;
