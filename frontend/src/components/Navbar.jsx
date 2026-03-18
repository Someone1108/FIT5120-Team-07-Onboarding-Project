import { NavLink } from "react-router-dom";
import logo from "../assets/logo.PNG";

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" end className="brand">
        <img src={logo} alt="UVGuard Logo" className="nav-logo" />
        UVGuard
      </NavLink>

      <div className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/uv-check">UV Check</NavLink>
        <NavLink to="/uv-awareness">UV Awareness</NavLink>
        <NavLink to="/protection-tips">Sun Safety Tips</NavLink>
        <NavLink to="/about">About</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;