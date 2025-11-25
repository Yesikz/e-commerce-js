import { useParams } from "react-router-dom";
import motos from "../data/motos.js";
import { useContext } from "react";
import { CartContext } from "../context/CartContext.jsx";
import "../style/styles.css";

const ProductDetail = () => {
  const { id } = useParams();
  const moto = motos.find((m) => m.id === parseInt(id));

  const { agregarAlCarrito } = useContext(CartContext);

  if (!moto) {
    return <p className="detail-message">Producto no encontrado.</p>;
  }

  return (
    <div className="detail-container">
      <h1 className="detail-title">{moto.nombre}</h1>

      <img
        src={moto.imagen}
        alt={moto.nombre}
        className="detail-img"
      />

      <p className="detail-description">{moto.descripcion}</p>

      <strong className="detail-price">Precio: ${moto.precio}</strong>

      <button
        onClick={() => agregarAlCarrito(moto)}
        className="btn-add"
      >
        Añadir al carrito
      </button>
    </div>
  );
};

export default ProductDetail;

