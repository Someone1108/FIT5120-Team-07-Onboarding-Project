function UVAwareness() {
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
          Placeholder area for the chart. This will be replaced once the final
          dataset is provided by the data team.
        </p>
        <div className="chart-placeholder">Chart placeholder</div>
      </section>

      <section className="chart-card">
        <h3>UV or Heat Trends Over Time</h3>
        <p className="chart-note">
          Placeholder area for the line graph. Final visualisation will be added
          after the dataset is finalised.
        </p>
        <div className="chart-placeholder">Line graph placeholder</div>
      </section>

      <section className="info-card">
        <h3>Key takeaways</h3>
        <ul className="tip-list">
          <li>High UV can happen even on cooler days.</li>
          <li>Cloud cover does not always mean low UV exposure.</li>
          <li>Regular sun protection helps reduce long-term skin damage.</li>
        </ul>
      </section>
    </main>
  );
}

export default UVAwareness;