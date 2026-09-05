import { Code2, Mail, Network } from "lucide-react";
import { About } from "./components/About";
import { Certifications } from "./components/Certifications";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { ExperienceEducation } from "./components/ExperienceEducation";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { MotionEffects } from "./components/MotionEffects";
import { ProjectShowcase } from "./components/ProjectShowcase";
import { ProjectCaseStudy } from "./components/ProjectCaseStudy";
import { ProfessionalExperience } from "./components/ProfessionalExperience";
import { SkillsMatrix } from "./components/SkillsMatrix";
import { projects, skillGroups } from "./data/projects";

const contactLinks = [
  {
    label: "Email",
    value: "camara.sean13@gmail.com",
    href: "mailto:camara.sean13@gmail.com",
    icon: Mail,
  },
  {
    label: "Main GitHub",
    value: "github.com/sean-camara",
    href: "https://github.com/sean-camara",
    icon: Code2,
  },
  {
    label: "ApplyPH GitHub",
    value: "github.com/potatsukki",
    href: "https://github.com/potatsukki",
    icon: Code2,
  },
  {
    label: "LinkedIn",
    value: "Sean John Camara",
    href: "https://www.linkedin.com/in/sean-john-camara-ab78a3321/",
    icon: Network,
  },
];

export function App({ path = "/" }: { path?: string }) {
  const project = projects.find(
    (entry) => `/work/${entry.visual}` === path.replace(/\/$/, ""),
  );
  const isHome = path === "/";
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header isHome={isHome} />
      <div id="page-content">
        <main id="main-content" tabIndex={-1}>
          {isHome ? (
            <>
              <Hero />
              <ProjectShowcase projects={projects} />
              <SkillsMatrix groups={skillGroups} />
              <About />
              <div className="background-chapter">
                <ProfessionalExperience />
                <ExperienceEducation />
                <Certifications />
              </div>
            </>
          ) : project ? (
            <ProjectCaseStudy project={project} projects={projects} />
          ) : (
            <section className="page-shell not-found">
              <p className="section-kicker">404 / Page not found</p>
              <h1>Back to the work.</h1>
              <p>This page isn’t in the portfolio.</p>
              <a className="button-primary" href="/#projects">
                View selected work ↗
              </a>
            </section>
          )}
          <Contact contactLinks={contactLinks} />
        </main>
        <Footer />
      </div>
      <MotionEffects />
    </>
  );
}
