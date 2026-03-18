import { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ReferenceLine,
} from "recharts";
import skinToneData from "../data/skinToneData";

function UVAwareness() {
  const [selectedTone, setSelectedTone] = useState(null);
  const [skinCancerData, setSkinCancerData] = useState([]);
  const [uvData, setUvData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const [cancerRes, uvRes] = await Promise.all([
          fetch(
            "https://fit5120-team-07-onboarding-project.onrender.com/api/cancer/incidence"
          ),
          fetch(
            "https://fit5120-team-07-onboarding-project.onrender.com/api/uv/trend"
          ),
        ]);

        if (!cancerRes.ok) {
          throw new Error(`Cancer API error: ${cancerRes.status}`);
        }

        if (!uvRes.ok) {
          throw new Error(`UV API error: ${uvRes.status}`);
        }

        const cancerJson = await cancerRes.json();
        const uvJson = await uvRes.json();

        const formattedCancerData = cancerJson.map((item) => ({
          year: item.year,
          count: Number(item.count),
        }));

        // Aggregate UV data by month to reduce visual clutter
        const uvByMonthMap = uvJson.reduce((acc, item) => {
          const dateObj = new Date(item.record_date);
          const monthKey = `${dateObj.getFullYear()}-${dateObj.getMonth()}`; // e.g. "2018-0"
          const dailyMaxUv = Number(item.daily_max_uv);
          const dailyAvgUv = Number(item.daily_avg_uv);

          if (!acc[monthKey]) {
            acc[monthKey] = {
              dateObj,
              sumMaxUv: 0,
              sumAvgUv: 0,
              count: 0,
            };
          }

          acc[monthKey].sumMaxUv += dailyMaxUv;
          acc[monthKey].sumAvgUv += dailyAvgUv;
          acc[monthKey].count += 1;

          return acc;
        }, {});

        const formattedUvData = Object.values(uvByMonthMap)
          .sort((a, b) => a.dateObj - b.dateObj)
          .map((bucket) => ({
            date: bucket.dateObj.toLocaleDateString("en-AU", {
              month: "short",
              year: "2-digit",
            }),
            uv: bucket.sumMaxUv / bucket.count,
            avgUv: bucket.sumAvgUv / bucket.count,
          }));

        setSkinCancerData(formattedCancerData);
        setUvData(formattedUvData);
      } catch (err) {
        console.error("Error fetching API data:", err);
        setError("Failed to load chart data from backend.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="page">
      <section className="page-intro">
        <h1>UV Awareness</h1>
        <p>
          Understanding how UV exposure affects health in Australia and why sun
          safety matters.
        </p>
      </section>

      <section className="info-card">
        <h3>Why UV awareness matters</h3>
        <p>
          This page combines long-term skin cancer and UV trend data to help users
          understand why sun protection matters in Australia. The charts below show
          how UV exposure remains a serious public health concern over time.
        </p>
      </section>

      <section className="chart-card">
        <h3>Skin Cancer Impact in Australia</h3>
        <p className="chart-note">
          This chart shows melanoma cases in Australia over time. Hover over
          each bar to view the exact value.
        </p>

        <div className="chart-wrapper">
          {loading ? (
            <div className="chart-placeholder">Loading chart...</div>
          ) : error ? (
            <div className="chart-placeholder" style={{ color: "red" }}>
              {error}
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={360}>
              <BarChart
                data={skinCancerData}
                margin={{ top: 20, right: 20, left: 20, bottom: 70 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="year"
                  tick={{ fontSize: 12 }}
                  interval={1}
                  label={{
                    value: "Year",
                    position: "insideBottom",
                    offset: -5,
                  }}
                />
                <YAxis
                  label={{
                    value: "Cases",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip
                  labelStyle={{ color: "#f6b44b", fontWeight: 600 }}
                />
                <Legend
                  verticalAlign="bottom"
                  align="center"
                  wrapperStyle={{ paddingTop: "25px" }}
                />
                <Bar
                  dataKey="count"
                  name="Skin Cancer Cases"
                  fill="#f6b44b"
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </section>

      <section className="chart-card">
        <h3>Australian UV Trends Over Time</h3>
        <p className="chart-note">
          This line graph highlights periods where UV exposure reaches harmful
          levels (UV index 3 or above).
        </p>

        <div className="chart-wrapper">
          {loading ? (
            <div className="chart-placeholder">Loading chart...</div>
          ) : error ? (
            <div className="chart-placeholder" style={{ color: "red" }}>
              {error}
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={360}>
              <LineChart
                data={uvData}
                margin={{ top: 20, right: 20, left: 20, bottom: 70 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  minTickGap={30}
                  label={{
                    value: "Year / Month",
                    position: "insideBottom",
                    offset: -5,
                  }}
                />
                <YAxis
                  label={{
                    value: "UV Index",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip
                  formatter={(value, name) => [
                    value,
                    name === "uv" ? "Daily Max UV" : name,
                  ]}
                  labelFormatter={(label) => `Date: ${label}`}
                  labelStyle={{ color: "#f6b44b", fontWeight: 600 }}
                />
                <ReferenceLine
                  y={3}
                  stroke="#ff6b6b"
                  strokeWidth={4}
                  strokeDasharray="6 6"
                />
                <Line
                  type="monotone"
                  dataKey="uv"
                  name="Daily Max UV"
                  stroke="#f6b44b"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
        {!loading && !error && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "24px",
              marginTop: "12px",
              fontSize: "0.9rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span
                style={{
                  width: "20px",
                  height: "3px",
                  backgroundColor: "#f6b44b",
                  borderRadius: "999px",
                }}
              ></span>
              <span style={{ color: "#f6b44b" }}>Daily Max UV</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span
                style={{
                  width: "20px",
                  height: "3px",
                  backgroundColor: "#ff6b6b",
                  borderRadius: "999px",
                }}
              ></span>
              <span style={{ color: "#ff6b6b" }}>Harmful level (UV 3+)</span>
            </div>
          </div>
        )}
      </section>

      <section className="info-card skin-awareness-section">
        <div className="skin-awareness-header">
          <h3>Skin Colour Customisation</h3>
          <p>
            Select the skin tone that best matches yours to see how UV
            sensitivity and protection guidance may differ.
          </p>
        </div>

        <div className="skin-awareness-layout">
          <div className="skin-selector-panel">
            <h4>Select Your Skin Type</h4>
            <p className="selector-subtext">
              Click on the skin tone that best matches yours
            </p>

            <div className="skin-types-grid">
              {skinToneData.map((tone) => (
                <button
                  key={tone.id}
                  className={`skin-type-btn ${
                    selectedTone?.id === tone.id ? "skin-type-btn-active" : ""
                  }`}
                  onClick={() => setSelectedTone(tone)}
                >
                  <div
                    className="skin-color-circle"
                    style={{ backgroundColor: tone.color }}
                  ></div>
                  <span className="skin-type-name">{tone.type}</span>
                  <span className="skin-type-desc">{tone.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="skin-result-panel">
            {!selectedTone ? (
              <div className="skin-empty-state">
                <div className="skin-empty-icon">☝️</div>
                <h4>Select your skin type</h4>
                <p>
                  Click on a skin tone to see personalised UV absorption
                  information and protection recommendations.
                </p>
              </div>
            ) : (
              <div className="skin-result-content">
                <div className="skin-result-top">
                  <div
                    className="skin-result-circle"
                    style={{ backgroundColor: selectedTone.color }}
                  ></div>

                  <div>
                    <p className="result-type-label">{selectedTone.type}</p>
                    <h4>{selectedTone.name}</h4>
                    <span className="sensitivity-badge">
                      {selectedTone.sensitivity}
                    </span>
                  </div>
                </div>

                <div className="skin-result-card">
                  <h5>UV Absorption Information</h5>
                  <p>{selectedTone.absorption}</p>
                </div>

                <div className="skin-result-card">
                  <h5>Relationship to UV Exposure Risk</h5>
                  <p>{selectedTone.risk}</p>
                </div>

                <div className="skin-result-card">
                  <h5>Recommended Sun Protection</h5>
                  <p>{selectedTone.advice}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="info-card">
        <h3>Key takeaways</h3>
        <ul className="tip-list">
          <li>High UV can happen even on cooler days.</li>
          <li>Cloud cover does not always mean low UV exposure.</li>
          <li>Darker skin tones still need sun protection.</li>
          <li>Regular protection helps reduce long-term skin damage.</li>
        </ul>
      </section>
    </main>
  );
}

export default UVAwareness;