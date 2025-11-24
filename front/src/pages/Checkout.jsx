import { useSelector, useDispatch } from "react-redux";
import { vaciarCarrito } from "../redux/slices/motosSlice";
import { useState } from "react";

const Checkout = () => {
  const carrito = useSelector(state => state.motos.carrito);
  const dispatch = useDispatch();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");
  const [compraFinalizada, setCompraFinalizada] = useState(false);

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre && email && direccion) {
      setCompraFinalizada(true);
      dispatch(vaciarCarrito());
    }
  };

  if (compraFinalizada) {
    return (
      <div style={{ padding: "1rem" }}>
        <h2>¡Gracias por tu compra, {nombre}!</h2>
        <p>Resumen enviado a: {email}</p>
      </div>
    );
  }

  if (carrito.length === 0) {
    return <p style={{ padding: "1rem" }}>Tu carrito está vacío.</p>;
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Checkout</h2>
      <p>Total a pagar: ${total}</p>
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <label>Nombre:</label>
        <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} required />
        <label>Email:</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <label>Dirección:</label>
        <input type="text" value={direccion} onChange={e => setDireccion(e.target.value)} required />
        <button type="submit">Finalizar Compra</button>
      </form>
    </div>
  );
};

export default Checkout;

