const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <p className="footer-copy">NITRORIDERS © 2025. Todos los derechos reservados.</p>

        <div className="footer-links">
          <span>Términos y Condiciones</span>
          <span>·</span>
          <span>Preguntas Frecuentes</span>
          <span>·</span>
          <span>Ayuda</span>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="social-icons">
          <a
            href="https://instagram.com/tuusuario"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="Instagram"
          >
            Instagram
          </a>

          <a
            href="https://facebook.com/tuusuario"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="Facebook"
          >
            Facebook
          </a>

          <a
            href="https://twitter.com/tuusuario"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="Twitter"
          >
            Twitter
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

