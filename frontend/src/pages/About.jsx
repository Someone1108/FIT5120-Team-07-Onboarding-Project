function About() {
  return (
    <main className="page">
      <section className="page-intro">
        <h1>About UV Protection</h1>
        <p>Understanding UV radiation and why sun protection matters</p>
      </section>

      <section className="info-card">
        <h3>What is UV Radiation?</h3>
        <p>
          Ultraviolet (UV) radiation is a form of electromagnetic radiation that
          comes from the sun. While some UV exposure can help the body produce
          vitamin D, too much of it can be harmful.
        </p>

        <ul className="tip-list">
          <li>
            <strong>UVA:</strong> penetrates deeper into the skin and contributes
            to ageing
          </li>
          <li>
            <strong>UVB:</strong> causes sunburn and plays a major role in skin
            damage
          </li>
          <li>
            <strong>UVC:</strong> is blocked by the atmosphere and does not reach
            the earth’s surface
          </li>
        </ul>
      </section>

      <section className="info-card">
        <h3>Why Sun Protection Matters</h3>
        <p>
          Australia has one of the highest skin cancer rates in the world.
          Excessive UV exposure is one of the biggest preventable causes of skin
          damage and skin cancer.
        </p>

        <div className="soft-alert">
          <p><strong>Key points:</strong></p>
          <ul className="tip-list">
            <li>2 in 3 Australians may develop skin cancer by age 70</li>
            <li>UV damage can happen even on cool or cloudy days</li>
            <li>Young adults often underestimate everyday UV risk</li>
          </ul>
        </div>
      </section>

      <section className="info-card">
        <h3>Prevention Tips</h3>
        <ul className="tip-list">
          <li>Wear SPF 30+ sunscreen</li>
          <li>Use sunglasses and a wide-brim hat</li>
          <li>Seek shade during peak UV hours</li>
          <li>Wear protective clothing where possible</li>
        </ul>
      </section>
    </main>
  );
}

export default About;