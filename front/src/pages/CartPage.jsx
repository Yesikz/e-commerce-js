import { useContext } from "react";
import { CartContext } from "../context/CartContext.jsx";
import "../Style/styles.css";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { carrito, eliminarDelCarrito, vaciarCarrito } =
    useContext(CartContext);

  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Carrito de Compras</h1>

      {carrito.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          {carrito.map((item) => (
            <div
              key={item.id}
              
            >
              <div>
                <h3>{item.nombre}</h3>
                <p>Cantidad: {item.cantidad}</p>
                <p>Subtotal: ${item.precio * item.cantidad}</p>
              </div>

              <button
                onClick={() => eliminarDelCarrito(item.id)}
               
              >
                Eliminar
              </button>
            </div>
          ))}

          <h2>Total: ${total}</h2>

          <button
            onClick={vaciarCarrito}
          >
            Vaciar Carrito
          </button>

          <Link to="/checkout">
            <button >
              Ir a Checkout
            </button>
          </Link>
        </>
      )}
    </div>
  );
};

export default CartPage;
