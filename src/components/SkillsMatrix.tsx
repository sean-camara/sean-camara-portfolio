import { Code2, Database, PenTool, Smartphone, Wrench } from "lucide-react";
import type { SkillGroup } from "../data/projects";

const icons = {
  frontend: PenTool,
  backend: Database,
  android: Smartphone,
  tools: Wrench,
};

type SkillsMatrixProps = {
  groups: SkillGroup[];
};

export function SkillsMatrix({ groups }: SkillsMatrixProps) {
  return (
    <section className="section-shell skills-section" id="skills">
      <div className="center-heading">
        <h2>Skills &amp; Tools</h2>
        <span />
      </div>

      <div className="skills-bento">
        {groups.map((group) => {
          const Icon = icons[group.icon];
          return (
            <article className="skill-card glass-card" key={group.label}>
              <div className="skill-icon">
                <Icon size={22} />
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

        <article className="capability-card glass-card">
          <div>
            <h3>Full-Stack Capability</h3>
            <p>
              I specialize in bridging clean frontend interfaces with reliable backend
              workflows, useful database design, authentication, and practical deployment.
            </p>
            <div className="capability-points">
              <span>Fast Deployment</span>
              <span>Secure Systems</span>
            </div>
          </div>
          <Code2 className="capability-icon" size={96} strokeWidth={1.4} />
        </article>
      </div>
    </section>
  );
}
