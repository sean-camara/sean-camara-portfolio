# Sean John Camara — Developer Portfolio

A dark, cinematic portfolio for a **Full-Stack Web & Android Developer**, built in the existing React, TypeScript, and Vite application.

## Run locally

```sh
npm install
npm run dev
```

Production preview and checks:

```sh
npm run build
npm run preview -- --port 4180
npm test
npm run test:e2e
```

The build type-checks, bundles, and prerenders the homepage, seven case studies, and a 404 page. No environment variables or form backend are required. Browser tests use the production preview on port 4180; rebuild before testing if a preview is already running. No lint command is configured.

## Pages and content

- Home: identity, selected work, project index, capabilities, about, employment, education, credentials, contact.
- Case studies: `/work/aghimuan/`, `/work/yhans/`, `/work/rmv/`, `/work/academia/`, `/work/flowmoney/`, `/work/shelflife/`, `/work/applyph/`.
- Project facts: `src/data/projects.ts`. All documented roles, scope, technical details, and limitations are retained.
- Styles: `src/editorial.css`. The pre-existing, edited `src/styles.css` is preserved but no longer imported.
- Media dimensions: `src/data/media.json`. Update this manifest when replacing an image.
- Identity and metadata: `src/data/site.ts`, `index.html`, and `scripts/prerender.mjs`.
- The existing résumé remains at `/Sean_John_Camara_Resume.pdf`; it was not regenerated.

Native anchors and separately rendered pages support direct links, browser history, and useful content without JavaScript. Contact uses actual email/phone/profile links; clipboard feedback reflects genuine success or failure.

## Design and motion

Near-black, warm white, and muted gold restore the original visual direction. Local Fraunces and Manrope fonts include SIL Open Font Licenses. The original portrait, monogram, all seven project covers, beach portrait, school photographs, and credential previews remain visible. Live Aghimuan and Yhan’s captures are additional case-study images. See `public/assets/optimized/PROVENANCE.md`.

GSAP choreographs the desktop headline, image entrances, and closing arrow, with subtle portrait depth on desktop. Mobile uses a brief CSS headline entrance and loads GSAP when the work section approaches. CSS also handles hover feedback and sticky project summaries. Native scrolling and cursor are retained. Reduced motion is honored initially and when the preference changes; observers, listeners, and animations clean up. Static HTML remains usable if motion cannot load. No 3D scene or smooth-scroll engine is needed.

## Deployment

Vercel continues to serve `dist/`. `vercel.json` enables canonical trailing slashes for the static case-study directories. The build generates per-page metadata, a complete sitemap, and useful static HTML, and inlines the small stylesheet to eliminate its initial loading round trip. **No production deployment was performed.**

## Verification and limits

See `REDESIGN_NOTES.md` for measured results, screenshots, the verified project inventory, and remaining limitations. The initial résumé changes, stylesheet edits, and asset deletions were preserved.
