import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "../assets/logo.jpeg";   // 加這一行（路徑看你的資料夾）

function Navbar() {
  return (
    <nav style={{display: "flex", justifyContent: "space-between", padding: "20px"}}>

      {/* 左邊 Logo + 名字 */}
      <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
        <img src={logo} alt="UVGuard Logo" style={{width: "40px"}} />
        <h2 style={{margin: 0}}>UVGuard</h2>
      </div>

      {/* 右邊 Navigation */}
      <div style={{display: "flex", gap: "20px"}}>
        <Link to="/">Home</Link>
        <Link to="/uv-check">UV Check</Link>
        <Link to="/uv-awareness">UV Awareness</Link>
      </div>

    </nav>
  );
}

export default Navbar;