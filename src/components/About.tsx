export function About() {
  return (
    <section className="editorial-section page-shell about-section" id="about">
      <div className="about-grid">
        <figure className="about-portrait" data-reveal data-parallax>
          <img
            src="/assets/sean-profile.png"
            alt="Sean John Camara"
            loading="lazy"
            decoding="async"
          />
        </figure>

        <div data-reveal>
          <p className="section-kicker">[ About ]</p>
          <h2>Useful software,<br />built with care.</h2>
          <p className="about-lead">
            I am Sean John Camara, a Computer Science student and developer focused on
            practical web applications and full-stack systems.
          </p>
          <p>
            My work centers on real-world projects, clear interfaces, useful workflows,
            and deployed applications. I primarily build for the web, with native Android
            development as an additional specialization.
          </p>

          <dl className="profile-facts">
            <div>
              <dt>Education</dt>
              <dd>BS Computer Science, STI College Fairview — Expected 2027</dd>
            </div>
            <div>
              <dt>Focus</dt>
              <dd>Web systems, APIs, applied AI, and native Android apps</dd>
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
