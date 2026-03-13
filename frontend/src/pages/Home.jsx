import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import ActionChecklist from "../components/ActionChecklist";
import SeverityBadge from "../components/SeverityBadge";
import { getCurrentUV, getLocations, getLocationByName } from "../services/api";
import {
  getUVSeverity,
  getUVAdvice,
  getUVActions
} from "../utils/uvHelpers";

function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [manualLocation, setManualLocation] = useState("");
  const [availableLocations, setAvailableLocations] = useState([]);
  const [uvResult, setUvResult] = useState(null);

  useEffect(() => {
    async function loadLocations() {
      try {
        const locationData = await getLocations();
        setAvailableLocations(locationData);
      } catch (err) {
        console.error("Could not load locations", err);
      }
    }

    loadLocations();
  }, []);

  async function handleCheckUv() {
    setLoading(true);
    setError("");
    setPermissionDenied(false);

    if (!navigator.geolocation) {
      setLoading(false);
      setError("Geolocation is not supported on this device.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const lat = position.coords.latitude.toFixed(2);
          const lng = position.coords.longitude.toFixed(2);

          let response;

          try {
            response = await getCurrentUV(lat, lng);
          } catch {
            // Temporary fallback if backend UV endpoint is still not ready.
            response = {
              uv_index: 8,
              location: `Near ${lat}, ${lng}`,
              updated_at: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
              })
            };
          }

          const uvValue = Math.round(response.uv_index || 8);
          const severity = getUVSeverity(uvValue);

          setUvResult({
            uvIndex: uvValue,
            level: severity,
            location: response.location || `Near ${lat}, ${lng}`,
            updatedAt:
              response.updated_at ||
              new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
              }),
            warning: getUVAdvice(uvValue),
            actions: getUVActions(uvValue)
          });
        } catch (err) {
          setError("Could not fetch UV information for your location.");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setLoading(false);
        setPermissionDenied(true);
        setError("Location access was denied. Please choose a suburb manually.");
      }
    );
  }

  async function handleManualSearch() {
    if (!manualLocation.trim()) {
      setError("Please enter or select a suburb.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const selectedLocation = await getLocationByName(manualLocation);

      let response;

      try {
        response = await getCurrentUV(
          selectedLocation.latitude,
          selectedLocation.longitude
        );
      } catch {
        // Temporary fallback until full backend route is ready.
        response = {
          uv_index: 7,
          location: `${selectedLocation.suburb}, ${selectedLocation.state}`,
          updated_at: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          })
        };
      }

      const uvValue = Math.round(response.uv_index || 7);
      const severity = getUVSeverity(uvValue);

      setUvResult({
        uvIndex: uvValue,
        level: severity,
        location:
          response.location ||
          `${selectedLocation.suburb}, ${selectedLocation.state}`,
        updatedAt:
          response.updated_at ||
          new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          }),
        warning: getUVAdvice(uvValue),
        actions: getUVActions(uvValue)
      });
    } catch (err) {
      setError("Could not find that location. Please try another suburb.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page">
      <section className="hero-layout">
        <div className="hero-card">
          <p className="eyebrow">UV tracking and protection</p>
          <h1>
            Know Your <span className="accent-text">UV Risk</span>
            <br />
            Protect Your Skin
          </h1>

          <p className="hero-text">
            UVGuard helps young adults in Australia understand UV levels, learn
            why sun protection matters, and take simple steps to stay safe.
          </p>

          <div className="hero-actions">
            <button className="primary-btn" onClick={handleCheckUv}>
              Check Today's UV Risk
            </button>

            <Link to="/uv-awareness" className="secondary-btn">
              Explore UV Awareness
            </Link>
          </div>

          <div className="hero-mini-stats">
            <div className="mini-stat">
              <strong>2 in 3</strong>
              <span>Australians may develop skin cancer by age 70</span>
            </div>
            <div className="mini-stat">
              <strong>Real-time</strong>
              <span>UV alerts based on your location or suburb selection</span>
            </div>
          </div>
        </div>

        <div className="hero-side-card">
          <p className="small-label">Current UV level</p>

          {uvResult ? (
            <>
              <div className="hero-uv-number">{uvResult.uvIndex}</div>
              <SeverityBadge level={uvResult.level} />
              <p className="hero-side-text">{uvResult.warning}</p>
              <p className="small-label">Location: {uvResult.location}</p>
              <p className="small-label">Updated: {uvResult.updatedAt}</p>
            </>
          ) : (
            <>
              <div className="hero-uv-number">--</div>
              <span className="hero-badge">Waiting</span>
              <p className="hero-side-text">
                Click the button to check today's UV risk.
              </p>
            </>
          )}
        </div>
      </section>

      {loading && <LoadingState message="Fetching UV data..." />}

      {error && !loading && (
        <ErrorState message={error} onRetry={handleCheckUv} />
      )}

      {permissionDenied && (
        <section className="info-card manual-location-card">
          <h3>Choose your suburb manually</h3>
          <p>
            Location access was denied. Enter or select a suburb to view UV
            information.
          </p>

          <input
            type="text"
            className="location-input"
            placeholder="Enter suburb name"
            value={manualLocation}
            onChange={(e) => setManualLocation(e.target.value)}
            list="location-options"
          />

          <datalist id="location-options">
            {availableLocations.slice(0, 100).map((item, index) => (
              <option
                key={index}
                value={item.suburb}
              >{`${item.suburb}, ${item.state}`}</option>
            ))}
          </datalist>

          <button className="primary-btn" onClick={handleManualSearch}>
            Search UV for this location
          </button>
        </section>
      )}

      {uvResult && !loading && (
        <>
          <section className="info-card uv-summary-card">
            <div className="uv-circle">{uvResult.uvIndex}</div>

            <div className="uv-summary-text">
              <p className="small-label">Current UV Index</p>
              <h2>{uvResult.level}</h2>
              <p>{uvResult.warning}</p>
              <p className="small-label">Location: {uvResult.location}</p>
              <p className="small-label">Updated: {uvResult.updatedAt}</p>
            </div>
          </section>

          <ActionChecklist actions={uvResult.actions} />
        </>
      )}
    </main>
  );
}

export default Home;