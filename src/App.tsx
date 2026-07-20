import { useState } from "react";
import { Code2, Mail, Menu, Network, X } from "lucide-react";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { IntroScreen } from "./components/IntroScreen";
import { MotionEffects } from "./components/MotionEffects";
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
    label: "Primary GitHub",
    value: "github.com/sean-camara",
    href: "https://github.com/sean-camara",
    icon: Code2,
  },
  {
    label: "Additional repositories",
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

export function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <MotionEffects />
      <IntroScreen />

      <header className="site-header">
        <nav className="site-nav" aria-label="Primary navigation">
          <a className="brand-mark" href="#home" aria-label="Sean John Camara home" onClick={closeMenu}>
            <img src="/favicon.png" alt="" width="34" height="34" />
            <span className="brand-name">Sean John Camara<span>.</span></span>
          </a>
          <div
            className={`main-nav ${isMenuOpen ? "is-open" : ""}`}
            id="mobile-navigation"
            aria-label="Page sections"
          >
            {navLinks.map((link) => (
              <a href={link.href} key={link.label} onClick={closeMenu}>
                {link.label}
              </a>
            ))}
            <a href="https://github.com/sean-camara" target="_blank" rel="noopener noreferrer" aria-label="Primary GitHub profile (opens in a new tab)">
              GitHub
            </a>
          </div>
          <button
            className="menu-toggle"
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

      <aside className="section-rail" aria-label="Jump to section">
        <a href="#projects">Work</a>
        <a href="#skills">Skills</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </aside>

      <main id="main-content">
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
