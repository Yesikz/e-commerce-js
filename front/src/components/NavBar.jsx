import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const NavBar = () => {
  const carrito = useSelector(state => state.motos.carrito || []);
  const totalProductos = carrito.reduce((acc, item) => acc + (item.cantidad || 0), 0);

  const [menuAbierto, setMenuAbierto] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuAbierto(prev => !prev);
  const cerrarMenuYNavegar = (to) => {
    setMenuAbierto(false);
    navigate(to);
  };

  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="navbar-left">
        <button
          className="navbar-menu-toggle"
          onClick={toggleMenu}
          aria-expanded={menuAbierto}
          aria-label="Abrir menú"
        >
          ☰
        </button>

        
      </div>

      <ul className={`navbar-links ${menuAbierto ? "navbar-open" : ""}`}>
        <li>
      
          <button className="nav-button-link" onClick={() => cerrarMenuYNavegar("/")}>Home</button>
        </li>
        <li>
          <button className="nav-button-link" onClick={() => cerrarMenuYNavegar("/productos")}>Productos</button>
        </li>
        <li>
          <button className="nav-button-link" onClick={() => cerrarMenuYNavegar("/login")}>Login</button>
        </li>
        <li>
          <button className="nav-button-link" onClick={() => cerrarMenuYNavegar("/registro")}>Registro</button>
        </li>
      </ul>

      <div className="navbar-right">
        <NavLink to="/checkout" className="navbar-cart" onClick={() => setMenuAbierto(false)}>
          Carrito <span className="cart-count">({totalProductos})</span>
        </NavLink>
      </div>

      {menuAbierto && <div className="navbar-overlay" onClick={() => setMenuAbierto(false)} />}
    </nav>
  );
};

export default NavBar;
