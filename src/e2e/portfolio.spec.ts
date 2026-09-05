import { existsSync } from "node:fs";
import { resolve } from "node:path";
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const slugs = [
  "aghimuan",
  "yhans",
  "rmv",
  "academia",
  "flowmoney",
  "shelflife",
  "applyph",
];
test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
});
test("identity, work order, resume, and verified contact links", async ({
  page,
  request,
}) => {
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Full-Stack Developer",
      exact: true,
    }),
  ).toBeVisible();
  await expect(page.locator(".hero-eyebrow")).toContainText(
    "Full-Stack Web & Android Developer",
  );
  await expect(page.locator(".project-chapter h3")).toHaveText([
    "Aghimuan Creatives",
    "Yhan’s Catering Services",
    "RMV Stainless Steel Fabrication",
  ]);
  await expect(page.locator(".index-title h4")).toHaveText([
    "AcademiaZen",
    "FlowMoney",
    "ShelfLife",
    "ApplyPH",
  ]);
  const portrait = page.locator(".hero-portrait-frame img");
  await expect(portrait).toHaveAttribute("src", "/assets/sean-profile.webp");
  await expect(portrait).toBeVisible();
  const covers = page.locator(
    ".project-chapter .project-media img, .index-row .project-media img",
  );
  const originalCovers = [
    "/assets/aghimuan-creatives-showcase.webp",
    "/assets/optimized/yhans-catering-showcase.webp",
    "/assets/rmv-showcase.webp",
    "/assets/academiazen-showcase.webp",
    "/assets/flowmoney-showcase.webp",
    "/assets/shelflife-showcase.webp",
    "/assets/applyph-showcase.webp",
  ];
  await expect(covers).toHaveCount(originalCovers.length);
  for (const [index, source] of originalCovers.entries())
    await expect(covers.nth(index)).toHaveAttribute("src", source);
  for (const image of [portrait, ...(await covers.all())]) {
    await image.scrollIntoViewIfNeeded();
    await expect(image).toBeVisible();
    await expect
      .poll(() =>
        image.evaluate(
          (el: HTMLImageElement) => el.complete && el.naturalWidth > 0,
        ),
      )
      .toBe(true);
  }
  await expect(page.locator(".hero a[download]")).toHaveAttribute(
    "href",
    "/Sean_John_Camara_Resume.pdf",
  );
  const resume = await request.get("/Sean_John_Camara_Resume.pdf");
  expect(resume.status()).toBe(200);
  expect((await resume.body()).subarray(0, 4).toString()).toBe("%PDF");
  expect(existsSync(resolve("public/Sean_John_Camara_Resume.pdf"))).toBe(true);
  await expect(page.locator('a[href="#"]')).toHaveCount(0);
  await expect(
    page.locator('a[href="mailto:camara.sean13@gmail.com"]').first(),
  ).toBeVisible();
});
test("mobile menu traps focus, closes on Escape, and handles anchor navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const toggle = page.getByLabel("Open navigation menu", { exact: true });
  await toggle.click();
  await expect(page.locator(".mobile-panel")).toBeVisible();
  await expect(page.locator("#page-content")).toHaveAttribute("inert", "");
  await page.keyboard.press("Shift+Tab");
  await expect(page.locator(".mobile-resume")).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    page.getByLabel("Close navigation menu", { exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await expect(page.locator(".mobile-panel")).toBeHidden();
  await expect(page.locator("#page-content")).not.toHaveAttribute("inert", "");
  await toggle.click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "04 Contact" })
    .click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(page.locator(".mobile-panel")).toBeHidden();
  await expect(page.locator("#contact")).toBeFocused();
  await page.getByLabel("Open navigation menu", { exact: true }).click();
  await page.setViewportSize({ width: 1024, height: 768 });
  await expect(page.locator("#page-content")).not.toHaveAttribute("inert", "");
});
test("case-study navigation, direct URLs, back, and page metadata", async ({
  page,
}) => {
  await page
    .getByRole("link", {
      name: "Read case study: RMV Stainless Steel Fabrication",
    })
    .click();
  await expect(page).toHaveURL(/\/work\/rmv\/?$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "RMV Stainless Steel Fabrication",
  );
  await expect(page).toHaveTitle(
    "RMV Stainless Steel Fabrication | Sean John Camara",
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://seanjohncamara.vercel.app/work/rmv/",
  );
  await page.goBack();
  await expect(page.locator("#projects")).toBeVisible();
  for (const slug of slugs) {
    await page.goto("/work/" + slug + "/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    for (const id of ["problem", "approach", "implementation", "delivery"])
      await expect(page.locator("#" + id)).toBeVisible();
    await expect(page.locator(".case-pagination a")).toHaveCount(2);
  }
});
test("email copy reports real success and preserves a fallback on failure", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.getByRole("button", { name: "Copy email", exact: true }).click();
  await expect(page.getByRole("status")).toHaveText("Email copied.");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "camara.sean13@gmail.com",
  );
  await page.reload();
  await page.evaluate(() => {
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: () => Promise.reject(new Error("Denied")) },
      configurable: true,
    });
  });
  await page.getByRole("button", { name: "Copy email", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("Couldn’t copy.");
  await expect(page.locator(".contact-email")).toHaveAttribute(
    "href",
    "mailto:camara.sean13@gmail.com",
  );
});
test("school experience dialog restores focus and scrolling", async ({
  page,
}) => {
  const opener = page.getByRole("button", {
    name: "View Student Council school experience",
  });
  await opener.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
  await expect(opener).toBeFocused();
});
test("keyboard skip link and reduced motion keep content accessible", async ({
  page,
}) => {
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
  expect(await page.evaluate(() => document.getAnimations().length)).toBe(0);
  await expect(page.locator(".intro-screen")).toHaveCount(0);
});
for (const viewport of [
  { width: 320, height: 740 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1440, height: 1000 },
  { width: 844, height: 390 },
]) {
  test(
    "responsive reflow " + viewport.width + "×" + viewport.height,
    async ({ page }) => {
      await page.setViewportSize(viewport);
      for (const route of ["/", "/work/rmv/"]) {
        await page.goto(route);
        await expect
          .poll(() =>
            page.evaluate(
              () => document.documentElement.scrollWidth <= window.innerWidth,
            ),
          )
          .toBe(true);
        const overflow = await page
          .locator("h1,h2,h3,p")
          .evaluateAll((elements) =>
            elements
              .filter((el) => {
                const r = el.getBoundingClientRect();
                return r.width > 0 && (r.right > innerWidth + 1 || r.left < -1);
              })
              .map((el) => el.textContent),
          );
        expect(overflow).toEqual([]);
      }
    },
  );
}
test("all pages prerender useful content without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  for (const route of ["/", ...slugs.map((slug) => "/work/" + slug + "/")]) {
    await page.goto("http://127.0.0.1:4180" + route);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    if (route !== "/") await expect(page.locator(".case-story")).toBeVisible();
    await expect(page.locator(".contact-email")).toBeVisible();
  }
  await page.goto("http://127.0.0.1:4180/");
  await page.locator(".mobile-menu summary").click();
  await expect(page.locator(".mobile-panel")).toBeVisible();
  await context.close();
});
test("media failure shows an honest fallback", async ({ page }) => {
  await page.route("**/assets/aghimuan-creatives-showcase.webp", (route) =>
    route.abort(),
  );
  await page.reload();
  await page.locator("#project-aghimuan").scrollIntoViewIfNeeded();
  await expect(page.locator("#project-aghimuan .media-unavailable")).toContainText(
    "Image unavailable",
  );
  await expect(
    page.getByRole("link", { name: "View selected work" }),
  ).toBeVisible();
});
test("@a11y homepage, menu, and all case studies have no WCAG A/AA violations", async ({
  page,
}) => {
  for (const path of ["/", ...slugs.map((slug) => "/work/" + slug + "/")]) {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations, path).toEqual([]);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator(".mobile-menu summary").click();
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
});
test("production browser smoke and visual evidence", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.reload();
  for (const image of await page.locator("img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        image.evaluate(
          (el: HTMLImageElement) => el.complete && el.naturalWidth > 0,
        ),
      )
      .toBe(true);
  }
  for (const id of [
    "home",
    "projects",
    "project-yhans",
    "project-rmv",
    "project-index",
    "skills",
    "about",
    "experience",
    "education",
    "certifications",
    "contact",
  ]) {
    const section = page.locator("#" + id);
    await section.scrollIntoViewIfNeeded();
    await section.screenshot({
      path: "output/playwright/redesign/desktop-" + id + ".png",
      animations: "disabled",
    });
  }
  await page.evaluate(() => scrollTo(0, 0));
  await page.screenshot({
    path: "output/playwright/redesign/after-full-desktop.png",
    fullPage: true,
    animations: "disabled",
  });
  await page.screenshot({
    path: "output/playwright/redesign/after-desktop.png",
    animations: "disabled",
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload();
  for (const image of await page.locator("img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        image.evaluate(
          (el: HTMLImageElement) => el.complete && el.naturalWidth > 0,
        ),
      )
      .toBe(true);
  }
  await page.evaluate(() => scrollTo(0, 0));
  await page.screenshot({
    path: "output/playwright/redesign/after-mobile.png",
    animations: "disabled",
  });
  await page.screenshot({
    path: "output/playwright/redesign/after-full-mobile.png",
    fullPage: true,
    animations: "disabled",
  });
  await page.locator(".mobile-menu summary").click();
  await page.screenshot({
    path: "output/playwright/redesign/mobile-menu.png",
    animations: "disabled",
  });
  await page.keyboard.press("Escape");
  for (const slug of slugs.slice(0, 3)) {
    await page.goto("/work/" + slug + "/");
    await page.screenshot({
      path: "output/playwright/redesign/mobile-case-" + slug + ".png",
      animations: "disabled",
    });
  }
  expect(errors).toEqual([]);
});
