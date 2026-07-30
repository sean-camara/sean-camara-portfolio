# Sean John Camara - Developer Portfolio

Responsive portfolio for Sean John Camara, positioned for junior frontend, React, Next.js, and TypeScript roles. Full-stack and Android work appear as supporting experience.

## Live Site

https://seanjohncamara.vercel.app

## Featured Work

- RMV Stainless Steel Fabrication System
- AcademiaZen
- ApplyPH
- ShelfLife
- FlowMoney

## Stack

- React + Vite
- TypeScript
- Custom global CSS architecture with reusable design tokens and component-specific class naming
- Lucide React icons
- Vercel-ready static build

## Local Development

```bash
npm install
npm run dev
npm run typecheck
npm run test
npm run test:e2e
```

## Production Build

```bash
npm run build
```

Production output is generated in `dist/`, the default Vite output directory for Vercel.

## Content Notes

Project content is based on Sean John Camara's GitHub repositories and resume materials. No work experience, companies, certifications, or fake metrics are invented.

Development experience shown on the site comes from independent personal projects and an academic capstone, not formal software employment. Expected graduation is 2027.

## Screenshot

![Sean John Camara developer portfolio](public/og.png)

## Architecture

The site is a client-rendered React application. `src/data/projects.ts` is the content source for project cards and structured case studies; reusable components render the sections and accessible dialogs. Vite produces a static `dist/` build served by Vercel. The downloadable resume is generated from `resume/generate_resume.py` and copied into `public/`.

## Environment Variables

No environment variables are required. The portfolio contains no server-side services or private credentials.

## Testing

- `npm test`: Node unit tests plus portfolio content/link validation.
- `npm run typecheck`: strict TypeScript validation.
- `npm run test:e2e`: Playwright navigation, dialog, responsive, and resume-link flows.
- `npm run test:a11y`: serious/critical accessibility checks with axe.
- `npm run build`: production TypeScript and Vite build.

No coverage percentage is published. Visual regression coverage and more assistive-technology testing remain future work.

## Deployment

Vercel serves the static Vite output. `vercel.json` contains the project deployment configuration; no deployment secrets belong in this repository.

## Known Limitations

- Project claims depend on repository-visible evidence and may lag behind private or uncommitted work.
- Case studies use concise summaries rather than full engineering design documents.
- The generated resume is intentionally limited to one page.

## Future Improvements

- Add dated case-study updates as projects reach verified release milestones.
- Expand automated visual and cross-browser checks.
- Keep future commits small, imperative, and scoped; group project documentation assets consistently without rewriting existing history.

## License

No license file is currently included. All rights are reserved unless a license is added later.
