function UVCheck() {
  const uvIndex = 7;

  function getUVLevel(uv) {
    if (uv <= 2) return "Low";
    if (uv <= 5) return "Moderate";
    if (uv <= 7) return "High";
    if (uv <= 10) return "Very High";
    return "Extreme";
  }

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>UV Check</h1>

      <h2>Current UV Index</h2>

      <div
        style={{
          fontSize: "60px",
          fontWeight: "bold",
          margin: "20px",
        }}
      >
        {uvIndex}
      </div>

      <p>Risk Level: {getUVLevel(uvIndex)}</p>

      <p style={{ marginTop: "20px" }}>
        Wear sunscreen, sunglasses, and protective clothing.
      </p>
    </div>
  );
}

export default UVCheck;