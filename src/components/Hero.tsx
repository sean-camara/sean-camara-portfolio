import { ArrowRight } from "lucide-react";

const chips = ["React", "TypeScript", "Firebase", "Cloudflare", "MongoDB", "Kotlin"];

export function Hero() {
  return (
    <section className="hero section-shell" id="home">
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="status-chip">
            <span aria-hidden="true" />
            Full-Stack Web Developer
          </div>
          <h1>
            Full-Stack Web Developer building <span>real-world systems.</span>
          </h1>
          <p className="hero-lede">
            I build responsive web apps, dashboards, and AI-powered tools with clean UI
            and reliable workflows.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">
              View My Work
              <ArrowRight size={18} />
            </a>
            <a className="button button-secondary" href="#contact">
              Contact Me
            </a>
          </div>
          <div className="hero-chips" aria-label="Core technologies">
            {chips.map((chip) => (
              <span key={chip}>{chip}</span>
            ))}
          </div>
        </div>

        <div className="hero-visual" aria-label="Abstract developer dashboard mockup">
          <div className="dashboard-card glass-card">
            <div className="dash-header">
              <div className="dash-title-line" />
              <div className="dash-dots" aria-hidden="true">
                <span />
                <span />
              </div>
            </div>
            <div className="dash-metrics">
              <div>
                <strong>Projects</strong>
                <span>Web Apps</span>
              </div>
              <div>
                <strong>AI Tools</strong>
                <span>Mobile Bonus</span>
              </div>
            </div>
            <div className="dash-panel">
              <div className="panel-line wide" />
              <div className="panel-line" />
              <div className="project-row">
                <span />
                <span />
                <strong />
              </div>
              <div className="project-row">
                <span />
                <span />
                <strong />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
