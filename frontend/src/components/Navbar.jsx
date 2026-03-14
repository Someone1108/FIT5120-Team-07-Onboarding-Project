import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  return (
    <nav className="navbar">
      {/* <div className="brand">UVGuard</div> */}
      <Link to="/" className="brand">
        <img src={logo} alt="UVGuard Logo" className="nav-logo" />
        UVGuard
      </Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/uv-check">UV Check</Link>
        <Link to="/uv-awareness">UV Awareness</Link>
        <Link to="/protection-tips">Protection Tips</Link>
        <Link to="/about">About</Link>
      </div>
    </nav>
  );
}

export default Navbar;