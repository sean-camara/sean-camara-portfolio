import { renderToString } from "react-dom/server";
import { App } from "./App";
import { projects } from "./data/projects";
import { site } from "./data/site";

export const pages = [
  { path: "/", title: site.title, description: site.description },
  ...projects.map((project) => ({
    path: `/work/${project.visual}/`,
    title: `${project.title} | Sean John Camara`,
    description: project.description,
  })),
];
export function render(path: string) {
  return renderToString(<App path={path} />);
}
