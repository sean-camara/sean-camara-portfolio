import {
  ArrowUpRight,
  CheckCircle2,
  Code2,
  ExternalLink,
  Globe2,
  GraduationCap,
  Play,
  Smartphone,
  Sparkles,
  Star,
  Wallet,
} from "lucide-react";
import type { Project, ProjectKind } from "../data/projects";

type ProjectShowcaseProps = {
  projects: Project[];
};

const categoryIcons: Record<ProjectKind, typeof Globe2> = {
  rmv: Globe2,
  academia: GraduationCap,
  flowmoney: Wallet,
  shelflife: Smartphone,
};

export function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  return (
    <section className="section-shell projects-section" id="projects">
      <div className="projects-heading">
        <span className="projects-eyebrow">
          <span />
          MY WORK
        </span>
        <h2>
          Featured <span>Projects</span>
        </h2>
        <p>
          A focused collection of practical systems built across full-stack web,
          productivity tools, finance workflows, and native Android.
        </p>
      </div>

      <div className="project-grid">
        {projects.map((project) => {
          const CategoryIcon = categoryIcons[project.visual];
          return (
            <article className={`project-card project-card-${project.visual}`} key={project.title}>
              <ProjectImage project={project} />
              <div className="project-body">
                <p className="project-type">
                  <CategoryIcon size={20} strokeWidth={1.8} />
                  {project.type}
                </p>
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="tech-list" aria-label={`${project.title} technologies`}>
                  {project.tech.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
                <ul className="highlight-list">
                  {project.highlights.map((highlight) => (
                    <li key={highlight}>
                      <CheckCircle2 size={16} />
                      {highlight}
                    </li>
                  ))}
                </ul>
                <div className="project-actions">
                  <a href={project.repoUrl} target="_blank" rel="noreferrer">
                    <Code2 size={16} />
                    {project.actionLabel}
                    <ArrowUpRight size={14} />
                  </a>
                  {project.liveUrl ? (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer">
                      <ExternalLink size={16} />
                      {project.liveActionLabel ?? "Live Demo"}
                      <ArrowUpRight size={14} />
                    </a>
                  ) : (
                    project.liveActionLabel && (
                      <span className="project-action-disabled">
                        <Play size={16} />
                        {project.liveActionLabel}
                      </span>
                    )
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="projects-more">
        <div className="projects-more-copy">
          <div className="projects-more-icon">
            <Star size={24} fill="currentColor" />
          </div>
          <div>
            <h3>More projects coming soon.</h3>
            <p>I'm constantly building and improving. Stay tuned for more exciting things!</p>
          </div>
        </div>
        <div className="projects-more-stats">
          <span>
            <strong>4+</strong>
            Projects
          </span>
          <span>
            <strong>Full-Stack</strong>
            Development
          </span>
          <span>
            <strong>Always</strong>
            Building
          </span>
        </div>
      </div>
    </section>
  );
}

function ProjectImage({ project }: { project: Project }) {
  return (
    <div className={`project-visual ${project.visual}`}>
      <div className="visual-badge">{project.type}</div>
      <Sparkles className="project-visual-spark" size={18} />
      <div className="project-screenshot-frame">
        <img
          src={project.imageUrl}
          alt={`${project.title} screenshot`}
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}
