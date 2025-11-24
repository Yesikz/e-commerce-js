import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar.jsx";
import ProductCard from "../components/ProductCard.jsx";
import Paginacion from "../components/Paginacion.jsx";
import { obtenerMotos } from "../redux/slices/motosSlice.js";

const Productos = () => {
  const dispatch = useDispatch();
  const { lista: motos, estado, error } = useSelector(state => state.motos);

  const categorias = ["Deportivas", "Naked"];
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const porPagina = 2;

  useEffect(() => {
    if (estado === "idle") dispatch(obtenerMotos());
  }, [estado, dispatch]);

  const filtrarMotos = categoriaSeleccionada
    ? motos.filter(m => m.categoria === categoriaSeleccionada)
    : motos;

  const totalPaginas = Math.ceil(filtrarMotos.length / porPagina);
  const motosPagina = filtrarMotos.slice((paginaActual - 1) * porPagina, paginaActual * porPagina);

  if (estado === "loading") return <p style={{ padding: "1rem" }}>Cargando motos...</p>;
  if (estado === "failed") return <p style={{ padding: "1rem", color: "red" }}>Error: {error}</p>;

  return (
    <div style={{ display: "flex" }}>
      <Sidebar
        categorias={categorias}
        filtroCategoria={setCategoriaSeleccionada}
        categoriaSeleccionada={categoriaSeleccionada}
      />
      <div style={{ padding: "1rem", flex: 1 }}>
        <h2>Productos</h2>
        {motosPagina.length === 0 && <p>No hay motos disponibles.</p>}
        <div className="grid-container">
          {motosPagina.map(moto => <ProductCard key={moto.id} moto={moto} />)}
        </div>
        <Paginacion totalPaginas={totalPaginas} paginaActual={paginaActual} cambiarPagina={setPaginaActual} />
      </div>
    </div>
  );
};

export default Productos;


