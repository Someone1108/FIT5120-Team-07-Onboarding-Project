import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{display: "flex", justifyContent: "space-between", padding: "20px"}}>
      
      <h2>UVGuard</h2>

      <div style={{display: "flex", gap: "20px"}}>
        <Link to="/">Home</Link>
        <Link to="/uv-check">UV Check</Link>
        <Link to="/uv-awareness">UV Awareness</Link>
      </div>

    </nav>
  );
}

export default Navbar;