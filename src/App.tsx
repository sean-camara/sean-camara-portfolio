import { ArrowUpRight, Code2, Mail, Menu, Network } from "lucide-react";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { ProjectShowcase } from "./components/ProjectShowcase";
import { SkillsMatrix } from "./components/SkillsMatrix";
import { projects, skillGroups } from "./data/projects";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const contactLinks = [
  {
    label: "Email",
    value: "camara.sean13@gmail.com",
    href: "mailto:camara.sean13@gmail.com",
    icon: Mail,
  },
  {
    label: "GitHub",
    value: "github.com/sean-camara",
    href: "https://github.com/sean-camara",
    icon: Code2,
  },
  {
    label: "LinkedIn",
    value: "Sean John Camara",
    href: "https://www.linkedin.com/in/sean-john-camara-ab78a3321/",
    icon: Network,
  },
];

export function App() {
  return (
    <>
      <header className="site-header">
        <nav className="nav-shell" aria-label="Primary navigation">
          <a className="logo" href="#home" aria-label="Sean.dev home">
            Sean.dev
          </a>
          <div className="nav-links" aria-label="Page sections">
            {navLinks.map((link) => (
              <a href={link.href} key={link.label}>
                {link.label}
              </a>
            ))}
          </div>
          <a className="nav-cta" href="#projects">
            View Projects
            <ArrowUpRight size={15} />
          </a>
          <a className="nav-menu" href="#contact" aria-label="Open contact section">
            <Menu size={20} />
          </a>
        </nav>
      </header>

      <main>
        <Hero />
        <ProjectShowcase projects={projects} />
        <SkillsMatrix groups={skillGroups} />
        <About />
        <Contact contactLinks={contactLinks} />
      </main>

      <Footer />
    </>
  );
}
