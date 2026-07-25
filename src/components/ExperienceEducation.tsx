import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";

const educationMemories = [
  { title: "Student Council", image: "/assets/student-council.jpg", alt: "STI College Fairview Student Council event", context: "Student leadership · STI College Fairview", description: "A glimpse of my time supporting student-led activities and working with fellow student leaders during campus events." },
  { title: "PRIME representatives", image: "/assets/prime-organization.png", alt: "PRIME student representatives from STI College Fairview", context: "School representation · PRIME organization", description: "As part of PRIME, I represented STI College Fairview while visiting different schools and helping introduce prospective students to the institution." },
  { title: "XLNC · Entrepreneurship Week", image: "/assets/xlnc-entrepreneurship.jpg", alt: "XLNC shirt-selling website project during Entrepreneurship Week", context: "Student venture · Entrepreneurship Week", description: "Worked with teammates to create XLNC, an online shirt-selling website, and present the idea through a physical booth during Entrepreneurship Week." },
] as const;

export function ExperienceEducation() {
  const [selectedMemory, setSelectedMemory] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const scrollPositionRef = useRef(0);

  const restoreScrollPosition = () => {
    window.scrollTo(0, scrollPositionRef.current);
    window.requestAnimationFrame(() => window.scrollTo(0, scrollPositionRef.current));
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (selectedMemory === null || !dialog) return;
    if (!dialog.open) dialog.showModal();
    closeRef.current?.focus({ preventScroll: true });
    restoreScrollPosition();
  }, [selectedMemory]);

  const closeMemory = () => {
    dialogRef.current?.close();
    setSelectedMemory(null);
    window.requestAnimationFrame(() => {
      openerRef.current?.focus({ preventScroll: true });
      restoreScrollPosition();
    });
  };

  return (
    <section className="editorial-section page-shell experience-section" id="experience">
      <div className="section-heading" data-reveal="split">
        <div>
          <p className="section-kicker">[ Experience &amp; Education ]</p>
          <h2>Building while<br />learning.</h2>
        </div>
        <p className="section-intro">
          Hands-on product development through an active computer science education and a real-business capstone collaboration.
        </p>
      </div>

      <div className="experience-list">
        <article className="experience-entry" data-reveal="row">
          <div className="experience-entry-side">
            <span>01 / Capstone collaboration</span>
            <time dateTime="2025">2025 — Present</time>
          </div>
          <div className="experience-entry-main">
            <p className="experience-context">Real-business academic capstone · Four-person team</p>
            <h3>Primary Full-Stack Developer</h3>
            <h4>RMV Stainless Steel Fabrication &amp; Construction Services</h4>
            <ul className="experience-notes">
              <li>Personally built most of the application: role-based interfaces, REST API, MongoDB data model, authentication, dashboards, and deployment.</li>
              <li>Worked with three teammates who focused primarily on thesis documentation and system testing.</li>
              <li>RMV reviewed, tested, and approved the current build. The capstone remains under development and is not yet in daily use.</li>
            </ul>
            <a href="https://www.rmvfabrication.app" target="_blank" rel="noopener noreferrer">
              View live capstone <ArrowUpRight size={15} />
            </a>
          </div>
        </article>

        <article className="experience-entry experience-entry-education" data-reveal="row">
          <div className="experience-entry-side">
            <span>02 / Education</span>
            <time dateTime="2023">2023 — 2027</time>
          </div>
          <div className="experience-entry-main">
            <p className="experience-context">Currently enrolled · Expected graduation 2027</p>
            <h3>Bachelor of Science in Computer Science</h3>
            <h4>STI College Fairview</h4>
            <div className="education-gallery" aria-label="School experiences">
              {educationMemories.map((memory, index) => (
                <button
                  className="education-card"
                  type="button"
                  key={memory.title}
                  onClick={(event) => { scrollPositionRef.current = window.scrollY; openerRef.current = event.currentTarget; setSelectedMemory(index); }}
                  aria-label={`View ${memory.title} school experience`}
                >
                  <img src={memory.image} alt={memory.alt} />
                  <span>{memory.title}</span>
                  <ArrowUpRight size={15} aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
        </article>

        <div className="experience-availability" data-reveal="row">
          <span>Available now</span>
          <p>Open to internships and junior frontend or full-stack developer opportunities.</p>
        </div>
      </div>

      <dialog
        className="education-modal"
        ref={dialogRef}
        onCancel={(event) => { event.preventDefault(); closeMemory(); }}
        onKeyDown={(event) => { if (event.key === "Escape") { event.preventDefault(); closeMemory(); } }}
        onClick={(event) => { if (event.target === event.currentTarget) closeMemory(); }}
        aria-labelledby="education-modal-title"
      >
        {selectedMemory !== null && (
          <div className="education-modal-panel">
            <button ref={closeRef} className="project-modal-close" type="button" onClick={closeMemory} aria-label="Close school experience"><X size={20} /></button>
            <div className="education-modal-image"><img src={educationMemories[selectedMemory].image} alt={educationMemories[selectedMemory].alt} /></div>
            <div className="education-modal-content">
              <span className="project-modal-index">{String(selectedMemory + 1).padStart(2, "0")} / {String(educationMemories.length).padStart(2, "0")}</span>
              <p className="education-modal-kicker">School experience</p>
              <h3 id="education-modal-title">{educationMemories[selectedMemory].title}</h3>
              <div className="education-modal-detail"><span>Context</span><p>{educationMemories[selectedMemory].context}</p></div>
              <div className="education-modal-detail"><span>What I did</span><p>{educationMemories[selectedMemory].description}</p></div>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
