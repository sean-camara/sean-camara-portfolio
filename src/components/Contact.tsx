import { ArrowUpRight, Code2, Mail, Network, Phone, type LucideIcon } from "lucide-react";

type ContactLink = {
  label: string;
  value: string;
  href: string;
  icon: LucideIcon;
};

type ContactProps = {
  contactLinks: ContactLink[];
};

export function Contact({ contactLinks }: ContactProps) {
  return (
    <section className="mx-auto w-[min(1180px,calc(100%-48px))] pb-20 max-sm:w-[calc(100%-32px)]" id="contact">
      <div className="grid grid-cols-[1fr_0.72fr] gap-20 overflow-hidden rounded-xl bg-[#172136] p-12 text-white shadow-[0_24px_60px_rgba(23,33,54,0.16)] max-lg:grid-cols-1 max-lg:gap-10 max-md:p-7" data-reveal>
        <div>
          <p className="font-mono text-[0.7rem] font-bold tracking-[0.13em] text-[#aeb8e8] uppercase">Contact</p>
          <h2 className="mt-4 text-[clamp(2.2rem,4vw,4rem)] leading-none font-bold tracking-[-0.035em]">Let&apos;s build something useful.</h2>
          <p className="mt-5 max-w-2xl leading-7 text-white/65">
            Open to opportunities, collaborations, and practical projects that need careful
            product thinking and reliable implementation.
          </p>
          <a className="mt-7 inline-flex max-w-full items-center gap-2.5 rounded-md bg-white px-4 py-3 text-sm font-semibold text-[#172136] transition hover:-translate-y-0.5" href="mailto:camara.sean13@gmail.com">
            <Mail size={18} />
            camara.sean13@gmail.com
            <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="border-t border-white/30">
          <a className="flex items-center gap-3 border-b border-white/30 py-4 transition hover:translate-x-1 hover:opacity-75" href="tel:09910248649">
            <Phone size={18} />
            <span>
              <small className="mb-0.5 block text-[0.7rem] text-white/60">Phone</small>
              09910248649
            </span>
          </a>
          {contactLinks
            .filter((link) => link.label === "GitHub" || link.label === "LinkedIn")
            .map((link) => {
              const Icon = link.label === "GitHub" ? Code2 : Network;
              return (
                <a className="flex items-center gap-3 border-b border-white/30 py-4 transition hover:translate-x-1 hover:opacity-75" href={link.href} target="_blank" rel="noreferrer" key={link.label}>
                  <Icon size={18} />
                  <span>
                    <small className="mb-0.5 block text-[0.7rem] text-white/60">{link.label}</small>
                    {link.value}
                  </span>
                </a>
              );
            })}
        </div>
      </div>
    </section>
  );
}
