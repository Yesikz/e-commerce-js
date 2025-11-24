import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/usuarioSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(login({ email }));
      setMensaje("Login exitoso!");
    } else {
      setMensaje("Por favor completa todos los campos.");
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <label>Email:</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <label>Contraseña:</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Ingresar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default Login;
