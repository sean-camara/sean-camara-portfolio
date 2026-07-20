import { useEffect, useState } from "react";
import { markIntroSeen, shouldShowIntro } from "../lib/intro";

export function IntroScreen() {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return shouldShowIntro(window.sessionStorage, window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  });

  useEffect(() => {
    if (!isVisible) return;
    markIntroSeen(window.sessionStorage);
    const timeout = window.setTimeout(() => setIsVisible(false), 700);
    return () => window.clearTimeout(timeout);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="intro-screen" aria-hidden="true">
      <div>
        <span>Sean John Camara</span>
        <small>Junior Frontend Developer · React · Next.js · TypeScript</small>
      </div>
    </div>
  );
}
