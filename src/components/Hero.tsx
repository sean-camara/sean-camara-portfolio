import { ArrowRight } from "lucide-react";

const chips = ["React", "TypeScript", "Firebase", "Cloudflare", "MongoDB", "Kotlin"];

export function Hero() {
  return (
    <section className="hero section-shell" id="home">
      <div className="hero-layout">
        <div className="hero-copy">
          <p className="section-kicker hero-kicker">Sean John Camara / Philippines</p>
          <h1>
            Full-stack developer building <span>practical software.</span>
          </h1>
          <div className="hero-bottom">
            <p className="hero-lede">
              I design and ship web products, business systems, and AI-powered tools with
              thoughtful interfaces and dependable workflows.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">
                Selected work
                <ArrowRight size={18} />
              </a>
              <a className="button button-secondary" href="#contact">
                Get in touch
              </a>
            </div>
          </div>
        </div>
        <figure className="hero-visual">
          <img
            src="/assets/rmv-showcase.png"
            alt="RMV Stainless Steel Fabrication project preview"
            decoding="async"
          />
        </figure>
      </div>
      <div className="hero-chips" aria-label="Core technologies">
        {chips.map((chip) => (
          <span key={chip}>{chip}</span>
        ))}
      </div>
    </section>
  );
}
