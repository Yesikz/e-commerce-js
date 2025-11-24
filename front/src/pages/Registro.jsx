import { useState } from "react";

const Registro = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre && email && password) {
      setMensaje(`Usuario ${nombre} registrado correctamente!`);
      setNombre(""); setEmail(""); setPassword("");
    } else {
      setMensaje("Completa todos los campos.");
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <label>Nombre:</label>
        <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} required style={{ width: "100%", padding: "0.5rem", margin: "0.5rem 0" }} />
        <label>Email:</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: "100%", padding: "0.5rem", margin: "0.5rem 0" }} />
        <label>Contraseña:</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: "100%", padding: "0.5rem", margin: "0.5rem 0" }} />
        <button type="submit" style={{ padding: "0.5rem 1rem", backgroundColor: "#222", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>Registrar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default Registro;
