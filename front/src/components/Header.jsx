import { Link } from "react-router-dom";
import NavBar from "./NavBar.jsx";

const Header = () => {
  return (
    <header>
      <h1 style={{ padding: "1rem" }}>E-COMMERCE-JS</h1>
      <NavBar />
    </header>
  );
};

export default Header;
