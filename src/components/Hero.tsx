import { ArrowDown, ArrowDownToLine, ArrowUpRight } from "lucide-react";

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
            I design and build full-stack web applications and native Android
            apps.
          </p>
          <div className="hero-actions">
            <a className="button-primary" href="#projects">
              View selected work <ArrowDown size={16} aria-hidden="true" />
            </a>
            <div className="hero-secondary-actions">
              <a href="#contact">
                Get in touch <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <a href="/Sean_John_Camara_Resume.pdf" download>
                Download résumé <ArrowDownToLine size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
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
    </section>
  );
}
