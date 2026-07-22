import { ArrowUpRight } from "lucide-react";

export function ExperienceEducation() {
  return (
    <section className="editorial-section page-shell experience-section" id="experience">
      <div className="section-heading" data-reveal="split">
        <div>
          <p className="section-kicker">[ Experience &amp; Education ]</p>
          <h2>Building while<br />learning.</h2>
        </div>
        <p className="section-intro">
          Client-validated product work backed by an active computer science education.
        </p>
      </div>

      <div className="experience-list">
        <article className="experience-entry" data-reveal="row">
          <div className="experience-entry-side">
            <span>01 / Client work</span>
            <time dateTime="2025">2025 — Present</time>
          </div>
          <div className="experience-entry-main">
            <p className="experience-context">Academic capstone · Four-person team</p>
            <h3>Lead Full-Stack Developer</h3>
            <h4>RMV Stainless Steel Fabrication &amp; Construction Services</h4>
            <ul className="experience-notes">
              <li>Built the application end to end: role-based interfaces, REST API, MongoDB data model, authentication, dashboards, and deployment.</li>
              <li>Worked with three teammates responsible for thesis documentation and system testing.</li>
              <li>RMV reviewed, tested, and approved the current build. The capstone remains under development and is not yet in daily use.</li>
            </ul>
            <a href="https://www.rmvfabrication.app" target="_blank" rel="noopener noreferrer">
              View client project <ArrowUpRight size={15} />
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
          </div>
        </article>

        <div className="experience-availability" data-reveal="row">
          <span>Available now</span>
          <p>Open to internships and junior frontend or full-stack developer opportunities.</p>
        </div>
      </div>
    </section>
  );
}
