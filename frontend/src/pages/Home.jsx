import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="page">
      <section className="hero-layout home-single-column">
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

          <p className="hero-helper-text">
            Check live UV levels on the UV Check page and explore key sun safety
            facts here.
          </p>

          <div className="hero-mini-stats">
            <div className="mini-stat">
              <strong>2 in 3</strong>
              <span>Australians may develop skin cancer by age 70</span>
            </div>
            <div className="mini-stat">
              <strong>Stay aware</strong>
              <span>UV damage can happen even on cool or cloudy days</span>
            </div>
          </div>
        </div>
      </section>

      <section className="info-card home-top-card">
        <h3>What is UV Radiation?</h3>
        <p>
          Ultraviolet (UV) radiation is a form of electromagnetic radiation that
          comes from the sun. While some UV exposure can help the body produce
          vitamin D, too much of it can be harmful.
        </p>
        <ul>
          <li>UVA: penetrates deeper into the skin and contributes to ageing</li>
          <li>UVB: causes sunburn and plays a major role in skin damage</li>
          <li>
            UVC: is blocked by the atmosphere and does not reach the earth's
            surface
          </li>
        </ul>
      </section>

      <div className="home-info-grid">
        <section className="info-card">
          <h3>Why Sun Protection Matters</h3>
          <p>
            Australia has one of the highest skin cancer rates in the world.
            Excessive UV exposure is one of the biggest preventable causes of skin
            damage and skin cancer.
          </p>

          <div className="highlight-box">
            <h4>Key points:</h4>
            <ul>
              <li>2 in 3 Australians may develop skin cancer by age 70</li>
              <li>UV damage can happen even on cool or cloudy days</li>
              <li>Young adults often underestimate everyday UV risk</li>
            </ul>
          </div>
        </section>

        <section className="info-card">
          <h3>Sun Safety Tips</h3>
          <ul>
            <li>Wear SPF 30+ or higher sunscreen and reapply every 2 hours</li>
            <li>Use sunglasses and a wide-brim hat outdoors</li>
            <li>Seek shade during peak UV hours</li>
            <li>Wear protective clothing where possible</li>
            <li>Check the daily UV index before heading out</li>
            <li>Carry sunscreen in your bag for uni, work or outings</li>
            <li>Do not rely on temperature alone UV can still be high on mild days</li>
          </ul>
        </section>
      </div>
    </main>
  );
}

export default Home;