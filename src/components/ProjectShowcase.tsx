import type { Project } from "../data/projects";
import { ProjectMedia } from "./ProjectMedia";

export function ProjectShowcase({ projects }: { projects: Project[] }) {
  return (
    <section className="work-section dark-surface" id="projects">
      <div className="page-shell">
        <div className="section-heading work-heading">
          <h2>Selected work</h2>
        </div>
        <div className="featured-projects">
          {projects.slice(0, 3).map((project) => (
            <article
              className={`project-chapter chapter-${project.visual}`}
              key={project.visual}
              id={`project-${project.visual}`}
            >
              <div className="chapter-layout">
                <div className="chapter-story">
                  <div className="chapter-intro">
                    <h3>{project.title}</h3>
                    <p className="project-description">{project.summary}</p>
                  </div>
                  <div className="project-actions">
                    <a
                      className="text-link"
                      href={`/work/${project.visual}/`}
                      aria-label={`Read case study: ${project.title}`}
                    >
                      Read case study <span aria-hidden="true">↗</span>
                    </a>
                    {project.links
                      .filter((link) => link.kind === "demo")
                      .map((link) => (
                        <a
                          className="project-external"
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Visit site <span aria-hidden="true">↗</span>
                        </a>
                      ))}
                  </div>
                </div>
                <div className="chapter-images">
                  <ProjectMedia project={project} />
                  <div className="image-caption">
                    <span>{project.type}</span>
                    <span>{project.status}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="project-index" id="project-index">
          <div className="index-heading">
            <h3>More projects</h3>
          </div>
          <div className="project-index-grid">
            {projects.slice(3).map((project) => (
              <article className="index-row" key={project.visual}>
                <div className="index-image">
                  <ProjectMedia project={project} />
                </div>
                <div className="index-title">
                  <h4>
                    <a href={`/work/${project.visual}/`}>
                      {project.title} <span aria-hidden="true">↗</span>
                    </a>
                  </h4>
                  <p>{project.type}</p>
                </div>
                <p>
                  {project.summary}
                  <small>{project.status}</small>
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
