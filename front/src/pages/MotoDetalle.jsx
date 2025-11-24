import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { agregarCarrito } from "../redux/slices/motosSlice";

const MotoDetalle = () => {
  const { id } = useParams();
  const motos = useSelector(state => state.motos.lista);
  const moto = motos.find(m => m.id === parseInt(id));
  const dispatch = useDispatch();

  if (!moto) return <p style={{ padding: "1rem" }}>Producto no encontrado.</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>{moto.nombre}</h2>
      <img src={moto.imagen} alt={moto.nombre} style={{ width: "400px", borderRadius: "8px" }} />
      <p>{moto.descripcion}</p>
      <strong>Precio: ${moto.precio}</strong>
      <button
        onClick={() => dispatch(agregarCarrito(moto))}
        style={{ display: "block", marginTop: "1rem", padding: "0.5rem 1rem", backgroundColor: "#222", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}
      >
        Añadir al carrito
      </button>
    </div>
  );
};

export default MotoDetalle;
