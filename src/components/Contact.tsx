import { ArrowUpRight, Code2, Mail, Network, Phone, type LucideIcon } from "lucide-react";

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
    <section className="contact-section page-shell" id="contact">
      <div className="contact-grid" data-reveal>
        <div>
          <p className="section-kicker">[ Get in touch ]</p>
          <h2>Let&apos;s build something<br /><em>useful.</em></h2>
          <p className="contact-copy">
            Open to opportunities, collaborations, and practical projects that need careful
            product thinking and reliable implementation.
          </p>
          <a className="contact-email" href="mailto:camara.sean13@gmail.com">
            <Mail size={18} />
            camara.sean13@gmail.com
            <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="contact-links">
          <a href="tel:09910248649">
            <Phone size={18} />
            <span>
              <small>Phone</small>
              09910248649
            </span>
          </a>
          {contactLinks
            .filter((link) => link.label === "GitHub" || link.label === "LinkedIn")
            .map((link) => {
              const Icon = link.label === "GitHub" ? Code2 : Network;
              return (
                <a href={link.href} target="_blank" rel="noreferrer" key={link.label}>
                  <Icon size={18} />
                  <span>
                    <small>{link.label}</small>
                    {link.value}
                  </span>
                </a>
              );
            })}
        </div>
      </div>
    </section>
  );
}
