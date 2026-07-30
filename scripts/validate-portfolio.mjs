import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const app = readFileSync(resolve(root, "src/App.tsx"), "utf8");
const projects = readFileSync(resolve(root, "src/data/projects.ts"), "utf8");
const hero = readFileSync(resolve(root, "src/components/Hero.tsx"), "utf8");
const contact = readFileSync(resolve(root, "src/components/Contact.tsx"), "utf8");
const showcase = readFileSync(resolve(root, "src/components/ProjectShowcase.tsx"), "utf8");
const experience = readFileSync(resolve(root, "src/components/ExperienceEducation.tsx"), "utf8");
const professionalExperience = readFileSync(resolve(root, "src/components/ProfessionalExperience.tsx"), "utf8");
const html = readFileSync(resolve(root, "index.html"), "utf8");
const files = [app, projects, hero, contact, showcase, html];

const checks = [
  [app.includes('label: "Main GitHub"') && app.includes("https://github.com/sean-camara"), "Main GitHub link"],
  [app.includes('label: "ApplyPH GitHub"') && app.includes("https://github.com/potatsukki"), "ApplyPH GitHub link"],
  [["https://github.com/potatsukki/ApplyPH", "https://github.com/potatsukki/rmv-web", "https://github.com/potatsukki/rmv-server", "https://github.com/potatsukki/ShelfLife"].every((url) => projects.includes(url)), "Canonical project repository owners"],
  [projects.includes('label: "Backend Repository"') && projects.includes("MoneyFlow_Backend"), "FlowMoney backend label"],
  [projects.includes("Public demo not yet available"), "Missing ApplyPH demo handling"],
  [existsSync(resolve(root, "public/Sean_John_Camara_Resume.pdf")), "Resume PDF"],
  [hero.includes('/Sean_John_Camara_Resume.pdf') && hero.includes("download"), "Resume download action"],
  [contact.includes("+63 991 024 8649") && contact.includes("tel:+639910248649"), "International phone number"],
  [showcase.includes("closeRef") && showcase.includes("triggerRefs") && showcase.includes('document.body.style.overflow = "hidden"'), "Accessible modal controls"],
  [showcase.includes('label="02 — Solution"') && showcase.includes('label="09 — Lessons learned"'), "Complete case-study sections"],
  [professionalExperience.includes("Customer Service Representative") && professionalExperience.includes("Concentrix") && experience.includes("Expected Graduation: 2027"), "Employment and graduation copy"],
  [projects.includes('label: "Currently Developing"') && projects.includes("LeetCode Easy & Medium"), "Continued-learning areas"],
  [html.includes('content="https://seanjohncamara.vercel.app/og.png"') && html.includes('property="og:image:width" content="1200"') && html.includes('property="og:image:height" content="630"'), "Social image metadata"],
  [html.includes('"@type": "Person"') && html.includes('"telephone": "+639910248649"'), "Person structured data"],
  [existsSync(resolve(root, "public/og.png")), "Open Graph image"],
  [["rmv-screenshot.png", "academiazen-screenshot.png", "shelflife-screenshot.jpg", "flowmoney-screenshot.png"].every((asset) => existsSync(resolve(root, "public/assets", asset))), "Project gallery assets"],
  [files.every((source) => !source.includes('href="#"')), "No fake destinations"],
];

const failures = checks.filter(([passed]) => !passed);
if (failures.length) {
  for (const [, label] of failures) console.error(`FAIL: ${label}`);
  process.exit(1);
}

for (const [, label] of checks) console.log(`PASS: ${label}`);
