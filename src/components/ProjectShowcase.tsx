import type { Project } from "../data/projects";
import { ProjectMedia } from "./ProjectMedia";

export function ProjectShowcase({ projects }: { projects: Project[] }) {
  return (
    <section className="work-section dark-surface" id="projects">
      <div className="page-shell">
        <div className="section-heading work-heading">
          <div>
            <p className="section-kicker">01 / Selected work</p>
            <h2>
              Made with intent.
              <br />
              <span className="muted">Built for people.</span>
            </h2>
          </div>
          <p className="section-intro">
            Creative websites, business workflows, and everyday tools. A closer
            look at what I’ve built and how it works.
          </p>
        </div>
        <div className="featured-projects">
          {projects.slice(0, 3).map((project, index) => (
            <article
              className={`project-chapter chapter-${project.visual}`}
              key={project.visual}
              id={`project-${project.visual}`}
            >
              <div className="chapter-topline">
                <span>
                  0{index + 1} / {project.type}
                </span>
                <span>{project.context}</span>
              </div>
              <div className="chapter-layout">
                <div className="chapter-story">
                  <p className="project-role">{project.role}</p>
                  <h3>{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <p className="project-highlight">
                    {project.highlights[index === 0 ? 4 : 1]}
                  </p>
                  <ul
                    className="tech-list"
                    aria-label={`${project.title} technologies`}
                  >
                    {project.tech.slice(0, 4).map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
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
                  <a
                    className="project-image-link"
                    href={`/work/${project.visual}/`}
                    aria-label={`View ${project.title} project`}
                  >
                    <ProjectMedia project={project} />
                  </a>
                  <div className="image-caption">
                    <span>Website / Project showcase</span>
                    <span>{project.status}</span>
                  </div>
                  {index === 2 && (
                    <div className="workflow-note">
                      <span className="mono">Behind the interface</span>
                      <p>
                        Appointment <span aria-hidden="true">→</span> Project{" "}
                        <span aria-hidden="true">→</span> Fabrication
                      </p>
                      <span>
                        Role-specific workflows for customers, staff, and
                        administrators.
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="project-index" id="project-index">
          <div className="index-heading">
            <h3>More from the workbench.</h3>
            <span className="mono">04 — 07</span>
          </div>
          <div className="project-index-grid">
            {projects.slice(3).map((project, index) => (
              <article className="index-row" key={project.visual}>
                <a
                  className="index-image-link project-image-link"
                  href={`/work/${project.visual}/`}
                  aria-label={`View ${project.title} project`}
                >
                  <ProjectMedia project={project} />
                </a>
                <span className="index-number">0{index + 4}</span>
                <a className="index-title" href={`/work/${project.visual}/`}>
                  <h4>{project.title}</h4>
                  <span>{project.type}</span>
                </a>
                <p>
                  {project.summary}
                  <small>{project.status}</small>
                </p>
                <a
                  className="index-action"
                  href={`/work/${project.visual}/`}
                  aria-label={`Explore ${project.title} case study`}
                >
                  <span>Explore</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
