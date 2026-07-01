import { ArrowUpRight, CheckCircle2, Code2, ExternalLink } from "lucide-react";
import type { Project } from "../data/projects";

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
            <ProjectImage project={project} />
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

function ProjectImage({ project }: { project: Project }) {
  return (
    <div className={`project-visual ${project.visual}`}>
      <div className="visual-badge">{project.type}</div>
      <div className="project-screenshot-frame">
        <img
          src={project.imageUrl}
          alt={`${project.title} screenshot`}
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}
