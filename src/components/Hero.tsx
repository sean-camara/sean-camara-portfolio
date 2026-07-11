import { ArrowRight } from "lucide-react";

const chips = ["React", "TypeScript", "Firebase", "Cloudflare", "MongoDB", "Kotlin"];

export function Hero() {
  return (
    <section className="mx-auto w-[min(1180px,calc(100%-48px))] pt-20 pb-10 max-sm:w-[calc(100%-32px)] max-sm:pt-12" id="home">
      <div className="grid grid-cols-[minmax(0,0.92fr)_minmax(420px,1.08fr)] items-center gap-16 max-lg:grid-cols-1 max-lg:gap-10">
        <div data-reveal>
          <p className="section-kicker mb-7">Sean John Camara / Philippines</p>
          <h1 className="max-w-2xl text-[clamp(2.8rem,4.5vw,4.8rem)] leading-[0.98] font-bold tracking-[-0.045em] text-[#172136] max-sm:text-[clamp(2.5rem,11.5vw,3.6rem)]">
            Full-stack developer building <span className="text-[#6977b8]">practical software.</span>
          </h1>
          <div className="mt-9 max-w-xl">
            <p className="text-[1.04rem] leading-7 text-stone-600">
              I design and ship web products, business systems, and AI-powered tools with
              thoughtful interfaces and dependable workflows.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a className="button-primary" href="#projects">
                Selected work
                <ArrowRight size={18} />
              </a>
              <a className="button-secondary" href="#contact">
                Get in touch
              </a>
            </div>
          </div>
        </div>
        <figure className="relative aspect-[16/10] overflow-hidden rounded-xl border border-stone-200 bg-stone-100 shadow-[0_24px_60px_rgba(23,33,54,0.12)]" data-reveal data-tilt data-parallax>
          <img
            src="/assets/rmv-showcase.png"
            alt="RMV Stainless Steel Fabrication project preview"
            decoding="async" className="h-full w-full object-contain"
          />
        </figure>
      </div>
      <div className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-y border-stone-200 py-5 font-mono text-xs font-medium text-stone-500" aria-label="Core technologies" data-reveal>
        {chips.map((chip) => (
          <span key={chip}>{chip}</span>
        ))}
      </div>
    </section>
  );
}
