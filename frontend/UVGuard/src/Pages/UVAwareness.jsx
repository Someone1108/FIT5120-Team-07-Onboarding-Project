import "../styles/UVAwareness.css";
import React from "react";
import { Link } from "react-router-dom";

function UVAwareness() {
  return (
    <div className="uv-awareness-page">

      <main className="main-content">

        {/* Page Header */}
        <div className="page-header">
          <h1>UV Awareness</h1>
          <p>Understanding UV trends and skin cancer impact</p>
        </div>

        {/* UV Trend Chart Section */}
        <div className="chart-card">
          <h3>UV Index & Temperature Trends (2015-2025)</h3>

          <div className="chart-placeholder">
            Chart will be rendered here
          </div>
        </div>

        {/* Skin Cancer Chart Section */}
        <div className="chart-card">
          <h3>Skin Cancer Incidence & Mortality (per 100,000)</h3>

          <div className="chart-placeholder">
            Chart will be rendered here
          </div>
        </div>

      </main>

    </div>
  );
}

export default UVAwareness;