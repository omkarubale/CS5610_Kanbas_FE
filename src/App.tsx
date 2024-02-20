import Labs from "./Labs";
import HelloWorld from "./Labs/a3/HelloWorld";
import Kanbas from "./Kanbas";
import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import "./App.css";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/Labs" />} />
        <Route path="/hello" element={<HelloWorld />} />
        <Route path="/Kanbas/*" element={<Kanbas />} />
        <Route path="/Labs/*" element={<Labs />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
