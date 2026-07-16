import { ArrowUpRight, Code2, ExternalLink, Play } from "lucide-react";
import type { Project } from "../data/projects";

type ProjectShowcaseProps = {
  projects: Project[];
};

export function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  return (
    <section className="editorial-section page-shell" id="projects">
      <div className="section-heading" data-reveal>
        <div>
          <p className="section-kicker">[ Selected case studies ]</p>
          <h2>Software built for<br />real use.</h2>
        </div>
        <p className="section-intro">
          Deployed web systems, productivity tools, finance workflows,
          and a native Android application—designed and engineered end to end.
        </p>
      </div>

      <dl className="portfolio-stats" data-reveal aria-label="Portfolio overview">
        <div><dt>{projects.length}</dt><dd>Featured products</dd></div>
        <div><dt>{projects.filter((project) => project.liveUrl).length}</dt><dd>Live web applications</dd></div>
        <div><dt>{projects.filter((project) => project.visual === "shelflife").length}</dt><dd>Native Android application</dd></div>
      </dl>

      <div className="project-grid" role="region" aria-label="Featured projects">
        {projects.map((project, index) => {
          return (
            <article
              className="project-card"
              key={project.title}
              data-reveal
            >
              <ProjectImage project={project} />
              <div className="project-body">
                <div className="project-number">{String(index + 1).padStart(2, "0")}</div>
                <p className="project-type">{project.type}</p>
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-evidence">
                  <div>
                    <span>Challenge</span>
                    <p>{project.caseStudy.challenge}</p>
                  </div>
                  <div>
                    <span>My ownership</span>
                    <p>{project.caseStudy.ownership}</p>
                  </div>
                  <div className="engineering-evidence">
                    <span>Engineering evidence</span>
                    <ul>
                      {project.caseStudy.engineering.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                </div>
                <div className="project-tech" aria-label={`${project.title} technologies`}>
                  {project.tech.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
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
                      <span className="project-unavailable">
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
    <figure className="project-image">
      <img
        src={project.imageUrl}
        alt={`${project.title} screenshot`}
        loading="lazy"
        decoding="async"
      />
    </figure>
  );
}
