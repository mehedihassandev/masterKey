import { useLocation } from "react-router";
import { Link } from "react-router-dom";

export const Navigation = () => {
  const location = useLocation();

  const navStyle = {
    backgroundColor: "#f8f9fa",
    padding: "10px 0",
  };

  const ulStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    listStyle: "none",
  };

  const linkStyle = {
    textDecoration: "none",
    color: "#007bff",
    padding: "10px",
    borderRadius: "5px",
    fontSize: "1.1rem",
  };

  const activeLinkStyle = {
    ...linkStyle,
    backgroundColor: "#007bff",
    color: "#fff",
  };

  return location.pathname === "/" ? (
    <nav style={navStyle}>
      <ul style={ulStyle}>
        <li>
          <Link to="/partition" style={linkStyle}>
            Partition
          </Link>
        </li>
        <li>
          <Link to="/alphabet" style={linkStyle}>
            Alphabet Tile
          </Link>
        </li>
      </ul>
    </nav>
  ) : (
    <nav style={navStyle}>
      <ul style={ulStyle}>
        <li>
          <Link to="/" style={activeLinkStyle}>
            Back
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
