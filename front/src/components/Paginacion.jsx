const Paginacion = ({ totalPaginas, paginaActual, cambiarPagina }) => {
  const paginas = Array.from({ length: totalPaginas }, (_, i) => i + 1);

  return (
    <div className="pagination-container">
      {paginas.map((p) => (
        <button
          key={p}
          onClick={() => cambiarPagina(p)}
          className={`pagination-btn ${p === paginaActual ? "active" : ""}`}
        >
          {p}
        </button>
      ))}
    </div>
  );
};

export default Paginacion;

