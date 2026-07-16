import { ArrowDown, ArrowUpRight } from "lucide-react";

export function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-grid page-shell">
        <div className="hero-copy" data-reveal>
          <div className="hero-eyebrow">
            <span>Philippines</span>
            <span>Full-Stack Software Developer</span>
          </div>
          <h1><span>Sean John</span><span className="muted-name">Camara</span></h1>
          <p className="hero-statement">
            I design and ship full-stack web products and native Android apps—
            from interface and architecture to deployment.
          </p>
          <div className="hero-actions">
            <a className="button-primary" href="#projects">View work</a>
            <a className="button-secondary" href="#contact">Get in touch</a>
            <a className="text-link" href="/Sean_John_Camara_Resume.pdf" target="_blank" rel="noreferrer">
              Résumé <ArrowUpRight size={15} />
            </a>
          </div>
          <a className="scroll-cue" href="#projects">
            <ArrowDown size={15} /> Explore selected work
          </a>
        </div>
        <figure className="hero-portrait" data-reveal data-parallax>
          <img
            src="/assets/sean-profile.png"
            alt="Sean John Camara"
            decoding="async"
          />
        </figure>
      </div>
    </section>
  );
}
