export function About() {
  return (
    <section className="editorial-section page-shell about-section" id="about">
      <div className="about-grid">
        <div className="about-heading" data-reveal="left">
          <p className="section-kicker">[ About ]</p>
          <h2>Useful software,<br />built with care.</h2>
          <p className="about-signature">From idea <span>→</span> interface <span>→</span> deployment.</p>
        </div>

        <figure className="about-workspace" data-parallax data-parallax-speed="1.1" data-tilt>
          <img
            src="/assets/sean-workspace.webp"
            alt="Sean John Camara working at his laptop"
            width="1537"
            height="1023"
            loading="lazy"
            decoding="async"
          />
        </figure>

        <div className="about-copy" data-reveal="right">
          <span className="about-index">01 / 04</span>
          <p className="about-lead">
            I am Sean John Camara, a junior frontend developer focused on responsive,
            accessible React and Next.js interfaces.
          </p>
          <p>
            I connect interfaces to REST APIs, authentication, data services, tests, and
            deployment workflows. Full-stack and native Android work support my frontend focus.
          </p>

          <blockquote>
            I care about the complete product—not only how it looks, but how it works.
          </blockquote>

          <dl className="profile-facts">
            <div>
              <dt>Education</dt>
              <dd>STI College Fairview · BS Computer Science coursework · Completed through third-year standing</dd>
            </div>
            <div>
              <dt>Focus</dt>
              <dd>Frontend development with React, Next.js, and TypeScript</dd>
            </div>
            <div>
              <dt>Based in</dt>
              <dd>Philippines</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
