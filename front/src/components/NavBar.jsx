import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const NavBar = () => {
  const carrito = useSelector(state => state.motos.carrito);
  const totalProductos = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  const [menuAbierto, setMenuAbierto] = useState(false);

  const cerrarMenu = () => setMenuAbierto(false);

  return (
    <nav className="main-nav">
      <div className="nav-left">
        <button
          className="menu-toggle"
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          &#9776;
        </button>
        <ul className={`nav-links ${menuAbierto ? "open" : ""}`}>
          <li><NavLink to="/" onClick={cerrarMenu}>Home</NavLink></li>
          <li><NavLink to="/productos" onClick={cerrarMenu}>Productos</NavLink></li>
          <li><NavLink to="/login" onClick={cerrarMenu}>Login</NavLink></li>
          <li><NavLink to="/registro" onClick={cerrarMenu}>Registro</NavLink></li>
        </ul>
      </div>
      <div className="nav-right">
        <NavLink to="/checkout" className="cart-link">
          Carrito ({totalProductos})
        </NavLink>
      </div>
      {menuAbierto && <div className="overlay" onClick={cerrarMenu}></div>}
    </nav>
  );
};

export default NavBar;

