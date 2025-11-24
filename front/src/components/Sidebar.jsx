const Sidebar = ({ categorias, filtroCategoria, categoriaSeleccionada }) => {
  return (
    <aside>
      <h3>Categorías</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {categorias.map(cat => (
          <li key={cat}>
            <button
              onClick={() => filtroCategoria(cat)}
              style={{
                display: "block",
                width: "100%",
                marginBottom: "0.5rem",
                padding: "0.5rem",
                backgroundColor: cat === categoriaSeleccionada ? "#222" : "#eee",
                color: cat === categoriaSeleccionada ? "white" : "black",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              {cat}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => filtroCategoria(null)}
            style={{
              display: "block",
              width: "100%",
              marginTop: "0.5rem",
              padding: "0.5rem",
              backgroundColor: !categoriaSeleccionada ? "#222" : "#eee",
              color: !categoriaSeleccionada ? "white" : "black",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Todas
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;

