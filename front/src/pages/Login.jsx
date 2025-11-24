import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/usuarioSlice";
import "../style/styles.css";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      setMensaje("Por favor completa todos los campos.");
      return;
    }

    dispatch(login({ email }));
    setMensaje("Login exitoso!");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Iniciar sesión</h2>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>Email</label>
          <input
            type="email"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Contraseña</label>
          <input
            type="password"
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="auth-btn">
            Ingresar
          </button>
        </form>

        {mensaje && <p className="auth-msg">{mensaje}</p>}
      </div>
    </div>
  );
};

export default Login;
