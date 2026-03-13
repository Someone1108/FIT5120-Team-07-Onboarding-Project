import React from "react";
import { Link } from "react-router-dom";
import "../styles/HomePage.css";
import logo from "../assets/logo.jpeg";

function HomePage() {
  return (
    <div className="page-container home-page">
      <main className="content-container">
        <section className="hero-section">
          <h1>Welcome to UVGuard</h1>
          <p className="intro-text">
            Helping young Australians make safer decisions in the sun.
          </p>
        </section>

        <section className="about-section">
          <h2>About UVGuard</h2>
          <p>
            UVGuard is a web application that helps young Australians make safer decisions
            in the sun. By combining real-time UV data, visual insights, and personalised
            sun-protection advice, the platform transforms complex UV information into
            simple and practical guidance. Through interactive features such as UV risk
            tracking, skin-tone awareness, and Australian UV trend visualisations,
            UVGuard empowers users to understand their personal UV risk and build
            healthier sun-protection habits.
          </p>
        </section>

        <section className="features-section">
          <h2>Our Features</h2>
          <div className="feature-cards">
            <div className="feature-card">
              <h3>UV Check</h3>
              <p>Check current UV levels and understand today’s UV risk.</p>
            </div>

            <div className="feature-card">
              <h3>UV Awareness</h3>
              <p>
                Learn about Australian UV trends, skin cancer risk, and skin
                tone awareness.
              </p>
            </div>

            <div className="feature-card">
              <h3>Simple Guidance</h3>
              <p>
                Get practical and easy-to-understand advice for better
                sun-protection habits.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;