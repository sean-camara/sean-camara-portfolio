import { useEffect } from "react";

const revealSelector = "[data-reveal]";
const tiltSelector = "[data-tilt]";
const parallaxSelector = "[data-parallax]";

export function MotionEffects() {
  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const revealElements = Array.from(
      document.querySelectorAll<HTMLElement>(revealSelector),
    );
    const parallaxElements = Array.from(
      document.querySelectorAll<HTMLElement>(parallaxSelector),
    );

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

    if (!reduceMotion && finePointer) {
      document.querySelectorAll<HTMLElement>(tiltSelector).forEach((element) => {
        let pointerFrame = 0;

        const handlePointerMove = (event: PointerEvent) => {
          if (pointerFrame) cancelAnimationFrame(pointerFrame);
          pointerFrame = requestAnimationFrame(() => {
            const rect = element.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width;
            const y = (event.clientY - rect.top) / rect.height;
            element.style.setProperty("--tilt-x", `${((0.5 - y) * 5).toFixed(2)}deg`);
            element.style.setProperty("--tilt-y", `${((x - 0.5) * 6).toFixed(2)}deg`);
            pointerFrame = 0;
          });
        };

        const resetTilt = () => {
          element.style.setProperty("--tilt-x", "0deg");
          element.style.setProperty("--tilt-y", "0deg");
        };

        element.addEventListener("pointermove", handlePointerMove);
        element.addEventListener("pointerleave", resetTilt);
        tiltCleanups.push(() => {
          if (pointerFrame) cancelAnimationFrame(pointerFrame);
          element.removeEventListener("pointermove", handlePointerMove);
          element.removeEventListener("pointerleave", resetTilt);
        });
      });
    }

    let scrollFrame = 0;

    const updateScrollEffects = () => {
      const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollRange > 0 ? window.scrollY / scrollRange : 0;
      root.style.setProperty("--scroll-progress", progress.toFixed(4));

      if (!reduceMotion) {
        parallaxElements.forEach((element) => {
          const rect = element.getBoundingClientRect();
          const elementCenter = rect.top + rect.height / 2;
          const distance = window.innerHeight / 2 - elementCenter;
          const offset = Math.max(-22, Math.min(22, distance * 0.035));
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
      tiltCleanups.forEach((cleanup) => cleanup());
      if (scrollFrame) cancelAnimationFrame(scrollFrame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      root.classList.remove("motion-ready");
      root.style.removeProperty("--scroll-progress");
    };
  }, []);

  return <div className="scroll-progress" aria-hidden="true" />;
}
