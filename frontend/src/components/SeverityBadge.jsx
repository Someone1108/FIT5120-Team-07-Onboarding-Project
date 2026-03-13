function SeverityBadge({ level }) {
  const classMap = {
    Low: "low",
    Moderate: "moderate",
    High: "high",
    "Very High": "very-high",
    Extreme: "extreme"
  };

  return (
    <span className={`hero-badge ${classMap[level] || "moderate"}`}>
      {level}
    </span>
  );
}

export default SeverityBadge;