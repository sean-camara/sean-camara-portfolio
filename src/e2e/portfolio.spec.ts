import { existsSync } from "node:fs";
import { resolve } from "node:path";
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
});

test("portfolio loads with its heading and projects", async ({ page }) => {
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator("#projects")).toBeVisible();
});

test("mobile navigation opens and closes", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Open navigation menu" }).click();
  await expect(page.getByRole("link", { name: "Projects", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Close navigation menu" }).click();
  await expect(page.getByRole("button", { name: "Open navigation menu" })).toBeVisible();
});

test("case study dialog supports close, focus restoration, and navigation", async ({ page }) => {
  const opener = page.getByRole("button", { name: "View RMV Stainless Steel Fabrication case study" });
  await opener.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("heading", { name: "RMV Stainless Steel Fabrication" })).toBeVisible();

  await dialog.getByRole("button", { name: "Next project" }).click();
  await expect(dialog.getByRole("heading", { name: "AcademiaZen" })).toBeVisible();
  await dialog.getByRole("button", { name: "Previous project" }).click();
  await expect(dialog.getByRole("heading", { name: "RMV Stainless Steel Fabrication" })).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(opener).toBeFocused();
});

test("resume points to an existing PDF and links avoid placeholder destinations", async ({ page }) => {
  const resume = page.locator('a[href="/Sean_John_Camara_Resume.pdf"]');
  await expect(resume).toHaveAttribute("href", "/Sean_John_Camara_Resume.pdf");
  expect(existsSync(resolve(process.cwd(), "public/Sean_John_Camara_Resume.pdf"))).toBe(true);
  await expect(page.locator('a[href="#"]')).toHaveCount(0);
});

test("reduced motion leaves main content visible", async ({ page }) => {
  await expect(page.locator("main")).toBeVisible();
  await expect(page.locator(".intro-screen")).toHaveCount(0);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("mobile and tablet widths have no horizontal overflow", async ({ page }) => {
  for (const viewport of [
    { width: 360, height: 800 },
    { width: 390, height: 844 },
    { width: 430, height: 932 },
    { width: 768, height: 1024 },
  ]) {
    await page.setViewportSize(viewport);
    await page.reload();
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
});

test("@a11y home page and case-study dialog have no serious violations", async ({ page }) => {
  const homeResults = await new AxeBuilder({ page }).analyze();
  expect(homeResults.violations.filter(({ impact }) => impact === "serious" || impact === "critical")).toEqual([]);

  await page.getByRole("button", { name: "View RMV Stainless Steel Fabrication case study" }).click();
  const dialogResults = await new AxeBuilder({ page }).include(".project-modal").analyze();
  expect(dialogResults.violations.filter(({ impact }) => impact === "serious" || impact === "critical")).toEqual([]);
});
