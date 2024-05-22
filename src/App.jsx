import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import Partition from "./components/Partition";
import Alphabet from "./components/Alphabet";

const Navigation = () => {
  const location = useLocation();
  return location.pathname === "/" ? (
    <nav>
      <ul>
        <li>
          <Link to="/partition">Partition</Link>
        </li>
        <li>
          <Link to="/alphabet">Alphabet Tile</Link>
        </li>
      </ul>
    </nav>
  ) : (
    <nav>
      <ul>
        <li>
          <Link to="/">Back</Link>
        </li>
      </ul>
    </nav>
  );
};

const App = () => {
  const initialColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/partition" element={<Partition color={initialColor} />} />
        <Route path="/alphabet" element={<Alphabet />} />
      </Routes>
    </Router>
  );
};

export default App;
