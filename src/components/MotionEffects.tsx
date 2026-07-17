import { useEffect } from "react";

const revealSelector = "[data-reveal]";
const tiltSelector = "[data-tilt]";
const parallaxSelector = "[data-parallax]";
const magneticSelector = "[data-magnetic]";

export function MotionEffects() {
  useEffect(() => {
    const root = document.documentElement;
    const scrollProgress = document.querySelector<HTMLElement>(".scroll-progress");
    const pointerOrb = document.querySelector<HTMLElement>(".pointer-orb");
    const heroCopy = document.querySelector<HTMLElement>(".hero-copy");
    const heroImage = document.querySelector<HTMLElement>(".hero-portrait img");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const revealElements = Array.from(
      document.querySelectorAll<HTMLElement>(revealSelector),
    );
    const parallaxElements = Array.from(
      document.querySelectorAll<HTMLElement>(parallaxSelector),
    );
    const activeParallaxElements = new Set<HTMLElement>();
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));

    let observer: IntersectionObserver | undefined;

    if (reduceMotion) {
      revealElements.forEach((element) => element.classList.add("is-visible"));
    } else {
      root.classList.add("motion-ready");
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            observer?.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
      );
      revealElements.forEach((element) => observer?.observe(element));
    }

    const tiltCleanups: Array<() => void> = [];
    const magneticCleanups: Array<() => void> = [];
    let pointerFrame = 0;

    if (!reduceMotion && finePointer) {
      document.querySelectorAll<HTMLElement>(tiltSelector).forEach((element) => {
        let tiltFrame = 0;

        const handlePointerMove = (event: PointerEvent) => {
          if (tiltFrame) cancelAnimationFrame(tiltFrame);
          tiltFrame = requestAnimationFrame(() => {
            const rect = element.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width;
            const y = (event.clientY - rect.top) / rect.height;
            element.style.setProperty("--tilt-x", `${((0.5 - y) * 5).toFixed(2)}deg`);
            element.style.setProperty("--tilt-y", `${((x - 0.5) * 6).toFixed(2)}deg`);
            element.style.setProperty("--pointer-x", `${(x * 100).toFixed(1)}%`);
            element.style.setProperty("--pointer-y", `${(y * 100).toFixed(1)}%`);
            tiltFrame = 0;
          });
        };

        const resetTilt = () => {
          element.style.setProperty("--tilt-x", "0deg");
          element.style.setProperty("--tilt-y", "0deg");
        };

        element.addEventListener("pointermove", handlePointerMove);
        element.addEventListener("pointerleave", resetTilt);
        tiltCleanups.push(() => {
          if (tiltFrame) cancelAnimationFrame(tiltFrame);
          element.removeEventListener("pointermove", handlePointerMove);
          element.removeEventListener("pointerleave", resetTilt);
        });
      });

      document.querySelectorAll<HTMLElement>(magneticSelector).forEach((element) => {
        const handlePointerMove = (event: PointerEvent) => {
          const rect = element.getBoundingClientRect();
          const x = (event.clientX - (rect.left + rect.width / 2)) * 0.14;
          const y = (event.clientY - (rect.top + rect.height / 2)) * 0.18;
          element.style.setProperty("--magnetic-x", `${x.toFixed(2)}px`);
          element.style.setProperty("--magnetic-y", `${y.toFixed(2)}px`);
        };
        const resetMagnetic = () => {
          element.style.setProperty("--magnetic-x", "0px");
          element.style.setProperty("--magnetic-y", "0px");
        };
        element.addEventListener("pointermove", handlePointerMove);
        element.addEventListener("pointerleave", resetMagnetic);
        magneticCleanups.push(() => {
          element.removeEventListener("pointermove", handlePointerMove);
          element.removeEventListener("pointerleave", resetMagnetic);
        });
      });

      const handlePointerMove = (event: PointerEvent) => {
        if (pointerFrame) cancelAnimationFrame(pointerFrame);
        pointerFrame = requestAnimationFrame(() => {
          pointerOrb?.style.setProperty(
            "transform",
            `translate3d(${event.clientX - 130}px, ${event.clientY - 130}px, 0)`,
          );
          root.classList.add("pointer-active");
          pointerFrame = 0;
        });
      };
      const handlePointerLeave = () => root.classList.remove("pointer-active");
      document.addEventListener("pointermove", handlePointerMove);
      document.documentElement.addEventListener("mouseleave", handlePointerLeave);
      tiltCleanups.push(() => {
        document.removeEventListener("pointermove", handlePointerMove);
        document.documentElement.removeEventListener("mouseleave", handlePointerLeave);
      });
    }

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const id = (visible.target as HTMLElement).id;
        document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
        });
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0, 0.15, 0.4] },
    );
    sections.forEach((section) => sectionObserver.observe(section));

    const parallaxObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          if (entry.isIntersecting) activeParallaxElements.add(element);
          else activeParallaxElements.delete(element);
        });
      },
      { rootMargin: "20% 0px" },
    );
    parallaxElements.forEach((element) => parallaxObserver.observe(element));

    let scrollFrame = 0;

    const updateScrollEffects = () => {
      const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollRange > 0 ? window.scrollY / scrollRange : 0;
      scrollProgress?.style.setProperty("transform", `scaleX(${progress.toFixed(4)})`);
      const heroProgress = Math.min(1, window.scrollY / Math.max(1, window.innerHeight));
      heroCopy?.style.setProperty("--hero-copy-shift", `${(-34 * heroProgress).toFixed(2)}px`);
      heroImage?.style.setProperty("--hero-image-shift", `${(18 * heroProgress).toFixed(2)}px`);
      heroImage?.style.setProperty("--hero-image-scale", (1.04 + heroProgress * 0.035).toFixed(4));

      if (!reduceMotion) {
        const offsets = Array.from(activeParallaxElements, (element) => {
          const rect = element.getBoundingClientRect();
          const elementCenter = rect.top + rect.height / 2;
          const distance = window.innerHeight / 2 - elementCenter;
          const speed = Number(element.dataset.parallaxSpeed ?? 1);
          const offset = Math.max(-30, Math.min(30, distance * 0.035 * speed));
          return [element, offset] as const;
        });
        offsets.forEach(([element, offset]) => {
          element.style.setProperty("--parallax-offset", `${offset.toFixed(2)}px`);
        });
      }

      scrollFrame = 0;
    };

    const handleScroll = () => {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScrollEffects);
    };

    updateScrollEffects();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      observer?.disconnect();
      sectionObserver.disconnect();
      parallaxObserver.disconnect();
      tiltCleanups.forEach((cleanup) => cleanup());
      magneticCleanups.forEach((cleanup) => cleanup());
      if (scrollFrame) cancelAnimationFrame(scrollFrame);
      if (pointerFrame) cancelAnimationFrame(pointerFrame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      root.classList.remove("motion-ready");
      scrollProgress?.style.removeProperty("transform");
      pointerOrb?.style.removeProperty("transform");
      heroCopy?.style.removeProperty("--hero-copy-shift");
      heroImage?.style.removeProperty("--hero-image-shift");
      heroImage?.style.removeProperty("--hero-image-scale");
      root.classList.remove("pointer-active");
    };
  }, []);

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <div className="pointer-orb" aria-hidden="true" />
    </>
  );
}
