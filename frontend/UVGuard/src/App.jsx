// src/App.jsx

import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import UvCheck from "./Pages/UvCheck";
import UVAwareness from "./Pages/UVAwareness";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/uv-check" element={<UvCheck />} />
        <Route path="/uv-awareness" element={<UVAwareness />} />
      </Routes>
    </>
  );
}

// 關鍵！一定要加上這一行
export default App;