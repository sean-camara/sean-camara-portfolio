import { ArrowDown, Download } from "lucide-react";

export function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-grid page-shell">
        <div className="hero-copy" data-reveal="hero">
          <div className="hero-eyebrow">
            <span>Junior Frontend Developer</span>
          </div>
          <h1>
            <span>Frontend</span>
            <span className="hero-title-accent">Developer</span>
          </h1>
          <p className="hero-statement">
            I build polished, accessible web interfaces with TypeScript, REST APIs,
            modern testing tools, and production deployment experience.
          </p>
          <div className="hero-actions">
            <a className="button-primary" href="#projects" data-magnetic>View projects</a>
            <a className="button-secondary" href="/Sean_John_Camara_Resume.pdf" download data-magnetic>
              Download résumé <Download size={15} />
            </a>
            <a className="text-link" href="#contact" data-magnetic>Contact me</a>
          </div>
          <ul className="hero-specialties" aria-label="Frontend strengths">
            <li>Responsive UI</li>
            <li>Accessible interfaces</li>
            <li>Tested integrations</li>
          </ul>
          <a className="scroll-cue" href="#projects">
            <ArrowDown size={15} /> Explore selected work
          </a>
        </div>
        <figure className="hero-portrait" data-reveal="portrait" data-parallax data-parallax-speed="1.25">
          <img
            src="/assets/sean-profile.webp"
            alt="Sean John Camara"
            width="1122"
            height="1402"
            decoding="async"
            fetchPriority="high"
          />
        </figure>
      </div>
    </section>
  );
}
