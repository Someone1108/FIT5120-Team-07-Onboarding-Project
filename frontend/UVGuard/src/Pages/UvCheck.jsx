import React from "react";
import { Link } from "react-router-dom";

function UVCheck() {
  const uvIndex = 8; // 模擬圖片中的數值
  const city = "Sydney, NSW";
  const date = "Monday, March 9, 2026";

  const forecastData = [
    { time: "9 AM", uv: 4, level: "Moderate", color: "#FFC107" },
    { time: "10 AM", uv: 6, level: "High", color: "#E67E22" },
    { time: "11 AM", uv: 7, level: "High", color: "#E67E22" },
    { time: "12 PM", uv: 8, level: "Very High", color: "#D35400" },
    { time: "1 PM", uv: 8, level: "Very High", color: "#D35400" },
    { time: "2 PM", uv: 7, level: "High", color: "#E67E22" },
    { time: "3 PM", uv: 6, level: "High", color: "#E67E22" },
    { time: "4 PM", uv: 4, level: "Moderate", color: "#FFC107" },
  ];

  function getUVColor(uv) {
    if (uv <= 2) return "#4CAF50"; // Low
    if (uv <= 5) return "#FFC107"; // Moderate
    if (uv <= 7) return "#E67E22"; // High
    return "#D65F5F"; // Very High / Extreme
  }

  // 樣式對象
  const styles = {
    container: {
      backgroundColor: "#f9f9f7",
      padding: "40px",
      fontFamily: "sans-serif",
      color: "#333",
      maxWidth: "900px",
      margin: "0 auto",
    },
    headerSection: {
      textAlign: "left",
      marginBottom: "20px",
    },
    infoBar: {
      display: "flex",
      gap: "20px",
      backgroundColor: "#fff",
      padding: "15px 25px",
      borderRadius: "8px",
      border: "1px solid #eee",
      marginBottom: "20px",
      fontSize: "14px",
      color: "#666",
    },
    mainCard: {
      backgroundColor: "#fff",
      borderRadius: "12px",
      padding: "40px",
      border: "1px solid #eee",
      textAlign: "center",
      marginBottom: "20px",
    },
    uvCircle: {
      width: "100px",
      height: "100px",
      borderRadius: "50%",
      backgroundColor: getUVColor(uvIndex),
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "48px",
      fontWeight: "bold",
      margin: "0 auto 15px",
    },
    levelBadge: {
      display: "inline-block",
      padding: "5px 20px",
      borderRadius: "4px",
      backgroundColor: getUVColor(uvIndex),
      color: "white",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    forecastGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
      gap: "10px",
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "12px",
      border: "1px solid #eee",
    },
    forecastItem: {
      padding: "15px 10px",
      border: "1px solid #f0f0f0",
      borderRadius: "8px",
      textAlign: "center",
    }
  };

  return (
    <div style={styles.container}>
      {/* 標題與基礎資訊 */}
      <div style={styles.headerSection}>
        <h1 style={{ fontSize: "28px", color: "#2c3e50" }}>UV Check</h1>
        <p style={{ color: "#7f8c8d" }}>Real-time UV alerts for your location</p>
      </div>

      <div style={styles.infoBar}>
        <span>📍 {city}</span>
        <span>📅 {date}</span>
      </div>

      {/* 中間大卡片 */}
      <div style={styles.mainCard}>
        <p style={{ color: "#888", marginBottom: "15px" }}>Current UV Index at 12:30 PM</p>
        <div style={styles.uvCircle}>{uvIndex}</div>
        <div style={styles.levelBadge}>Very High</div>
        <p style={{ maxWidth: "400px", margin: "0 auto", lineHeight: "1.6", color: "#555" }}>
          Extra protection is required. Avoid being outside during midday hours. 
          Cover up, wear sunscreen, and seek shade.
        </p>
      </div>

      {/* 底部預報網格 */}
      <div style={{ textAlign: "left", marginBottom: "10px" }}>
        <h3 style={{ fontSize: "18px" }}>Today's UV Forecast</h3>
      </div>
      <div style={styles.forecastGrid}>
        {forecastData.map((item, index) => (
          <div key={index} style={styles.forecastItem}>
            <div style={{ fontSize: "12px", color: "#999", marginBottom: "8px" }}>{item.time}</div>
            <div style={{ fontSize: "20px", color: item.color, marginBottom: "5px" }}>☀️</div>
            <div style={{ fontWeight: "bold", fontSize: "18px" }}>{item.uv}</div>
            <div style={{ fontSize: "11px", color: "#666" }}>{item.level}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UVCheck;