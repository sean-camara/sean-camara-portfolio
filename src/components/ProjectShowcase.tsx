import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Code2, ExternalLink, Info, X } from "lucide-react";
import type { Project } from "../data/projects";

type ProjectShowcaseProps = { projects: Project[] };

export function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const openerIndexRef = useRef<number | null>(null);
  const selectedProject = selectedIndex === null ? null : projects[selectedIndex];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!selectedProject || !dialog) return;
    setGalleryIndex(0);
    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => { document.body.style.overflow = ""; };
  }, [selectedProject]);

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      if ((event.target as Element | null)?.closest("a, button, input, textarea, select, [data-gallery]")) return;
      event.preventDefault();
      const direction = event.key === "ArrowLeft" ? -1 : 1;
      setSelectedIndex((current) => current === null ? 0 : (current + direction + projects.length) % projects.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, projects.length]);

  const openProject = (index: number) => {
    openerIndexRef.current = index;
    setSelectedIndex(index);
  };
  const closeProject = () => {
    const openerIndex = openerIndexRef.current;
    dialogRef.current?.close();
    setSelectedIndex(null);
    document.body.style.overflow = "";
    window.requestAnimationFrame(() => {
      if (openerIndex !== null) triggerRefs.current[openerIndex]?.focus();
      openerIndexRef.current = null;
    });
  };

  return (
    <section className="editorial-section page-shell" id="projects">
      <div className="section-heading" data-reveal="split">
        <div><h2>Software built for<br />real use.</h2></div>
        <p className="section-intro">Frontend-focused React and Next.js work, supported by full-stack systems and one native Android project.</p>
      </div>

      <dl className="portfolio-stats" data-reveal aria-label="Portfolio overview">
        <div><dt>{projects.length}</dt><dd>Featured products</dd></div>
        <div><dt>{projects.filter((project) => project.links.some((link) => link.kind === "demo")).length}</dt><dd>Live web applications</dd></div>
        <div><dt>{projects.filter((project) => project.visual === "shelflife").length}</dt><dd>Native Android application</dd></div>
      </dl>

      <div className="project-grid" role="region" aria-label="Featured projects">
        {projects.map((project, index) => (
          <article className="project-card" key={project.title} data-reveal="card">
            <button
              className="project-card-trigger"
              ref={(node) => { triggerRefs.current[index] = node; }}
              type="button"
              onClick={() => openProject(index)}
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
              <p className="project-summary">{project.summary}</p>
              <ul className="project-tech-preview" aria-label={`${project.title} key technologies`}>
                {project.tech.slice(0, 4).map((tech) => <li key={tech}>{tech}</li>)}
              </ul>
              <button className="project-case-study-link" type="button" onClick={() => openProject(index)}>
                View case study <ArrowUpRight size={14} />
              </button>
            </div>
          </article>
        ))}
      </div>

      <dialog
        className="project-modal"
        ref={dialogRef}
        onCancel={(event) => { event.preventDefault(); closeProject(); }}
        onKeyDown={(event) => { if (event.key === "Escape") { event.preventDefault(); closeProject(); } }}
        onClick={(event) => { if (event.target === event.currentTarget) closeProject(); }}
        aria-labelledby="project-modal-title"
      >
        {selectedProject && (
          <div className="project-modal-panel" key={selectedProject.title}>
            <button ref={closeRef} className="project-modal-close" type="button" onClick={closeProject} aria-label="Close case study"><X size={20} /></button>
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

              {selectedProject.gallery && (
                <figure className="project-gallery" tabIndex={0} data-gallery onKeyDown={(event) => {
                  if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
                  event.preventDefault();
                  setGalleryIndex((current) => (current + (event.key === "ArrowLeft" ? -1 : 1) + selectedProject.gallery!.length) % selectedProject.gallery!.length);
                }}>
                  <div className="project-gallery-stage">
                    <img src={selectedProject.gallery[galleryIndex].src} alt={selectedProject.gallery[galleryIndex].alt} loading="lazy" decoding="async" />
                    <span className="project-gallery-stage-label">{selectedProject.gallery[galleryIndex].caption}</span>
                  </div>
                  <div className="project-gallery-thumbnails" aria-label="ApplyPH product screenshots">
                    {selectedProject.gallery.map((shot, index) => (
                      <button
                        className={index === galleryIndex ? "is-active" : ""}
                        type="button"
                        onClick={() => setGalleryIndex(index)}
                        aria-label={`Show ${shot.caption}`}
                        aria-pressed={index === galleryIndex}
                        key={shot.src}
                      >
                        <img src={shot.src} alt="" loading="lazy" decoding="async" />
                        <span>{String(index + 1).padStart(2, "0")}</span>
                      </button>
                    ))}
                  </div>
                  <figcaption><span>Product screens</span><span>{galleryIndex + 1} / {selectedProject.gallery.length}</span></figcaption>
                </figure>
              )}

              <div className="project-modal-evidence">
                <Detail label="01 — Problem" text={selectedProject.caseStudy.challenge} />
                <Detail label="02 — Target users" text={selectedProject.caseStudy.targetUsers} />
                <Detail label="03 — Ownership" text={selectedProject.caseStudy.ownership} />
                <Detail label="04 — Frontend" text={selectedProject.caseStudy.frontend} />
                {selectedProject.caseStudy.backend && <Detail label="05 — Backend" text={selectedProject.caseStudy.backend} />}
                <Detail label="06 — Key decision" text={selectedProject.caseStudy.decision} />
                <Detail label="07 — Testing" text={selectedProject.caseStudy.testing} />
                <Detail label="08 — Deployment" text={selectedProject.caseStudy.deployment} />
                <div className="project-modal-detail project-modal-engineering">
                  <span>Engineering evidence</span>
                  <ul>{[...selectedProject.highlights, ...selectedProject.caseStudy.engineering].map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
                {selectedProject.caseStudy.limitation && <Detail label="Current limitation" text={selectedProject.caseStudy.limitation} />}
              </div>
              <div className="project-modal-stack" aria-label={`${selectedProject.title} technologies`}>
                <span className="project-modal-label">Built with</span>
                <div>{selectedProject.tech.map((tech) => <span key={tech}>{tech}</span>)}</div>
              </div>
              <div className="project-modal-actions">
                {selectedProject.links.map((link) => (
                  <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={`${selectedProject.title} ${link.label} (opens in a new tab)`} key={link.url}>
                    {link.kind === "repository" ? <Code2 size={16} /> : <ExternalLink size={16} />}{link.label}<ArrowUpRight size={14} />
                  </a>
                ))}
                {selectedProject.unavailableDemo && <span className="project-unavailable"><Info size={16} />{selectedProject.unavailableDemo}</span>}
              </div>
              <nav className="project-modal-nav" aria-label="Browse projects">
                <button type="button" onClick={() => setSelectedIndex((selectedIndex! - 1 + projects.length) % projects.length)}><ArrowLeft size={18} /><span>Previous project</span></button>
                <button type="button" onClick={() => setSelectedIndex((selectedIndex! + 1) % projects.length)}><span>Next project</span><ArrowRight size={18} /></button>
              </nav>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}

function Detail({ label, text }: { label: string; text: string }) {
  return <div className="project-modal-detail"><span>{label}</span><p>{text}</p></div>;
}

function ProjectImage({ project, isModal = false }: { project: Project; isModal?: boolean }) {
  return (
    <figure className={`project-image${isModal ? " project-image-modal" : ""}`} {...(!isModal ? { "data-parallax": true, "data-parallax-speed": ".55" } : {})}>
      <img
        src={project.imageUrl}
        alt={`${project.title} screenshot`}
        width={project.visual === "applyph" ? 1448 : 1672}
        height={project.visual === "applyph" ? 1086 : 941}
        loading="lazy"
        decoding="async"
      />
    </figure>
  );
}
