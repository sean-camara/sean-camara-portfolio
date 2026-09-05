import { useEffect, useRef, useState } from "react";

const navigation = [
  { label: "Work", anchor: "projects" },
  { label: "About", anchor: "about" },
  { label: "Capabilities", anchor: "skills" },
  { label: "Contact", anchor: "contact" },
];

export function Header({ isHome }: { isHome: boolean }) {
  const menu = useRef<HTMLDetailsElement>(null);
  const [open, setOpen] = useState(false);
  const href = (anchor: string) => `${isHome ? "" : "/"}#${anchor}`;
  const close = (restore = false) => {
    if (menu.current) menu.current.open = false;
    setOpen(false);
    if (restore) menu.current?.querySelector("summary")?.focus();
  };
  const goToSection = (anchor: string) => {
    close();
    if (!isHome) return;
    const content = document.getElementById("page-content");
    if (content) content.inert = false;
    const section = document.getElementById(anchor);
    if (section) {
      section.tabIndex = -1;
      section.focus({ preventScroll: true });
    }
  };
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    const content = document.getElementById("page-content");
    const wasInert = content?.inert ?? false;
    document.body.style.overflow = "hidden";
    if (content) content.inert = true;
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close(true);
      }
      if (event.key !== "Tab") return;
      const controls =
        menu.current?.querySelectorAll<HTMLElement>("summary, a");
      if (!controls?.length) return;
      const first = controls[0],
        last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 900px)");
    const resize = () => {
      if (desktop.matches) close();
    };
    window.addEventListener("keydown", keydown);
    desktop.addEventListener("change", resize);
    resize();
    return () => {
      document.body.style.overflow = previous;
      if (content) content.inert = wasInert;
      window.removeEventListener("keydown", keydown);
      desktop.removeEventListener("change", resize);
    };
  }, [open]);
  return (
    <header className="site-header">
      <div className="site-nav page-shell">
        <a
          className="brand-mark"
          href={href("home")}
          aria-label="Sean John Camara home"
        >
          <img
            className="brand-emblem"
            src="/assets/optimized/sean-monogram.png"
            alt=""
            width="40"
            height="40"
          />
          <span className="brand-name">
            Sean John Camara<span>.</span>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <a key={item.anchor} href={href(item.anchor)}>
              {item.label}
            </a>
          ))}
        </nav>
        <a
          className="header-github"
          href="https://github.com/sean-camara"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub <span aria-hidden="true">↗</span>
        </a>
        <details
          ref={menu}
          className="mobile-menu"
          onToggle={(event) => setOpen(event.currentTarget.open)}
        >
          <summary
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          >
            <span>{open ? "Close" : "Menu"}</span>
            <span className="menu-symbol" aria-hidden="true">
              {open ? "−" : "+"}
            </span>
          </summary>
          <nav className="mobile-panel" aria-label="Mobile navigation">
            <p className="section-kicker">Explore the portfolio</p>
            {navigation.map((item, index) => (
              <a
                key={item.anchor}
                href={href(item.anchor)}
                onClick={() => goToSection(item.anchor)}
              >
                <span className="menu-index">0{index + 1}</span>
                {item.label}
                <span aria-hidden="true">↗</span>
              </a>
            ))}
            <a
              className="mobile-resume"
              href="/Sean_John_Camara_Resume.pdf"
              download
              onClick={() => close()}
            >
              Download résumé <span aria-hidden="true">↓</span>
            </a>
            <p className="menu-note">
              Sean John Camara
              <br />
              Full-Stack Web & Android Developer
            </p>
          </nav>
        </details>
      </div>
    </header>
  );
}
