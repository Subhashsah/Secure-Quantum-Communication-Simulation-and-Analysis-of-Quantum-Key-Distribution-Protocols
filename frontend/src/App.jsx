import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BB84 from "./pages/BB84";
import E91 from "./pages/E91";
import B92 from "./pages/B92";
import About from "./pages/About";
import B92Simulation from "./pages/simulation/B92";
import E91Simulation from "./pages/simulation/E91";
import BB84Simulation from "./pages/simulation/BB84";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bb84" element={<BB84 />} />
        <Route path="/e91" element={<E91 />} />
        <Route path="/b92" element={<B92 />} />
        <Route path="/about" element={<About />} />
        <Route path="/bb84_simulation" element={<BB84Simulation />} />
        <Route path="/b92_simulation" element={<B92Simulation />} />
        <Route path="/e91_simulation" element={<E91Simulation />} />
      </Routes>
    </Router>
  );
}

export default App;
