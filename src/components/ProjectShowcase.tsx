import { ArrowUpRight, CheckCircle2, Code2, ExternalLink } from "lucide-react";
import type { Project, ProjectKind } from "../data/projects";

type ProjectShowcaseProps = {
  projects: Project[];
};

export function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  return (
    <section className="section-shell projects-section" id="projects">
      <div className="section-heading">
        <h2>Featured Projects</h2>
        <p>
          A focused collection of practical systems built across full-stack web,
          productivity tools, finance workflows, and native Android.
        </p>
      </div>

      <div className="project-grid">
        {projects.map((project) => (
          <article className="project-card glass-card" key={project.title}>
            <ProjectMockup kind={project.visual} label={project.type} />
            <div className="project-body">
              <p className="project-type">{project.type}</p>
              <h3>{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="tech-list" aria-label={`${project.title} technologies`}>
                {project.tech.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
              <ul className="highlight-list">
                {project.highlights.map((highlight) => (
                  <li key={highlight}>
                    <CheckCircle2 size={16} />
                    {highlight}
                  </li>
                ))}
              </ul>
              <div className="project-actions">
                <a href={project.repoUrl} target="_blank" rel="noreferrer">
                  <Code2 size={16} />
                  {project.actionLabel}
                  <ArrowUpRight size={14} />
                </a>
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer">
                    <ExternalLink size={16} />
                    Live
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProjectMockup({ kind, label }: { kind: ProjectKind; label: string }) {
  return (
    <div className={`project-visual ${kind}`} aria-label={`${label} abstract visual`}>
      <div className="visual-badge">{label}</div>
      {kind === "rmv" && <RmvVisual />}
      {kind === "academia" && <AcademiaVisual />}
      {kind === "flowmoney" && <FlowMoneyVisual />}
      {kind === "shelflife" && <ShelfLifeVisual />}
    </div>
  );
}

function RmvVisual() {
  return (
    <div className="rmv-screen">
      <div className="mock-sidebar" />
      <div className="mock-main">
        <div className="mock-topbar" />
        <div className="mock-card-row">
          <span />
          <span />
          <span />
        </div>
        <div className="mock-chart">
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
      </div>
    </div>
  );
}

function AcademiaVisual() {
  return (
    <div className="academia-board">
      <div className="calendar-grid">
        {Array.from({ length: 12 }, (_, index) => (
          <span key={index} className={index % 4 === 0 ? "active" : ""} />
        ))}
      </div>
      <div className="notes-stack">
        <span />
        <span />
        <span />
      </div>
      <div className="pdf-chip">PDF</div>
    </div>
  );
}

function FlowMoneyVisual() {
  return (
    <div className="flow-board">
      <div className="money-chart">
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="goal-bars">
        <i />
        <i />
        <i />
      </div>
    </div>
  );
}

function ShelfLifeVisual() {
  return (
    <div className="phone-shell">
      <div className="phone-speaker" />
      <div className="phone-card" />
      <div className="phone-list">
        <span />
        <span />
        <span />
      </div>
      <div className="scan-ring" />
    </div>
  );
}
