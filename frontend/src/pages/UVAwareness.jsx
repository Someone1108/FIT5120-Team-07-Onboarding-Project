import { useState } from "react";
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
          This chart area will display the final visualisation once the dataset
          is added by the team.
        </p>
        <div className="chart-placeholder">Skin cancer chart placeholder</div>
      </section>

      <section className="chart-card">
        <h3>Australian UV or Heat Trends Over Time</h3>
        <p className="chart-note">
          This section will show a line graph highlighting harmful UV periods.
        </p>
        <div className="chart-placeholder">UV trend line graph placeholder</div>
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