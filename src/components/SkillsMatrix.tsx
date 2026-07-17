import { Bot, Database, Layers3, PenTool, Smartphone, Wrench } from "lucide-react";
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
    <section className="editorial-section page-shell skills-section" id="skills">
      <div className="section-heading" data-reveal="split">
        <div>
          <p className="section-kicker">[ Capabilities ]</p>
          <h2>Technology<br />with purpose.</h2>
        </div>
        <p className="section-intro">
          Technologies used across the products above—not a keyword inventory, but a working toolkit for shipping complete software.
        </p>
      </div>

      <div className="skills-list">
        {groups.map((group, index) => {
          const Icon = icons[group.icon];
          return (
            <article
              className="skill-row"
              key={group.label}
              data-reveal="row"
            >
              <div className="skill-index">{String(index + 1).padStart(2, "0")}</div>
              <div className="skill-title">
                <Icon size={20} strokeWidth={1.5} />
                <h3>{group.label}</h3>
              </div>
              <div className="skill-tags">
                {group.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
