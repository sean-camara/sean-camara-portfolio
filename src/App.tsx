import { useState } from "react";
import { ArrowUpRight, Code2, Mail, Menu, Network, X } from "lucide-react";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className="site-header">
        <nav className="nav-shell" aria-label="Primary navigation">
          <a className="logo" href="#home" aria-label="Sean.dev home" onClick={closeMenu}>
            <span className="logo-mark" aria-hidden="true">SC</span>
            Sean.dev
          </a>
          <div
            className={`nav-links${isMenuOpen ? " is-open" : ""}`}
            id="mobile-navigation"
            aria-label="Page sections"
          >
            {navLinks.map((link) => (
              <a href={link.href} key={link.label} onClick={closeMenu}>
                {link.label}
              </a>
            ))}
          </div>
          <a className="nav-cta" href="#contact">
            Let's talk
            <ArrowUpRight size={15} />
          </a>
          <button
            className="nav-menu"
            type="button"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
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
