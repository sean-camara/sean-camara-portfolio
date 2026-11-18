import { Menu, X } from "lucide-react";

const navigation = [
  { label: "Work", anchor: "projects" },
  { label: "Capabilities", anchor: "skills" },
  { label: "About", anchor: "about" },
  { label: "Contact", anchor: "contact" },
];

export function Header({ isHome }: { isHome: boolean }) {
  const href = (anchor: string) => `${isHome ? "" : "/"}#${anchor}`;
  const goToSection = (link: HTMLAnchorElement, anchor: string) => {
    const menu = link.closest("details");
    if (menu) menu.open = false;
    if (!isHome) return;
    const section = document.getElementById(anchor);
    if (section) {
      section.tabIndex = -1;
      section.focus({ preventScroll: true });
    }
  };
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
          className="mobile-menu"
          onBlur={(event) => {
            if (
              event.relatedTarget &&
              !event.currentTarget.contains(event.relatedTarget)
            )
              event.currentTarget.open = false;
          }}
          onKeyDown={(event) => {
            if (event.key !== "Escape" || !event.currentTarget.open) return;
            event.preventDefault();
            event.currentTarget.open = false;
            event.currentTarget.querySelector("summary")?.focus();
          }}
        >
          <summary aria-label="Navigation menu">
            <Menu className="menu-open-icon" size={22} aria-hidden="true" />
            <X className="menu-close-icon" size={22} aria-hidden="true" />
          </summary>
          <nav className="mobile-panel" aria-label="Mobile navigation">
            {navigation.map((item) => (
              <a
                key={item.anchor}
                href={href(item.anchor)}
                onClick={(event) => goToSection(event.currentTarget, item.anchor)}
              >
                {item.label}
              </a>
            ))}
            <a
              className="mobile-resume"
              href="/Sean_John_Camara_Resume.pdf"
              download
              onClick={(event) => {
                const menu = event.currentTarget.closest("details");
                if (!menu) return;
                menu.open = false;
                menu.querySelector("summary")?.focus();
              }}
            >
              Download résumé <span aria-hidden="true">↓</span>
            </a>
          </nav>
        </details>
      </div>
    </header>
  );
}
