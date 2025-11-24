import { useSelector, useDispatch } from "react-redux";
import { vaciarCarrito } from "../redux/slices/motosSlice";
import { useState } from "react";
import "../style/styles.css";

const Checkout = () => {
  const carrito = useSelector(state => state.motos.carrito);
  const dispatch = useDispatch();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");
  const [compraFinalizada, setCompraFinalizada] = useState(false);

  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre && email && direccion) {
      setCompraFinalizada(true);
      dispatch(vaciarCarrito());
    }
  };

  if (compraFinalizada) {
    return (
      <div className="checkout-container">
        <h2 className="checkout-title">
          ¡Gracias por tu compra, {nombre}!
        </h2>
        <p className="checkout-subtext">
          Resumen enviado a: {email}
        </p>
      </div>
    );
  }

  if (carrito.length === 0) {
    return (
      <div className="checkout-container">
        <p className="checkout-empty">Tu carrito está vacío.</p>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout</h2>
      <p className="checkout-total">Total a pagar: <strong>${total}</strong></p>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <label>Dirección:</label>
        <input
          type="text"
          value={direccion}
          onChange={e => setDireccion(e.target.value)}
          required
        />

        <button className="btn-add" type="submit">
          Finalizar Compra
        </button>
      </form>
    </div>
  );
};

export default Checkout;

