function ProtectionTips() {
  return (
    <main className="page">
      <section className="page-intro">
        <h1>Protection Tips</h1>
        <p>Simple sun-safe actions based on current UV conditions</p>
      </section>

      <section className="info-card">
        <h3>Daily protection essentials</h3>
        <div className="tips-grid">
          <div className="mini-card">Sunscreen SPF 30+</div>
          <div className="mini-card">Wide-brim hat</div>
          <div className="mini-card">Sunglasses</div>
          <div className="mini-card">Seek shade</div>
          <div className="mini-card">Protective clothing</div>
        </div>
      </section>

      <section className="info-card">
        <h3>Protection guide by UV level</h3>
        <div className="scale-list">
          <div className="scale-item low">Low: basic protection is usually enough</div>
          <div className="scale-item moderate">Moderate: sunscreen and sunglasses recommended</div>
          <div className="scale-item high">High: protection required during midday hours</div>
          <div className="scale-item very-high">Very High: seek shade and limit exposure</div>
          <div className="scale-item extreme">Extreme: avoid direct sun where possible</div>
        </div>
      </section>
    </main>
  );
}

export default ProtectionTips;