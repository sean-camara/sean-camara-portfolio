import { useEffect, useRef, useState } from "react";
import type { Project } from "../data/projects";
import dimensions from "../data/media.json";

export function ProjectMedia({
  project,
  priority = false,
  detail = false,
  wide = false,
}: {
  project: Project;
  priority?: boolean;
  detail?: boolean;
  wide?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const image = useRef<HTMLImageElement>(null);
  const source = detail
    ? (project.gallery?.[0]?.src ?? project.imageUrl)
    : project.imageUrl;
  const size = (
    dimensions as Record<string, { width: number; height: number }>
  )[source];
  const responsive = source.includes("-live.webp");
  useEffect(() => {
    // A failed request can finish before React hydrates static HTML.
    if (image.current?.complete && image.current.naturalWidth === 0)
      setFailed(true);
  }, [source]);
  return (
    <div
      className={`project-media media-${project.visual}${failed ? " media-unavailable" : ""}`}
    >
      {failed ? (
        <p>
          <span className="mono">Project preview</span>
          <strong>{project.title}</strong>
          <span>Image unavailable. Read the project details below.</span>
        </p>
      ) : (
        <img
          ref={image}
          src={source}
          alt={
            detail
              ? (project.gallery?.[0]?.alt ?? `${project.title} website`)
              : `${project.title} — project interface`
          }
          width={size?.width}
          height={size?.height}
          srcSet={
            responsive
              ? `${source.replace(".webp", "-640.webp")} 640w, ${source.replace(".webp", "-960.webp")} 960w, ${source} 1440w`
              : undefined
          }
          sizes={
            responsive
              ? priority && !wide
                ? "(max-width: 639px) 90vw, 50vw"
                : "(max-width: 639px) 90vw, 85vw"
              : undefined
          }
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
