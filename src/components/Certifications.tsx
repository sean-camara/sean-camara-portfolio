import { ArrowUpRight, Award, BadgeCheck, FileText } from "lucide-react";

const certifications = [
  {
    title: "MongoDB Node.js Developer Path",
    type: "Certificate of completion",
    date: "July 22, 2026",
    image: "/certificates/mongodb-nodejs-developer-path.png",
    href: "/certificates/mongodb-nodejs-developer-path.pdf",
    action: "View certificate",
    icon: FileText,
  },
  {
    title: "Getting Started with MongoDB Atlas",
    type: "Certificate of completion",
    date: "July 22, 2026",
    image: "/certificates/getting-started-mongodb-atlas.png",
    href: "/certificates/getting-started-mongodb-atlas.pdf",
    action: "View certificate",
    icon: FileText,
  },
  {
    title: "From Relational Model (SQL) to MongoDB's Document Model",
    type: "Verified digital credential",
    date: "July 22, 2026",
    image: "/certificates/mongodb-relational-document-model-showcase.png",
    href: "https://www.credly.com/badges/8a547771-887a-448e-b7cc-dfc510898241/linked_in_profile",
    action: "Verify on Credly",
    icon: BadgeCheck,
  },
];

export function Certifications() {
  return (
    <section className="editorial-section page-shell certifications-section" id="certifications">
      <div className="section-heading" data-reveal="split">
        <div>
          <p className="section-kicker">[ Certifications ]</p>
          <h2>Learning,<br />verified.</h2>
        </div>
        <p className="section-intro">
          MongoDB credentials covering Atlas, Node.js development, and document data modeling.
        </p>
      </div>

      <div className="certification-grid">
        {certifications.map((certification, index) => {
          const Icon = certification.icon;
          return (
            <article className="certification-card" data-reveal="card" key={certification.title}>
              <a
                className="certification-preview"
                href={certification.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${certification.action}: ${certification.title} (opens in a new tab)`}
              >
                <img src={certification.image} alt={`${certification.title} credential`} loading="lazy" decoding="async" />
                <span><Icon size={15} />{certification.type}</span>
              </a>
              <div className="certification-body">
                <div className="certification-meta">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>{certification.date}</span>
                </div>
                <Award size={22} strokeWidth={1.35} aria-hidden="true" />
                <p>Issued by MongoDB</p>
                <h3>{certification.title}</h3>
                <a href={certification.href} target="_blank" rel="noopener noreferrer">
                  {certification.action}<ArrowUpRight size={15} />
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
