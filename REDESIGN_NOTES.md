# Portfolio redesign — September 5, 2026

## Delivered

Restored the original black-and-gold direction after the user's correction: portrait-led cinematic opening, Fraunces display type, Manrope body copy, the original monogram, dark sections, and a gold-accented contact finale. All seven original project covers are visible, alongside the beach portrait, school photographs, and large credential previews.

The existing React/Vite project includes three substantial featured projects, four additional project cards with large images, seven shareable case studies, evidence-linked capabilities, personal background, employment, education, school-experience dialogs, credentials, résumé access, and reliable contact actions.

GSAP provides three motion moments: desktop headline choreography, image entrances as work comes into view, and the closing contact arrow. Desktop pointer movement adds slight portrait depth. Mobile uses a short CSS headline entrance, loading GSAP as the work section approaches. IntersectionObserver starts scenes only when needed; the main portrait stays static during loading. Reduced motion renders the final composition and removes active motion when toggled. Native scrolling remains, with no Three.js or smooth-scroll dependency.

Skills applied: build-awwwards-quality-sites, ui-ux-pro-max, editorial-portfolio-chapters, animation-systems, cinematic-gsap-lenis-motion-system, and Playwright. The user's original design, image preservation, and native-scroll requirements take priority over conflicting skill defaults.

## Inventory and integrity

1. Aghimuan Creatives — designer/developer; original tablet showcase restored, live-site capture retained in its gallery.
2. Yhan’s Catering Services — paid freelance frontend/design project; original laptop showcase restored, live-site capture retained in its gallery.
3. RMV Stainless Steel Fabrication — independent full-stack academic capstone; retained explicit scope disclaimer.
4. AcademiaZen — personal student productivity PWA.
5. FlowMoney — personal finance web application.
6. ShelfLife — native Android pantry project.
7. ApplyPH — newer project retained; active development, no public demo claimed.

No separate “Portfolio Website” project record existed, so no invented case study was added. Dates, employer, expected graduation, qualifications, and contact information come from the existing repository. No new outcomes, clients, testimonials, availability promises, or awards were added.

The résumé's pre-existing modification, the original stylesheet's pre-existing edits, and all eight pre-existing asset deletions were preserved. This correction deletes no images. All 18 project cover/gallery references resolve. The new stylesheet is separate. RMV's supplied “dashboard” image actually depicts the public services homepage; its alternative text and caption were corrected.

## Checks performed

Latest typography cleanup: relaxed letter spacing, simpler project/credential headings, shorter hero copy, and fewer decorative labels. All imagery remains. Production build and eight targeted identity, responsive, and accessibility checks passed. The performance figures below were measured before this typography refinement; Lighthouse was not rerun for this small change.

- Production build and TypeScript: pass. Homepage, seven case studies, and 404 page prerendered.
- Existing unit tests: 3 pass. Content/link checks: 17 pass.
- Production Chromium browser tests: 16 pass.
- Reflow: 320 × 740, 390 × 844, 768 × 1024, 1024 × 768, 1440 × 1000, and 844 × 390.
- All eight pages render useful content with JavaScript disabled.
- All seven case-study direct URLs, browser back, canonical metadata, and return links checked.
- Mobile focus trap, Escape, focus restoration, resize cleanup, skip link, school dialog, clipboard success/failure, résumé PDF response, image failure, and reduced motion checked.
- Separate mobile touch-context check: menu tap and contact navigation pass. Motion QA also checks desktop pointer movement/reset, runtime reduced-motion cleanup, 390 px touch behavior, and repeated case-study navigation with no browser errors.
- Axe scans: zero violations under the selected WCAG A/AA tags on the homepage, all case studies, and open mobile menu. This is not a claim of complete accessibility conformance.
- Visual inspection and refinement: desktop/mobile hero, all major sections, menu, contact, and first three case studies. No production console errors in the browser smoke test.
- External project links: 11 returned HTTP 200; AcademiaZen’s domain did not resolve in this environment. Its original link remains intact.

## Measured performance

Lighthouse 13.4.1, local production preview, headless Chrome, September 5, 2026. Standard simulated mobile configuration and desktop preset; these are lab results, not field percentiles.

| Mode | Performance | Accessibility | Best practices | SEO | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Mobile, dark cinematic revision | 84 | 100 | 100 | 100 | 3.5 s | 230 ms | 0 |

The earlier ivory design's 97 mobile / 100 desktop scores do not describe this revision. The first dark motion build scored 67; deferring mobile animation setup, keeping the portrait stable, preserving full text contrast during motion, and resizing the original monogram improved the measured mobile score to 84. The initial 95 performance aspiration remains unmet. An offscreen layout optimization was tested and removed because it displaced mobile anchor destinations. These measurements vary by hardware, network, and hosting. Field LCP, INP, and CLS are unavailable; TBT is not an INP measurement.

Current mobile report: `output/playwright/redesign/lighthouse-mobile-cinematic.json`. Earlier reports remain as historical evidence.

## Before and after

Saved under `output/playwright/redesign/` (gitignored):

- `before-desktop.png` / `after-desktop.png`
- `before-mobile.png` / `after-mobile.png`
- `after-full-desktop.png` / `after-full-mobile.png`
- `viewport-*.png`, `desktop-case-*.png`, `mobile-case-*.png`, `mobile-menu.png`, and `touch-contact.png`

## Remaining limits

- AcademiaZen DNS could not be verified; this does not establish permanent unavailability.
- ApplyPH has no public demo; ShelfLife has no linked store release. These existing limitations remain visible.
- No standalone Portfolio Website case-study content was supplied.
- Chromium and emulated mobile were tested; Safari, Firefox, physical devices, and assistive-technology testing remain outside this run.
- Detailed project engineering narratives were preserved from repository content; external repositories’ own test suites were not rerun.
- No lint script exists. No deployment was performed.

## Run and deployment

Use `npm run dev` for editing. Use `npm run build` followed by `npm run preview -- --port 4180` for the static production preview. Vercel’s existing build/output configuration is retained, with trailing slashes for shareable static case studies. No secrets or new services are required.
