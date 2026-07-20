import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Code2, ExternalLink, Info, X } from "lucide-react";
import type { Project } from "../data/projects";

type ProjectShowcaseProps = {
  projects: Project[];
};

export function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const selectedProject = selectedIndex === null ? null : projects[selectedIndex];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (selectedProject && dialog && !dialog.open) dialog.showModal();
  }, [selectedProject]);

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const direction = event.key === "ArrowLeft" ? -1 : 1;
      setSelectedIndex((current) => current === null ? 0 : (current + direction + projects.length) % projects.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, projects.length]);

  const closeProject = () => {
    dialogRef.current?.close();
    setSelectedIndex(null);
  };

  return (
    <section className="editorial-section page-shell" id="projects">
      <div className="section-heading" data-reveal="split">
        <div>
          <h2>Software built for<br />real use.</h2>
        </div>
        <p className="section-intro">
          Frontend-focused React and Next.js work, supported by full-stack
          systems and one native Android project.
        </p>
      </div>

      <dl className="portfolio-stats" data-reveal aria-label="Portfolio overview">
        <div><dt>{projects.length}</dt><dd>Featured products</dd></div>
        <div><dt>{projects.filter((project) => project.links.some((link) => link.kind === "demo")).length}</dt><dd>Live web applications</dd></div>
        <div><dt>{projects.filter((project) => project.visual === "shelflife").length}</dt><dd>Native Android application</dd></div>
      </dl>

      <div className="project-grid" role="region" aria-label="Featured projects">
        {projects.map((project, index) => {
          return (
            <article
              className="project-card"
              key={project.title}
              data-reveal="card"
            >
              <button
                className="project-card-trigger"
                type="button"
                onClick={() => setSelectedIndex(index)}
                aria-label={`View ${project.title} case study`}
                data-tilt
              >
                <ProjectImage project={project} />
              </button>
              <div className="project-body">
                <div className="project-number">{String(index + 1).padStart(2, "0")}</div>
                <p className="project-type">{project.type}</p>
                <h3>{project.title}</h3>
                <p className="project-card-status">{project.status}</p>
              </div>
            </article>
          );
        })}
      </div>

      <dialog
        className="project-modal"
        ref={dialogRef}
        onCancel={(event) => {
          event.preventDefault();
          closeProject();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeProject();
        }}
        aria-labelledby="project-modal-title"
      >
        {selectedProject && (
          <div className="project-modal-panel" key={selectedProject.title}>
            <button className="project-modal-close" type="button" onClick={closeProject} aria-label="Close case study">
              <X size={20} />
            </button>
            <div className="project-modal-hero">
              <ProjectImage project={selectedProject} isModal />
              <div className="project-modal-hero-copy">
                <span className="project-modal-index">{String(selectedIndex! + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
                <p>{selectedProject.type}</p>
                <h3 id="project-modal-title">{selectedProject.title}</h3>
              </div>
              <span className="project-modal-scroll">Scroll to explore</span>
            </div>
            <div className="project-modal-content">
              <div className="project-modal-intro">
                <span>Project overview</span>
                <p>{selectedProject.description}</p>
                <dl className="project-meta">
                  <div><dt>Status</dt><dd>{selectedProject.status}</dd></div>
                  <div><dt>Context</dt><dd>{selectedProject.context}</dd></div>
                  <div><dt>Role</dt><dd>{selectedProject.role}</dd></div>
                </dl>
              </div>
              <div className="project-modal-evidence">
                <div className="project-modal-detail">
                  <span>01 — Challenge</span>
                  <p>{selectedProject.caseStudy.challenge}</p>
                </div>
                <div className="project-modal-detail">
                  <span>02 — Ownership</span>
                  <p>{selectedProject.caseStudy.ownership}</p>
                </div>
                <div className="project-modal-detail project-modal-engineering">
                  <span>03 — Engineering evidence</span>
                  <ul>{[...selectedProject.highlights, ...selectedProject.caseStudy.engineering].map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
                {selectedProject.caseStudy.limitation && (
                  <div className="project-modal-detail">
                    <span>04 — Current limitation</span>
                    <p>{selectedProject.caseStudy.limitation}</p>
                  </div>
                )}
              </div>
              <div className="project-modal-stack" aria-label={`${selectedProject.title} technologies`}>
                <span className="project-modal-label">Built with</span>
                <div>{selectedProject.tech.map((tech) => <span key={tech}>{tech}</span>)}</div>
              </div>
              <div className="project-modal-actions">
                {selectedProject.links.map((link) => (
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${selectedProject.title} ${link.label} (opens in a new tab)`}
                    key={link.url}
                  >
                    {link.kind === "repository" ? <Code2 size={16} /> : <ExternalLink size={16} />}
                    {link.label}<ArrowUpRight size={14} />
                  </a>
                ))}
                {selectedProject.unavailableDemo && (
                  <span className="project-unavailable" aria-label={selectedProject.unavailableDemo}>
                    <Info size={16} />{selectedProject.unavailableDemo}
                  </span>
                )}
              </div>
              <nav className="project-modal-nav" aria-label="Browse projects">
                <button type="button" onClick={() => setSelectedIndex((selectedIndex! - 1 + projects.length) % projects.length)}>
                  <ArrowLeft size={18} /><span>Previous project</span>
                </button>
                <button type="button" onClick={() => setSelectedIndex((selectedIndex! + 1) % projects.length)}>
                  <span>Next project</span><ArrowRight size={18} />
                </button>
              </nav>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}

function ProjectImage({ project, isModal = false }: { project: Project; isModal?: boolean }) {
  return (
    <figure
      className={`project-image${isModal ? " project-image-modal" : ""}`}
      {...(!isModal ? { "data-parallax": true, "data-parallax-speed": ".55" } : {})}
    >
      <img
        src={project.imageUrl}
        alt={`${project.title} screenshot`}
        width="1672"
        height="941"
        loading="lazy"
        decoding="async"
      />
    </figure>
  );
}
