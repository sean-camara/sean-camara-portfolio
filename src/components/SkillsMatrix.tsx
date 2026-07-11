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
    <section className="mx-auto w-[min(1180px,calc(100%-48px))] border-t border-stone-200 py-28 max-sm:w-[calc(100%-32px)] max-sm:py-20" id="skills">
      <div className="mb-12 grid grid-cols-[1fr_minmax(280px,0.55fr)] items-end gap-10 max-md:grid-cols-1 max-md:gap-4" data-reveal>
        <div>
          <p className="section-kicker">Capabilities</p>
          <h2 className="mt-4 text-[clamp(2.2rem,4vw,4rem)] leading-none font-bold tracking-[-0.035em] text-[#172136]">Technology with purpose.</h2>
        </div>
        <p className="leading-7 text-stone-600">
          A focused toolkit for designing, building, and shipping complete software products.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3.5 max-lg:grid-cols-2 max-md:grid-cols-1">
        {groups.map((group, index) => {
          const Icon = icons[group.icon];
          return (
            <article
              className={`group flex min-h-65 flex-col rounded-xl border p-6 transition-[border-color,box-shadow] hover:border-stone-300 hover:shadow-[0_16px_36px_rgba(23,33,54,0.07)] max-md:min-h-0 ${group.accent ? "border-[#ddd4cb] bg-[#fdfaf7]" : "border-stone-200 bg-white"}`}
              key={group.label}
              data-reveal
            >
              <div className="mb-7 flex items-center justify-between">
                <div className="grid size-10 place-items-center rounded-lg border border-stone-200 bg-[#f0f1f6] text-[#6977b8] transition-transform group-hover:-translate-y-0.5 group-hover:-rotate-3">
                  <Icon size={22} />
                </div>
                <span className="font-mono text-[0.7rem] font-bold text-stone-400">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mb-5 text-lg font-bold text-[#172136]">{group.label}</h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span className="rounded-md border border-stone-200 bg-stone-50 px-2.5 py-1.5 text-xs text-stone-600" key={skill}>{skill}</span>
                ))}
              </div>
            </article>
          );
        })}

        <article className="col-span-full grid grid-cols-[1fr_180px] items-center gap-14 overflow-hidden rounded-xl border border-stone-200 bg-[#f3f1ec] p-10 max-md:grid-cols-1 max-md:p-7" data-reveal>
          <div>
            <p className="section-kicker">How I work</p>
            <h3 className="mt-4 text-3xl font-bold tracking-[-0.025em] text-[#172136]">Full-Stack Software Engineer</h3>
            <p className="mt-4 max-w-3xl leading-7 text-stone-600">
              I design and build complete software solutions, from responsive web applications
              and native Android apps to scalable backend services and AI-powered experiences.
              My focus is creating products that are fast, intuitive, maintainable, and
              production-ready.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full border border-stone-300 bg-white px-3 py-1.5 text-xs font-semibold text-[#172136]">Full-Stack Development</span>
              <span className="rounded-full border border-stone-300 bg-white px-3 py-1.5 text-xs font-semibold text-[#172136]">Android Engineering</span>
              <span className="rounded-full border border-stone-300 bg-white px-3 py-1.5 text-xs font-semibold text-[#172136]">AI Integration</span>
            </div>
          </div>
          <div className="grid h-36 place-items-center rounded-xl border border-stone-300 bg-white text-[#6977b8] max-md:h-24" aria-hidden="true">
            <Code2 size={38} strokeWidth={1.6} />
            <Braces size={72} strokeWidth={1.25} />
          </div>
        </article>
      </div>
    </section>
  );
}
