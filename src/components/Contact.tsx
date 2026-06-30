import { Code2, Mail, Network, Phone, type LucideIcon } from "lucide-react";

type ContactLink = {
  label: string;
  value: string;
  href: string;
  icon: LucideIcon;
};

type ContactProps = {
  contactLinks: ContactLink[];
};

export function Contact({ contactLinks }: ContactProps) {
  return (
    <section className="section-shell contact-section" id="contact">
      <div className="contact-card glass-card">
        <h2>
          Let&apos;s build something <span>useful.</span>
        </h2>
        <p>
          I&apos;m open to opportunities, collaborations, and projects where I can build
          clean, practical, and reliable web systems.
        </p>

        <div className="contact-methods">
          <a href="mailto:camara.sean13@gmail.com">
            <Mail size={19} />
            <span>
              <small>Email</small>
              camara.sean13@gmail.com
            </span>
          </a>
          <a href="tel:09910248649">
            <Phone size={19} />
            <span>
              <small>Phone</small>
              09910248649
            </span>
          </a>
        </div>

        <div className="contact-actions">
          <a className="button button-primary" href="mailto:camara.sean13@gmail.com">
            Send Email
          </a>
          <div className="social-links" aria-label="Social links">
            {contactLinks
              .filter((link) => link.label === "GitHub" || link.label === "LinkedIn")
              .map((link) => {
                const Icon = link.label === "GitHub" ? Code2 : Network;
                return (
                  <a href={link.href} target="_blank" rel="noreferrer" key={link.label} aria-label={link.label}>
                    <Icon size={21} />
                  </a>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}
