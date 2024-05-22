import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Partition from "./components/Partition";
import Alphabet from "./components/Alphabet";
import Navigation from "./components/Navigation";

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
