import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const app = readFileSync(resolve(root, "src/App.tsx"), "utf8");
const projects = readFileSync(resolve(root, "src/data/projects.ts"), "utf8");
const files = [app, projects, readFileSync(resolve(root, "src/components/Hero.tsx"), "utf8")];

const checks = [
  [app.includes('label: "Primary GitHub"') && app.includes("https://github.com/sean-camara"), "Primary GitHub link"],
  [projects.includes("https://github.com/potatsukki/ApplyPH"), "ApplyPH repository owner"],
  [projects.includes('label: "Backend Repository"') && projects.includes("MoneyFlow_Backend"), "FlowMoney backend label"],
  [projects.includes("Public demo not yet available"), "Missing ApplyPH demo handling"],
  [existsSync(resolve(root, "public/Sean_John_Camara_Resume.pdf")), "Resume PDF"],
  [files.every((source) => !source.includes('href="#"')), "No fake destinations"],
];

const failures = checks.filter(([passed]) => !passed);
if (failures.length) {
  for (const [, label] of failures) console.error(`FAIL: ${label}`);
  process.exit(1);
}

for (const [, label] of checks) console.log(`PASS: ${label}`);
