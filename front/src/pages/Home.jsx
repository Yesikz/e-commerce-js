import motos from "../data/motos.js";
import MotoCard from "../components/MotoCard.jsx";
import "../Style/styles.css";

import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard.jsx";

const Home = () => {
  const motos = useSelector(state => state.motos.lista);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Bienvenido a E-COMMERCE-JS</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
        {motos.map(moto => <ProductCard key={moto.id} moto={moto} />)}
      </div>
    </div>
  );
};

export default Home;
