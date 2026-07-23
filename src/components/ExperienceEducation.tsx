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
