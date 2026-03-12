import { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceArea
} from "recharts";
import { skinCancerImpactData, uvTrendData } from "../data/chartData";
import skinToneData from "../data/skinToneData";

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
          This chart compares annual skin cancer incidence and deaths.
        </p>
        <div className="real-chart">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={skinCancerImpactData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2c3153" />
              <XAxis dataKey="year" stroke="#d8cdbd" />
              <YAxis stroke="#d8cdbd" />
              <Tooltip />
              <Legend />
              <Bar dataKey="incidence" fill="#ffb347" name="Incidence" />
              <Bar dataKey="deaths" fill="#ff6b6b" name="Deaths" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="chart-card">
        <h3>Australian UV or Heat Trends Over Time</h3>
        <p className="chart-note">
          This line graph shows how UV and heat levels change through the year.
          Harmful UV periods are where the UV index rises above safer levels.
        </p>
        <div className="real-chart">
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={uvTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2c3153" />
              <XAxis dataKey="month" stroke="#d8cdbd" />
              <YAxis stroke="#d8cdbd" />
              <Tooltip />
              <Legend />
              <ReferenceArea x1="Jan" x2="Mar" fill="#ff9f43" fillOpacity={0.08} />
              <ReferenceArea x1="Sep" x2="Dec" fill="#ff9f43" fillOpacity={0.08} />
              <Line
                type="monotone"
                dataKey="uv"
                stroke="#ffb347"
                strokeWidth={3}
                name="UV Index"
              />
              <Line
                type="monotone"
                dataKey="heat"
                stroke="#7cc6fe"
                strokeWidth={3}
                name="Average Heat"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="info-card">
        <h3>Skin Colour Customisation</h3>
        <p>
          Select a skin tone to see how UV sensitivity and protection advice may
          vary.
        </p>

        <div className="skin-tone-grid">
          {skinToneData.map((tone) => (
            <button
              key={tone.id}
              className={`tone-card ${selectedTone?.id === tone.id ? "tone-card-active" : ""}`}
              onClick={() => setSelectedTone(tone)}
            >
              <span className="tone-label">{tone.shortLabel}</span>
              <strong>{tone.name}</strong>
            </button>
          ))}
        </div>

        {selectedTone && (
          <div className="skin-tone-result">
            <h4>{selectedTone.name}</h4>
            <p><strong>Sensitivity:</strong> {selectedTone.sensitivity}</p>
            <p><strong>UV absorption context:</strong> {selectedTone.absorption}</p>
            <p><strong>Recommended protection:</strong> {selectedTone.advice}</p>
          </div>
        )}
      </section>
    </main>
  );
}

export default UVAwareness;