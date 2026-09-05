import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";

type ContactLink = {
  label: string;
  value: string;
  href: string;
  icon: LucideIcon;
};

export function Contact({ contactLinks }: { contactLinks: ContactLink[] }) {
  const [status, setStatus] = useState("");
  const [copying, setCopying] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const alive = useRef(false);
  useEffect(() => {
    alive.current = true;
    setInteractive(true);
    return () => {
      alive.current = false;
    };
  }, []);
  const copyEmail = async () => {
    setCopying(true);
    try {
      if (!navigator.clipboard?.writeText)
        throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText("camara.sean13@gmail.com");
      if (alive.current) setStatus("Email copied.");
    } catch {
      if (alive.current)
        setStatus(
          "Couldn’t copy. Select the email address, or use the email link.",
        );
    } finally {
      if (alive.current) setCopying(false);
    }
  };
  return (
    <section className="contact-section" id="contact">
      <div className="page-shell">
        <div className="contact-top">
          <p className="section-kicker">05 / A conversation starts here</p>
          <p>
            Have a website, web app, or Android project in mind?
            <br />
            Tell me what you’re working on.
          </p>
        </div>
        <a className="closing-signature" href="mailto:camara.sean13@gmail.com">
          <h2>
            Let’s make
            <br />
            <span>it work.</span>
          </h2>
          <span className="closing-arrow" aria-hidden="true">
            ↗
          </span>
        </a>
        <div className="contact-bottom">
          <div className="email-group">
            <a className="contact-email" href="mailto:camara.sean13@gmail.com">
              camara.sean13@gmail.com
            </a>
            <button
              className="copy-email"
              type="button"
              onClick={copyEmail}
              disabled={!interactive || copying}
            >
              {copying
                ? "Copying…"
                : status === "Email copied."
                  ? "Copied ✓"
                  : "Copy email"}
            </button>
            <p className="copy-status" role="status" aria-live="polite">
              {status}
            </p>
          </div>
          <div className="contact-links">
            {contactLinks
              .filter((link) => link.label !== "Email")
              .map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label} <span aria-hidden="true">↗</span>
                </a>
              ))}
            <a href="tel:+639910248649">
              +63 991 024 8649 <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
