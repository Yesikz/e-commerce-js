import { useParams } from "react-router-dom";
import motos from "../data/motos.js";
import { useContext } from "react";
import { CartContext } from "../context/CartContext.jsx";
import "../Style/styles.css";

const ProductDetail = () => {
  const { id } = useParams();
  const moto = motos.find((m) => m.id === parseInt(id));

  const { agregarAlCarrito } = useContext(CartContext);

  if (!moto) {
    return <p>Producto no encontrado.</p>;
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h1>{moto.nombre}</h1>
      <img
        src={moto.imagen}
        alt={moto.nombre}
        style={{ width: "400px", borderRadius: "8px" }}
      />
      <p>{moto.descripcion}</p>
      <strong>Precio: ${moto.precio}</strong>

      <button
        onClick={() => agregarAlCarrito(moto)}
        style={{
          display: "block",
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#222",
          color: "white",
          borderRadius: "6px",
          cursor: "pointer",
          border: "none"
        }}
      >
        Añadir al carrito
      </button>
    </div>
  );
};

export default ProductDetail;
