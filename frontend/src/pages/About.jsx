function About() {
  return (
    <main className="page">
      <section className="page-intro">
        <h1>About UVGuard</h1>
        <p>Learn what UVGuard does, why it was created, and how your data is handled</p>
      </section>

      <section className="info-card">
        <h3>What UVGuard Does</h3>
        <p>
          UVGuard is designed to help young adults in Australia better understand
          daily UV risk and make safer decisions when spending time outdoors.
          The website provides real-time UV information based on the user's
          location, awareness content about UV exposure, and practical sun
          protection guidance.
        </p>
      </section>

      <section className="info-card">
        <h3>Why We Built It</h3>
        <p>
          Australia has one of the highest skin cancer rates in the world, and
          many people underestimate how harmful UV exposure can be on ordinary
          days. UVGuard was created to make UV information easier to understand
          and more useful in everyday life.
        </p>
      </section>

      <section className="info-card">
        <h3>How to Use the Website</h3>
        <ul className="tip-list">
          <li>Use the UV Check page to view your current UV level</li>
          <li>Visit the UV Awareness page to explore trends, charts, and guidance</li>
          <li>Use the information provided to plan safer outdoor activities</li>
        </ul>
      </section>

      <section className="info-card">
        <h3>Privacy Statement</h3>
        <p>
          UVGuard only uses your location temporarily to retrieve the UV index
          for your area. The website does not store your personal location data,
          does not create user accounts, and does not save personal information
          entered by users.
        </p>

        <div className="soft-alert">
          <p>
            <strong>Important:</strong> Your location is only used to generate
            the current UV result and is not kept or shared by the website.
          </p>
        </div>
      </section>

      <section className="info-card">
        <h3>Disclaimer</h3>
        <p>
          UVGuard is an educational and informational tool. It is intended to
          support sun safety awareness and should not be considered medical
          advice. Users should always follow official health guidance and take
          appropriate precautions when UV levels are high.
        </p>
      </section>
    </main>
  );
}

export default About;