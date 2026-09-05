import { useEffect } from "react";

// Everything renders in its final, readable state before motion is available.
export function MotionEffects() {
  useEffect(() => {
    const content = document.getElementById("page-content");
    if (!content) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia(
      "(min-width: 1100px) and (hover: hover) and (pointer: fine)",
    );
    let disposed = false;
    let generation = 0;
    let heroPlayed = false;
    let workReached = false;
    let pendingLoader: IntersectionObserver | undefined;
    let cleanup: (() => void) | undefined;

    const stop = () => {
      generation += 1;
      pendingLoader?.disconnect();
      pendingLoader = undefined;
      cleanup?.();
      cleanup = undefined;
    };

    const start = async () => {
      stop();
      if (disposed || preference.matches) return;
      const request = generation;

      // Mobile's opening uses CSS; load the scene engine only when work enters.
      if (!desktop.matches && !workReached) {
        const firstScene = content.querySelector(
          "#projects, .case-narrative, #contact",
        );
        if (firstScene && "IntersectionObserver" in window) {
          pendingLoader = new IntersectionObserver((entries) => {
            if (
              disposed ||
              request !== generation ||
              preference.matches ||
              !entries.some((entry) => entry.isIntersecting)
            )
              return;
            workReached = true;
            heroPlayed = true;
            void start();
          });
          pendingLoader.observe(firstScene);
        }
        return;
      }

      try {
        const { gsap } = await import("gsap");
        if (disposed || preference.matches || request !== generation) return;

        const media = gsap.matchMedia(content);
        cleanup = () => media.revert();

        media.add("(prefers-reduced-motion: no-preference)", () => {
          const select = (selector: string) =>
            gsap.utils.toArray<HTMLElement>(selector, content);

          if (
            desktop.matches &&
            !heroPlayed &&
            window.scrollY < window.innerHeight * 0.65
          ) {
            heroPlayed = true;
            const hero = gsap.timeline({
              defaults: { ease: "power3.out", clearProps: "transform" },
            });
            const lines = select(".hero-title-inner");
            const name = select(".hero-name");
            const supporting = select(
              ".hero-statement, .hero-actions, .resume-link",
            );
            const rule = select(".hero-rule");
            const orbit = select(".hero-orbit");

            // Leave the LCP portrait static; the typography carries the opening.
            if (lines.length)
              hero.from(
                lines,
                {
                  yPercent: 104,
                  duration: 1.12,
                  stagger: 0.12,
                  ease: "power4.out",
                },
                0.04,
              );
            if (name.length)
              hero.from(name, { y: 12, duration: 0.75 }, 0.08);
            if (supporting.length)
              hero.from(
                supporting,
                { y: 15, duration: 0.8, stagger: 0.09 },
                0.28,
              );
            if (rule.length)
              hero.from(
                rule,
                { scaleX: 0, transformOrigin: "left", duration: 1.15 },
                0.15,
              );
            if (orbit.length)
              hero.from(
                orbit,
                { scale: 0.94, duration: 1.5 },
                0.1,
              );
          }

          if (!("IntersectionObserver" in window)) return;
          const scenes = gsap.context(() => {}, content);
          const cards = select(
            ".index-row, .education-card, .certification-card",
          );
          const observer = new IntersectionObserver(
            (entries) => {
              if (disposed || request !== generation || preference.matches)
                return;
              entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                observer.unobserve(entry.target);
                const element = entry.target as HTMLElement;
                // Create tweens only when needed, without measuring every section.
                scenes.add(() => {
                  if (element.matches(".chapter-images, .about-workspace")) {
                    const image = element.querySelector("img");
                    const reveal = gsap.timeline({
                      defaults: { ease: "power3.out", duration: 1.1 },
                    });
                    reveal.from(element, {
                      y: 38,
                      clipPath: "inset(0 0 7% 0)",
                      clearProps: "transform,clipPath",
                    });
                    if (image)
                      reveal.from(
                        image,
                        { scale: 1.045, duration: 1.25, clearProps: "transform" },
                        0,
                      );
                  } else if (element.matches(".closing-arrow")) {
                    gsap.from(element, {
                      x: -24,
                      y: 24,
                      rotate: -8,
                      duration: 1.15,
                      ease: "power4.out",
                      clearProps: "transform",
                    });
                  } else {
                    const cardIndex = cards.indexOf(element);
                    gsap.from(element, {
                      y: cardIndex < 0 ? 28 : 34,
                      duration: 0.9,
                      delay: cardIndex < 0 ? 0 : (cardIndex % 2) * 0.08,
                      ease: "power3.out",
                      clearProps: "transform",
                    });
                  }
                });
              });
            },
            { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
          );
          select(
            ".section-heading h2, .about-heading h2, .chapter-images, .about-workspace, .index-row, .education-card, .certification-card, .closing-arrow",
          ).forEach((element) => observer.observe(element));
          return () => {
            observer.disconnect();
            scenes.revert();
          };
        });

        media.add(
          "(min-width: 1100px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
          () => {
            const frame = content.querySelector<HTMLElement>(
              ".hero-portrait-frame",
            );
            const depth = frame?.querySelector<HTMLElement>(
              ".hero-portrait-depth",
            );
            const surface = frame?.closest<HTMLElement>(".hero");
            if (!frame || !depth || !surface) return;

            gsap.set(depth, {
              transformPerspective: 900,
              transformOrigin: "50% 50%",
            });
            const options = { duration: 0.8, ease: "power3.out" };
            const xTo = gsap.quickTo(depth, "x", options);
            const yTo = gsap.quickTo(depth, "y", options);
            const rotateXTo = gsap.quickTo(depth, "rotationX", options);
            const rotateYTo = gsap.quickTo(depth, "rotationY", options);
            const move = (event: PointerEvent) => {
              if (event.pointerType !== "mouse" || document.hidden) return;
              const rect = frame.getBoundingClientRect();
              const x = gsap.utils.clamp(
                -1,
                1,
                ((event.clientX - rect.left) / rect.width - 0.5) * 2,
              );
              const y = gsap.utils.clamp(
                -1,
                1,
                ((event.clientY - rect.top) / rect.height - 0.5) * 2,
              );
              xTo(x * 7);
              yTo(y * 7);
              rotateXTo(y * -1.1);
              rotateYTo(x * 1.3);
            };
            const reset = () => {
              xTo(0);
              yTo(0);
              rotateXTo(0);
              rotateYTo(0);
            };
            const settle = () => {
              reset();
              [xTo, yTo, rotateXTo, rotateYTo].forEach(({ tween }) =>
                tween.progress(1).pause(),
              );
            };
            const visibility = () => {
              if (document.hidden) settle();
            };
            surface.addEventListener("pointermove", move);
            surface.addEventListener("pointerleave", reset);
            window.addEventListener("blur", settle);
            document.addEventListener("visibilitychange", visibility);
            return () => {
              surface.removeEventListener("pointermove", move);
              surface.removeEventListener("pointerleave", reset);
              window.removeEventListener("blur", settle);
              document.removeEventListener("visibilitychange", visibility);
            };
          },
        );
      } catch {
        // A failed optional motion download must leave the page usable.
        if (request === generation) stop();
      }
    };

    void start();
    preference.addEventListener("change", start);
    desktop.addEventListener("change", start);
    return () => {
      disposed = true;
      preference.removeEventListener("change", start);
      desktop.removeEventListener("change", start);
      stop();
    };
  }, []);
  return null;
}
