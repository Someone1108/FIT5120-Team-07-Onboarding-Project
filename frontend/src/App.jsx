import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import UVCheck from "./pages/UVCheck";
import UVAwareness from "./pages/UVAwareness";
import About from "./pages/About";
import ProtectionTips from "./pages/ProtectionTips";
import "./App.css";

function App() {
  return (
    <div className="app-shell">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/uv-check" element={<UVCheck />} />
        <Route path="/uv-awareness" element={<UVAwareness />} />
        <Route path="/about" element={<About />} />
        <Route path="/protection-tips" element={<ProtectionTips />} />
      </Routes>
    </div>
  );
}

export default App;