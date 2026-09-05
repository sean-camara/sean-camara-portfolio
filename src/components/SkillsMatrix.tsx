import type { SkillGroup } from "../data/projects";

const evidence: Record<
  string,
  { title: string; href: string; description: string }
> = {
  frontend: {
    title: "Aghimuan Creatives",
    href: "/work/aghimuan/",
    description:
      "Responsive websites and interfaces with clear structure, considered motion, and accessible interaction.",
  },
  backend: {
    title: "RMV Fabrication",
    href: "/work/rmv/",
    description:
      "REST APIs, authentication, data models, and role-based workflows that connect the interface to the system.",
  },
  android: {
    title: "ShelfLife",
    href: "/work/shelflife/",
    description:
      "Native Android interfaces, local storage, and scanning tools for useful everyday applications.",
  },
  tools: {
    title: "ApplyPH",
    href: "/work/applyph/",
    description:
      "Automated checks, browser testing, version control, and deployment workflows built into the process.",
  },
};
export function SkillsMatrix({ groups }: { groups: SkillGroup[] }) {
  const order = ["frontend", "backend", "android", "tools"];
  const learning = groups.find((group) => group.icon === "engineering");
  return (
    <section
      className="editorial-section page-shell skills-section"
      id="skills"
    >
      <div className="section-heading">
        <div>
          <p className="section-kicker">02 / Capabilities</p>
          <h2>
            From the surface
            <br />
            to the system.
          </h2>
        </div>
        <p className="section-intro">
          The tools change with the problem. The aim stays the same: software
          that is clear to use and carefully put together.
        </p>
      </div>
      <div className="skills-list">
        {order.map((key, index) => {
          const group = groups.find((entry) => entry.icon === key);
          if (!group) return null;
          const item = evidence[key];
          return (
            <article className="skill-row" key={key}>
              <span className="skill-index">0{index + 1}</span>
              <div className="skill-title">
                <h3>
                  {key === "android"
                    ? "Android development"
                    : key === "frontend"
                      ? "Interface development"
                      : group.label}
                </h3>
                <p>{item.description}</p>
                <a className="text-link" href={item.href}>
                  See {item.title} <span aria-hidden="true">↗</span>
                </a>
              </div>
              <ul className="skill-tags">
                {group.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
      {learning && (
        <details className="learning-disclosure">
          <summary>
            Currently developing <span aria-hidden="true">+</span>
          </summary>
          <p>{learning.skills.join(" · ")}</p>
        </details>
      )}
    </section>
  );
}
