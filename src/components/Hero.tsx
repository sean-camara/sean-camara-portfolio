export function Hero() {
  return (
    <section className="hero page-shell" id="home">
      <div className="hero-eyebrow">
        <p>Full-Stack Web & Android Developer</p>
        <span>Based in the Philippines</span>
      </div>
      <div className="hero-grid">
        <div className="hero-copy">
          <h1 aria-label="Full-Stack Developer">
            <span className="hero-title-line" aria-hidden="true">
              <span className="hero-title-inner">Full-Stack</span>
            </span>
            <span
              className="hero-title-line hero-title-accent"
              aria-hidden="true"
            >
              <span className="hero-title-inner">Developer.</span>
            </span>
          </h1>
          <p className="hero-statement">
            I build thoughtful websites, full-stack applications, and native
            Android tools — from interface design to deployment.
          </p>
          <div className="hero-actions">
            <a className="button-primary" href="#projects">
              View selected work <span aria-hidden="true">↘</span>
            </a>
            <a className="text-link" href="#contact">
              Get in touch <span aria-hidden="true">↗</span>
            </a>
          </div>
          <a
            className="resume-link"
            href="/Sean_John_Camara_Resume.pdf"
            download
          >
            Download résumé <span aria-hidden="true">↓</span>
            <span className="mono">PDF</span>
          </a>
        </div>
        <div className="hero-portrait-frame">
          <div className="hero-portrait-depth">
            <img
              src="/assets/sean-profile.webp"
              alt="Sean John Camara"
              width="1122"
              height="1402"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>
      </div>
      <div className="hero-baseline">
        <span className="hero-rule" aria-hidden="true" />
        <a href="#projects">
          Explore selected work <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
