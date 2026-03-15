import { useEffect, useState } from "react";
import { getCurrentUV } from "../services/api";

function UVCheck() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [locationName, setLocationName] = useState("Checking your location...");
  const [uvIndex, setUvIndex] = useState(null);
  const [status, setStatus] = useState("");
  const [warning, setWarning] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [updatedAt, setUpdatedAt] = useState("");
  const [actions, setActions] = useState([]);

  useEffect(() => {
    async function loadUvData() {
      if (!navigator.geolocation) {
        setLocationName("Location not supported on this device");
        setError("Geolocation is not supported on this device.");
        setLoading(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const lat = position.coords.latitude.toFixed(6);
            const lon = position.coords.longitude.toFixed(6);

            const response = await getCurrentUV(lat, lon);

            setLocationName(response.location || `Current location: ${lat}, ${lon}`);
            setUvIndex(response.uv_index);
            setStatus(response.uv_level);
            setWarning(response.warning_message);
            setTemperature(response.temperature ?? null);
            setUpdatedAt(response.updated_at || "");
            setActions(response.actions || []);
          } catch (err) {
            console.error(err);
            setError("Could not fetch UV data for your location.");
            setLocationName("Could not fetch your UV data");
          } finally {
            setLoading(false);
          }
        },
        () => {
          setLocationName("Location access denied");
          setError("Location access was denied.");
          setLoading(false);
        }
      );
    }

    loadUvData();
  }, []);

  return (
    <main className="page">
      <section className="page-intro">
        <h1>UV Check</h1>
        <p>Real-time UV alerts for your location</p>
        <p className="location-text">{locationName}</p>
      </section>

      <section className="info-card uv-summary-card">
        <div className="uv-circle">{loading ? "--" : uvIndex ?? "--"}</div>

        <div className="uv-summary-text">
          <p className="small-label">Current UV Index</p>
          <h2>{loading ? "Loading..." : status || "Unavailable"}</h2>
          <p>{loading ? "Fetching latest UV data..." : warning || "No warning available."}</p>

          {temperature !== null && (
            <p className="small-label">Temperature: {temperature}°C</p>
          )}

          {updatedAt && (
            <p className="small-label">Updated: {updatedAt}</p>
          )}

          {error && <p className="small-label">{error}</p>}
        </div>
      </section>

      <section className="info-card">
        <h3>Recommended protection</h3>
        {actions.length > 0 ? (
          <ul className="tip-list">
            {actions.map((action, index) => (
              <li key={index}>{action}</li>
            ))}
          </ul>
        ) : (
          <ul className="tip-list">
            <li>Apply SPF 30+ sunscreen</li>
            <li>Wear sunglasses and a wide-brim hat</li>
            <li>Seek shade during midday hours</li>
            <li>Wear protective clothing if possible</li>
          </ul>
        )}
      </section>

      <section className="info-card">
        <h3>UV Index Scale</h3>
        <div className="scale-list">
          <div className="scale-item low">Low: 0-2</div>
          <div className="scale-item moderate">Moderate: 3-5</div>
          <div className="scale-item high">High: 6-7</div>
          <div className="scale-item very-high">Very High: 8-10</div>
          <div className="scale-item extreme">Extreme: 11+</div>
        </div>
      </section>
    </main>
  );
}

export default UVCheck;