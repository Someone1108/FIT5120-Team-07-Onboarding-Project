import { useState } from "react";
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
import { skinCancerImpactData, uvTrendData } from "../data/chartData";

function UVAwareness() {
  const [selectedTone, setSelectedTone] = useState(null);

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
          Australia has one of the highest skin cancer rates in the world.
          Learning about UV trends and skin cancer impact can help users make
          better decisions about sunscreen, shade, and outdoor activities.
        </p>
      </section>

      <section className="chart-card">
        <h3>Skin Cancer Impact in Australia</h3>
        <p className="chart-note">
          This chart shows melanoma cases in Australia over time. Hover over
          each bar to view the exact value.
        </p>

        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart
              data={skinCancerImpactData}
              margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="year"
                label={{
                  value: "Year",
                  position: "insideBottom",
                  offset: -10,
                }}
              />
              <YAxis
                label={{
                  value: "Number of Cases",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="incidence"
                name="Skin Cancer Cases"
                fill="#f6b44b"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="chart-card">
        <h3>Australian UV Trends Over Time</h3>
        <p className="chart-note">
          This line graph highlights periods where UV exposure reaches harmful
          levels (UV index 3 or above).
        </p>

        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={320}>
            <LineChart
              data={uvTrendData}
              margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                label={{
                  value: "Date",
                  position: "insideBottom",
                  offset: -10,
                }}
              />
              <YAxis
                label={{
                  value: "UV Index",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip />
              <Legend />
              <ReferenceLine
                y={3}
                stroke="#ff6b6b"
                strokeDasharray="6 6"
                label="Harmful level (UV 3+)"
              />
              <Line
                type="monotone"
                dataKey="uv"
                name="UV Index"
                stroke="#f6b44b"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
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