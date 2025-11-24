const Footer = () => {
  return (
    <footer
      style={{
        padding: "1rem",
        backgroundColor: "#222",
        color: "white",
        textAlign: "center",
        marginTop: "2rem"
      }}
    >
      <p>E-COMMERCE-JS © 2025. Todos los derechos reservados.</p> <br />
      <div>Términos y Condiciones · Preguntas Frecuentes · Ayuda</div>
        <br /> 
        <div className="social-icons">
          <a href="https://instagram.com/tuusuario" target="_blank" rel="noopener noreferrer" style={{ margin: "0 10px" }}>
      Instagram
    </a>
    <a href="https://facebook.com/tuusuario" target="_blank" rel="noopener noreferrer" style={{ margin: "0 10px" }}>
      Facebook
    </a>
    <a href="https://twitter.com/tuusuario" target="_blank" rel="noopener noreferrer" style={{ margin: "0 10px" }}>
      Twiter
    </a>
    </div>

    </footer>
  );
};

export default Footer;
