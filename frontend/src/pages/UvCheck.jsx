import { useEffect, useState } from "react";

function UVCheck() {
  const [locationName, setLocationName] = useState("Checking your location...");
  const [uvIndex, setUvIndex] = useState(8);
  const [status, setStatus] = useState("Very High");
  const [warning, setWarning] = useState(
    "UV is very high. Seek shade, wear sunscreen, and limit sun exposure."
  );

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationName("Location not supported on this device");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(2);
        const lng = position.coords.longitude.toFixed(2);
        setLocationName(`Current location: ${lat}, ${lng}`);

        // Temporary mock value for now.
        // Replace this later with your real UV API response.
        const mockUv = 8;
        setUvIndex(mockUv);

        const level = getUVLevel(mockUv);
        setStatus(level);
        setWarning(getWarning(mockUv));
      },
      () => {
        setLocationName("Location access denied");
      }
    );
  }, []);

  function getUVLevel(uv) {
    if (uv <= 2) return "Low";
    if (uv <= 5) return "Moderate";
    if (uv <= 7) return "High";
    if (uv <= 10) return "Very High";
    return "Extreme";
  }

  function getWarning(uv) {
    if (uv <= 2) {
      return "UV is low right now. Basic protection is enough for most people.";
    }
    if (uv <= 5) {
      return "UV is moderate. Sunscreen and sunglasses are recommended if you are outdoors.";
    }
    if (uv <= 7) {
      return "UV is high. Protection is needed around the middle of the day.";
    }
    if (uv <= 10) {
      return "UV is very high. Seek shade, wear sunscreen, and limit sun exposure.";
    }
    return "UV is extreme. Avoid direct sun exposure and take full protective measures.";
  }

  return (
    <main className="page">
      <section className="page-intro">
        <h1>UV Check</h1>
        <p>Real-time UV alerts for your location</p>
        <p className="location-text">{locationName}</p>
      </section>

      <section className="info-card uv-summary-card">
        <div className="uv-circle">{uvIndex}</div>

        <div className="uv-summary-text">
          <p className="small-label">Current UV Index</p>
          <h2>{status}</h2>
          <p>{warning}</p>
        </div>
      </section>

      <section className="info-card">
        <h3>Recommended protection</h3>
        <ul className="tip-list">
          <li>Apply SPF 30+ sunscreen</li>
          <li>Wear sunglasses and a wide-brim hat</li>
          <li>Seek shade during midday hours</li>
          <li>Wear protective clothing if possible</li>
        </ul>
      </section>

      <section className="info-card">
        <h3>UV Index Scale</h3>
        <div className="scale-list">
          <div className="scale-item low">Low: 0–2</div>
          <div className="scale-item moderate">Moderate: 3–5</div>
          <div className="scale-item high">High: 6–7</div>
          <div className="scale-item very-high">Very High: 8–10</div>
          <div className="scale-item extreme">Extreme: 11+</div>
        </div>
      </section>
    </main>
  );
}

export default UVCheck;