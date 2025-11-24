import { useState } from "react";
import "../style/styles.css";

const Registro = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (nombre && email && password) {
      setMensaje(`Usuario ${nombre} registrado correctamente!`);
      setNombre("");
      setEmail("");
      setPassword("");
    } else {
      setMensaje("Completa todos los campos.");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Registro</h2>

      <form onSubmit={handleSubmit} className="form-card">
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="btn-submit">
          Registrar
        </button>
      </form>

      {mensaje && <p className="form-message">{mensaje}</p>}
    </div>
  );
};

export default Registro;
