import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="page">
      <section className="hero-card">
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

          <Link to="/about" className="secondary-btn">
            Learn More
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;