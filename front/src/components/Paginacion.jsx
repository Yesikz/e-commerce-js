const Paginacion = ({ totalPaginas, paginaActual, cambiarPagina }) => {
  const paginas = Array.from({ length: totalPaginas }, (_, i) => i + 1);
  return (
    <div style={{ marginTop: "1rem" }}>
      {paginas.map(p => (
        <button
          key={p}
          onClick={() => cambiarPagina(p)}
          style={{
            marginRight: "0.25rem",
            padding: "0.25rem 0.5rem",
            backgroundColor: p === paginaActual ? "#222" : "#eee",
            color: p === paginaActual ? "white" : "black",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          {p}
        </button>
      ))}
    </div>
  );
};

export default Paginacion;
