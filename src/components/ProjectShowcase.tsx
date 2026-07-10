import {
  ArrowUpRight,
  CheckCircle2,
  Code2,
  ExternalLink,
  Play,
} from "lucide-react";
import type { Project } from "../data/projects";

type ProjectShowcaseProps = {
  projects: Project[];
};

export function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  return (
    <section className="section-shell projects-section" id="projects">
      <div className="projects-heading">
        <div>
          <p className="section-kicker">Selected work</p>
          <h2>Products built for real use.</h2>
        </div>
        <p>
          A focused collection of deployed web systems, productivity tools, finance
          workflows, and native Android applications.
        </p>
      </div>

      <div className="project-list">
        {projects.map((project, index) => {
          return (
            <article className={`editorial-project editorial-project-${project.visual}`} key={project.title}>
              <ProjectImage project={project} />
              <div className="project-body">
                <p className="project-index">{String(index + 1).padStart(2, "0")} / Project</p>
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
                  {project.liveUrl ? (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer">
                      <ExternalLink size={16} />
                      {project.liveActionLabel ?? "Live Demo"}
                      <ArrowUpRight size={14} />
                    </a>
                  ) : (
                    project.liveActionLabel && (
                      <span className="project-action-disabled">
                        <Play size={16} />
                        {project.liveActionLabel}
                      </span>
                    )
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ProjectImage({ project }: { project: Project }) {
  return (
    <figure className={`project-visual ${project.visual}`}>
      <img
        src={project.imageUrl}
        alt={`${project.title} screenshot`}
        loading="lazy"
        decoding="async"
      />
    </figure>
  );
}
