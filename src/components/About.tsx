export function About() {
  return (
    <section className="editorial-section page-shell about-section" id="about">
      <div className="about-grid">
        <div className="about-heading" data-reveal="left">
          <p className="section-kicker">03 / The person behind the build</p>
          <h2>
            Curious by nature.
            <br />
            Hands-on by choice.
          </h2>
          <p className="about-signature">
            From idea <span>→</span> interface <span>→</span> deployment.
          </p>
        </div>

        <figure
          className="about-workspace"
          data-parallax
          data-parallax-speed="1.1"
          data-tilt
        >
          <img
            src="/assets/sean-beach-portrait.webp"
            alt="Sean John Camara on a beach at sunset"
            width="1122"
            height="1402"
            loading="lazy"
            decoding="async"
          />
        </figure>

        <div className="about-copy" data-reveal="right">
          <span className="about-index">Sean John Camara / Philippines</span>
          <p className="about-lead">I like understanding the whole product.</p>
          <p>
            I’m a Computer Science student building for the web and Android. My
            projects take me from interface design to REST APIs, authentication,
            local storage, testing, and deployment.
          </p>

          <blockquote>
            A clear interface matters. So do the permissions, data, and error
            states behind it.
          </blockquote>

          <dl className="profile-facts">
            <div>
              <dt>Education</dt>
              <dd>
                STI College Fairview · BS Computer Science · Expected
                Graduation: 2027
              </dd>
            </div>
            <div>
              <dt>Focus</dt>
              <dd>Full-stack web applications and native Android tools</dd>
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
