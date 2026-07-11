import {
  ArrowUpRight,
  CheckCircle2,
  Code2,
  ExternalLink,
  Play,
} from "lucide-react";
import type { Project } from "../data/projects";

type ProjectShowcaseProps = {
  projects: Project[];
};

export function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  return (
    <section className="mx-auto w-[min(1180px,calc(100%-48px))] py-28 max-sm:w-[calc(100%-32px)] max-sm:py-20" id="projects">
      <div className="mb-12 grid grid-cols-[1fr_minmax(280px,0.55fr)] items-end gap-10 max-md:grid-cols-1 max-md:gap-4" data-reveal>
        <div>
          <p className="section-kicker">Selected work</p>
          <h2 className="mt-4 text-[clamp(2.2rem,4vw,4rem)] leading-none font-bold tracking-[-0.035em] text-[#172136]">Products built for real use.</h2>
        </div>
        <p className="leading-7 text-stone-600">
          A focused collection of deployed web systems, productivity tools, finance
          workflows, and native Android applications.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-5 max-md:flex max-md:snap-x max-md:snap-mandatory max-md:overflow-x-auto max-md:pb-3 max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden" role="region" aria-label="Featured projects" tabIndex={0}>
        {projects.map((project, index) => {
          return (
            <article
              className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-stone-200 bg-white p-2.5 shadow-sm transition-[border-color,box-shadow] hover:border-stone-300 hover:shadow-[0_20px_45px_rgba(23,33,54,0.09)] max-md:flex-[0_0_min(84vw,350px)] max-md:snap-start"
              key={project.title}
              data-reveal
              data-tilt
            >
              <ProjectImage project={project} />
              <div className="flex flex-1 translate-z-2 flex-col items-start px-2 pt-5 pb-2">
                <p className="mb-5 font-mono text-[0.67rem] font-bold tracking-[0.12em] text-stone-400 uppercase">{String(index + 1).padStart(2, "0")} / Project</p>
                <p className="mb-2 font-mono text-[0.7rem] font-semibold text-[#6977b8]">{project.type}</p>
                <h3 className="text-[1.45rem] leading-tight font-bold tracking-[-0.02em] text-[#172136]">{project.title}</h3>
                <p className="mt-3 leading-6 text-stone-600">{project.description}</p>
                <div className="mt-5 flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
                  {project.tech.map((tech) => (
                    <span className="rounded-md border border-stone-200 bg-stone-50 px-2.5 py-1 font-mono text-[0.68rem] text-stone-600" key={tech}>{tech}</span>
                  ))}
                </div>
                <ul className="mt-5 grid gap-2 text-sm text-stone-600">
                  {project.highlights.map((highlight) => (
                    <li className="flex items-start gap-2" key={highlight}>
                      <CheckCircle2 className="mt-0.5 shrink-0 text-[#6977b8]" size={16} />
                      {highlight}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-6 text-sm font-semibold text-[#172136]">
                  <a className="flex items-center gap-1.5 transition-colors hover:text-[#6977b8]" href={project.repoUrl} target="_blank" rel="noreferrer">
                    <Code2 size={16} />
                    {project.actionLabel}
                    <ArrowUpRight size={14} />
                  </a>
                  {project.liveUrl ? (
                    <a className="flex items-center gap-1.5 transition-colors hover:text-[#6977b8]" href={project.liveUrl} target="_blank" rel="noreferrer">
                      <ExternalLink size={16} />
                      {project.liveActionLabel ?? "Live Demo"}
                      <ArrowUpRight size={14} />
                    </a>
                  ) : (
                    project.liveActionLabel && (
                      <span className="flex items-center gap-1.5 text-stone-400">
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
    </section>
  );
}

function ProjectImage({ project }: { project: Project }) {
  return (
    <figure className="aspect-video translate-z-4 overflow-hidden rounded-lg bg-stone-100">
      <img
        src={project.imageUrl}
        alt={`${project.title} screenshot`}
        loading="lazy"
        decoding="async" className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.025]"
      />
    </figure>
  );
}
