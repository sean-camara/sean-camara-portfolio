import { useState } from "react";
import { ArrowUpRight, Code2, Mail, Menu, Network, X } from "lucide-react";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
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
      <MotionEffects />
      <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-[#fbfaf7]/90 backdrop-blur-xl">
        <nav className="relative mx-auto flex h-18 w-[min(1180px,calc(100%-48px))] items-center justify-between gap-6 max-sm:w-[calc(100%-32px)]" aria-label="Primary navigation">
          <a className="flex items-center gap-2.5 font-bold text-[#172136]" href="#home" aria-label="Sean.dev home" onClick={closeMenu}>
            <span className="grid size-8 place-items-center rounded-md bg-[#172136] font-mono text-[10px] font-bold text-white" aria-hidden="true">SC</span>
            Sean.dev
          </a>
          <div
            className={`${isMenuOpen ? "max-lg:absolute max-lg:top-[calc(100%+10px)] max-lg:right-0 max-lg:left-0 max-lg:grid max-lg:gap-0.5 max-lg:rounded-xl max-lg:border max-lg:border-stone-200 max-lg:bg-white max-lg:p-2 max-lg:shadow-xl" : "max-lg:hidden"} flex items-center gap-8 text-sm text-stone-600`}
            id="mobile-navigation"
            aria-label="Page sections"
          >
            {navLinks.map((link) => (
              <a className="relative py-2 transition-colors hover:text-[#6977b8] max-lg:rounded-md max-lg:px-3 max-lg:py-3 max-lg:hover:bg-[#f0f1f6]" href={link.href} key={link.label} onClick={closeMenu}>
                {link.label}
              </a>
            ))}
          </div>
          <a className="ml-auto flex items-center gap-1.5 rounded-md bg-[#172136] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#29344c] max-lg:hidden" href="#contact">
            Let's talk
            <ArrowUpRight size={15} />
          </a>
          <button
            className="hidden size-10 place-items-center rounded-md border border-stone-200 bg-white text-[#172136] max-lg:grid"
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
