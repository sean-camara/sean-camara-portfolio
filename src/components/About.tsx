export function About() {
  return (
    <section className="mx-auto w-[min(1180px,calc(100%-48px))] border-t border-stone-200 py-28 max-sm:w-[calc(100%-32px)] max-sm:py-20" id="about">
      <div className="grid grid-cols-[minmax(300px,0.76fr)_minmax(0,1fr)] items-center gap-24 max-lg:gap-14 max-md:grid-cols-1 max-md:gap-9">
        <figure className="aspect-[4/5] max-w-120 overflow-hidden rounded-xl border border-stone-200 bg-stone-100" data-reveal data-parallax>
          <img
            src="/assets/sean-profile.png"
            alt="Sean John Camara"
            loading="lazy"
            decoding="async" className="h-full w-full object-cover"
          />
        </figure>

        <div data-reveal>
          <p className="section-kicker">About</p>
          <h2 className="mt-4 mb-7 text-[clamp(2.2rem,4vw,4rem)] leading-none font-bold tracking-[-0.035em] text-[#172136]">Useful software, built with care.</h2>
          <p className="mb-4 leading-7 text-stone-600">
            I am Sean John Camara, a Computer Science student and developer focused on
            practical web applications and full-stack systems.
          </p>
          <p className="mb-4 leading-7 text-stone-600">
            My work centers on real-world projects, clear interfaces, useful workflows,
            and deployed applications. I primarily build for the web, with native Android
            development as an additional specialization.
          </p>

          <dl className="mt-8 border-t border-stone-200">
            <div className="grid grid-cols-[110px_1fr] gap-5 border-b border-stone-200 py-4 max-sm:grid-cols-1 max-sm:gap-1">
              <dt className="font-mono text-xs font-bold text-stone-400 uppercase">Education</dt>
              <dd className="text-sm text-[#172136]">BS Computer Science, STI College Fairview - Expected 2027</dd>
            </div>
            <div className="grid grid-cols-[110px_1fr] gap-5 border-b border-stone-200 py-4 max-sm:grid-cols-1 max-sm:gap-1">
              <dt className="font-mono text-xs font-bold text-stone-400 uppercase">Focus</dt>
              <dd className="text-sm text-[#172136]">Web systems, APIs, applied AI, and native Android apps</dd>
            </div>
            <div className="grid grid-cols-[110px_1fr] gap-5 border-b border-stone-200 py-4 max-sm:grid-cols-1 max-sm:gap-1">
              <dt className="font-mono text-xs font-bold text-stone-400 uppercase">Based in</dt>
              <dd className="text-sm text-[#172136]">Philippines</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
