import { GraduationCap, Layers3, MapPin } from "lucide-react";

export function About() {
  return (
    <section className="section-shell about-section" id="about">
      <div className="about-grid">
        <div className="profile-card glass-card" aria-label="Sean John Camara profile photo">
          <div className="profile-screen">
            <img
              src="/assets/sean-profile.png"
              alt="Sean John Camara"
              loading="lazy"
              decoding="async"
            />
            <div className="profile-caption">
              <strong>Sean John Camara</strong>
              <span>Full-Stack Web Developer</span>
            </div>
          </div>
          <div className="location-card glass-card">
            <MapPin size={15} />
            <span>
              <small>Location</small>
              Philippines
            </span>
          </div>
        </div>

        <div className="about-copy">
          <h2>About Me</h2>
          <p>
            I am Sean John Camara, a 3rd year college student and developer focused
            on building practical web applications and full-stack systems.
          </p>
          <p>
            My work is centered on real-world projects, clean user interfaces,
            useful workflows, and deployed applications. I mainly focus on web
            development, while also building native Android apps as an additional skill.
          </p>

          <div className="about-points">
            <div>
              <GraduationCap size={22} />
              <span>
                <strong>3rd year college student</strong>
                <small>Focused on practical project work</small>
              </span>
            </div>
            <div>
              <Layers3 size={22} />
              <span>
                <strong>System builder</strong>
                <small>Web systems, dashboards, APIs, and Android apps</small>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
