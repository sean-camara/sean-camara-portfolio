import type { Project } from "../data/projects";
import { ProjectMedia } from "./ProjectMedia";
import dimensions from "../data/media.json";

export function ProjectCaseStudy({
  project,
  projects,
}: {
  project: Project;
  projects: Project[];
}) {
  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  const previous = projects[(index - 1 + projects.length) % projects.length];
  return (
    <article className="case-study">
      <header className="case-header page-shell">
        <a
          className="text-link case-back"
          href={`/#project-${index < 3 ? project.visual : "index"}`}
        >
          ← Return to work
        </a>
        <p className="section-kicker">
          Case study / {String(index + 1).padStart(2, "0")} / {project.type}
        </p>
        <h1>{project.title}</h1>
        <p className="case-deck">{project.description}</p>
        <dl className="case-meta">
          <div>
            <dt>Role</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>Context</dt>
            <dd>{project.context}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>{project.status}</dd>
          </div>
        </dl>
        <div className="case-links">
          {project.links.map((link) => (
            <a
              className={link.kind === "demo" ? "button-primary" : "text-link"}
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label} <span aria-hidden="true">↗</span>
            </a>
          ))}
          {project.unavailableDemo && <p>{project.unavailableDemo}</p>}
        </div>
      </header>
      <div className="case-cover dark-surface">
        <div className="page-shell">
          <ProjectMedia key={project.visual} project={project} priority wide />
          <p className="image-caption">{project.title} / Interface overview</p>
        </div>
      </div>
      <div className="case-narrative page-shell">
        <aside className="case-contents">
          <p className="section-kicker">Inside the project</p>
          <nav aria-label="Case study contents">
            <a href="#problem">01 / The problem</a>
            <a href="#approach">02 / The approach</a>
            <a href="#implementation">03 / Implementation</a>
            <a href="#delivery">04 / Delivery & lessons</a>
          </nav>
          <p className="mono">Built with</p>
          <ul className="tech-list">
            {project.tech.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </aside>
        <div className="case-story">
          <section id="problem">
            <p className="section-kicker">01 / Context</p>
            <h2>The problem to solve.</h2>
            <p>{project.caseStudy.problem}</p>
          </section>
          <section id="approach">
            <p className="section-kicker">02 / Approach</p>
            <h2>From need to interface.</h2>
            <p>{project.caseStudy.solution}</p>
            <h3>What I built</h3>
            <ul>
              {project.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          {project.gallery?.map((shot) => (
            <figure
              className={`case-gallery ${project.visual === "shelflife" ? "case-gallery-phone" : ""}`}
              key={shot.src}
            >
              <a
                href={shot.src}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open full-size ${shot.caption}`}
              >
                <img
                  src={shot.src}
                  alt={shot.alt}
                  loading="lazy"
                  decoding="async"
                  width={
                    (
                      dimensions as Record<
                        string,
                        { width: number; height: number }
                      >
                    )[shot.src]?.width
                  }
                  height={
                    (
                      dimensions as Record<
                        string,
                        { width: number; height: number }
                      >
                    )[shot.src]?.height
                  }
                />
              </a>
              <figcaption>
                {shot.caption}
                <span>Open full size ↗</span>
              </figcaption>
            </figure>
          ))}
          <section id="implementation">
            <p className="section-kicker">03 / Implementation</p>
            <h2>How it fits together.</h2>
            <p>{project.caseStudy.architecture}</p>
            <h3>Decisions that shaped the build</h3>
            <ul>
              {project.caseStudy.decisions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h3>Challenges</h3>
            <ul>
              {project.caseStudy.challenges.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section id="delivery">
            <p className="section-kicker">04 / Delivery & lessons</p>
            <h2>Built, tested, and still learning.</h2>
            <h3>Testing</h3>
            <p>{project.caseStudy.testing}</p>
            <h3>Deployment</h3>
            <p>{project.caseStudy.deployment}</p>
            <h3>What I took forward</h3>
            <ul>
              {project.caseStudy.lessons.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {project.caseStudy.limitation && (
              <aside className="case-limitation">
                <h3>Scope & remaining work</h3>
                <p>{project.caseStudy.limitation}</p>
              </aside>
            )}
          </section>
        </div>
      </div>
      <nav className="case-pagination page-shell" aria-label="Browse projects">
        <a href={`/work/${previous.visual}/`}>
          <span className="mono">← Previous project</span>
          <strong>{previous.title}</strong>
        </a>
        <a href={`/work/${next.visual}/`}>
          <span className="mono">Next project ↗</span>
          <strong>{next.title}</strong>
        </a>
      </nav>
    </article>
  );
}
