import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { agregarCarrito } from "../redux/slices/motosSlice";
import "../style/styles.css";

const MotoDetalle = () => {
  const { id } = useParams();
  const motos = useSelector(state => state.motos.lista);
  const dispatch = useDispatch();

  const moto = motos.find(m => m.id === parseInt(id));

  if (!moto) {
    return (
      <div className="detalle-container">
        <p className="detalle-noencontrado">Producto no encontrado.</p>
      </div>
    );
  }

  return (
    <div className="detalle-container">
      <div className="detalle-card">
        <img
          src={moto.imagen}
          alt={moto.nombre}
          className="detalle-img"
        />

        <div className="detalle-info">
          <h2>{moto.nombre}</h2>
          <p className="detalle-descripcion">{moto.descripcion}</p>
          <p className="detalle-precio">Precio: ${moto.precio}</p>

          <button
            className="btn-agregar"
            onClick={() => dispatch(agregarCarrito(moto))}
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default MotoDetalle;

