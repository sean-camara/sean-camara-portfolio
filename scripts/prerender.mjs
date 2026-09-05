import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { resolve, join } from "node:path";
import { pages, render } from "../dist/server/entry-server.js";

const dist = resolve("dist");
let template = await readFile(join(dist, "index.html"), "utf8");
// The complete stylesheet is ~7 KB compressed. Inline it in static pages to
// remove the first-render stylesheet round trip on slower mobile connections.
const stylesheet = template.match(
  /<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/,
);
if (stylesheet) {
  const css = await readFile(join(dist, stylesheet[1].slice(1)), "utf8");
  template = template.replace(stylesheet[0], () => `<style>${css}</style>`);
}
const escape = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
const origin = "https://seanjohncamara.vercel.app";
for (const page of [
  ...pages,
  {
    path: "/404",
    title: "Page not found | Sean John Camara",
    description: "Return to Sean John Camara’s developer portfolio.",
  },
]) {
  let html = template.replace(
    '<div id="root"></div>',
    () => '<div id="root">' + render(page.path) + "</div>",
  );
  html = html.replace(
    /<title>.*?<\/title>/,
    () => "<title>" + escape(page.title) + "</title>",
  );
  html = html.replace(
    /(<meta (?:name|property)="(?:description|og:description|twitter:description)" content=")[^"]*(")/g,
    (_, start, end) => start + escape(page.description) + end,
  );
  html = html.replace(
    /(<meta (?:name|property)="(?:og:title|twitter:title)" content=")[^"]*(")/g,
    (_, start, end) => start + escape(page.title) + end,
  );
  html = html.replace(
    /(<link rel="canonical" href=")[^"]*(")/,
    (_, start, end) => start + origin + page.path + end,
  );
  html = html.replace(
    /(<meta property="og:url" content=")[^"]*(")/,
    (_, start, end) => start + origin + page.path + end,
  );
  if (page.path === "/404")
    html = html.replace('content="index, follow"', 'content="noindex, follow"');
  const directory =
    page.path === "/" || page.path === "/404"
      ? dist
      : join(dist, page.path.slice(1));
  await mkdir(directory, { recursive: true });
  await writeFile(
    join(directory, page.path === "/404" ? "404.html" : "index.html"),
    html,
  );
}
const sitemap =
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  pages
    .map(({ path }) => "  <url><loc>" + origin + path + "</loc></url>")
    .join("\n") +
  "\n</urlset>\n";
await writeFile(join(dist, "sitemap.xml"), sitemap);
// Only generated server output inside this build directory is removed.
const serverOutput = resolve(dist, "server");
if (serverOutput !== join(dist, "server"))
  throw new Error("Unexpected server output path");
await rm(serverOutput, { recursive: true, force: true });
console.log(
  "Prerendered " + pages.length + " pages and a 404 page; sitemap generated.",
);
