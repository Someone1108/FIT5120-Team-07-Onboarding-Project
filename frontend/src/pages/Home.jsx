import { Link } from "react-router-dom";

function Home() {
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
            <Link to="/uv-check" className="primary-btn">
              Check Today's UV Risk
            </Link>

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
              <strong>UV 8</strong>
              <span>Example high-risk UV level on strong days</span>
            </div>
          </div>
        </div>

        <div className="hero-side-card">
          <p className="small-label">Current UV level</p>
          <div className="hero-uv-number">8</div>
          <span className="hero-badge">Very High</span>
          <p className="hero-side-text">
            Protection is needed. Seek shade and use sunscreen.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Home;