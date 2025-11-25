import { useSelector, useDispatch } from "react-redux";
import { agregarCarrito, eliminarCarrito, vaciarCarrito } from "../redux/slices/motosSlice";
import "../style/styles.css";

const Carrito = () => {
  const carrito = useSelector(state => state.motos.carrito);
  const dispatch = useDispatch();

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const aumentar = (item) => dispatch(agregarCarrito(item));

  return (
    <div className="cart-container">
      <h2 className="cart-title">Tu Carrito</h2>

      {carrito.length === 0 ? (
        <p className="cart-empty">El carrito está vacío.</p>
      ) : (
        <>
          <div className="cart-items">
            {carrito.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.imagen} alt={item.nombre} className="cart-item-img" />
                <div className="cart-item-info">
                  <h3>{item.nombre}</h3>
                  <p>Precio: ${item.precio}</p>
                  <p>Cantidad: {item.cantidad}</p>
                  <div className="cart-item-buttons">
                    <button onClick={() => aumentar(item)}>+</button>
                    <button onClick={() => dispatch(eliminarCarrito(item.id))}>Eliminar</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="cart-total">Total: ${total}</p>

          <div className="cart-actions">
            <button className="btn-empty" onClick={() => dispatch(vaciarCarrito())}>
              Vaciar Carrito
            </button>
            <button className="btn-checkout">Finalizar Compra</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;
