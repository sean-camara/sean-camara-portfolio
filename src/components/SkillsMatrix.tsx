import {
  Bot,
  Braces,
  Code2,
  Database,
  Layers3,
  PenTool,
  Smartphone,
  Wrench,
} from "lucide-react";
import type { SkillGroup } from "../data/projects";

const icons = {
  frontend: PenTool,
  backend: Database,
  android: Smartphone,
  ai: Bot,
  engineering: Layers3,
  tools: Wrench,
};

type SkillsMatrixProps = {
  groups: SkillGroup[];
};

export function SkillsMatrix({ groups }: SkillsMatrixProps) {
  return (
    <section className="section-shell skills-section" id="skills">
      <div className="skills-heading">
        <div>
          <p className="section-kicker">Capabilities</p>
          <h2>Technology with purpose.</h2>
        </div>
        <p>
          A focused toolkit for designing, building, and shipping complete software products.
        </p>
      </div>

      <div className="skills-bento">
        {groups.map((group, index) => {
          const Icon = icons[group.icon];
          return (
            <article
              className={`skill-card${group.accent ? " skill-card-accent" : ""}`}
              key={group.label}
            >
              <div className="skill-card-head">
                <div className="skill-icon">
                  <Icon size={22} />
                </div>
                <span className="skill-number">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h3>{group.label}</h3>
              <div className="skill-tags">
                {group.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </article>
          );
        })}

        <article className="capability-card">
          <div>
            <p className="section-kicker">How I work</p>
            <h3>Full-Stack Software Engineer</h3>
            <p>
              I design and build complete software solutions, from responsive web applications
              and native Android apps to scalable backend services and AI-powered experiences.
              My focus is creating products that are fast, intuitive, maintainable, and
              production-ready.
            </p>
            <div className="capability-points">
              <span>Full-Stack Development</span>
              <span>Android Engineering</span>
              <span>AI Integration</span>
            </div>
          </div>
          <div className="capability-mark" aria-hidden="true">
            <Code2 size={38} strokeWidth={1.6} />
            <Braces size={72} strokeWidth={1.25} />
          </div>
        </article>
      </div>
    </section>
  );
}
