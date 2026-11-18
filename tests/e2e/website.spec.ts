import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
const prerendered = Object.keys(
  JSON.parse(
    readFileSync(join(process.cwd(), ".next/prerender-manifest.json"), "utf8"),
  ).routes,
);

const paths = [
  "/",
  "/services",
  "/work",
  "/blog",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms-of-service",
  ...prerendered.filter((path) => !path.startsWith("/_")),
];
test("every content route renders one heading without horizontal overflow", async ({
  page,
}) => {
  for (const path of paths) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  const response = await page.goto("/blog/not-a-real-article");
  expect(response?.status()).toBe(404);
});
test("filters select matching content and announce the result", async ({
  page,
}) => {
  await page.goto("/work");
  await page
    .getByRole("button", { name: "Hospitality & Travel", exact: true })
    .click();
  await expect(page.getByRole("status")).toHaveText(
    "1 project in Hospitality & Travel",
  );
  await expect(
    page.getByRole("button", { name: "Hospitality & Travel", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.goto("/blog");
  await page.getByRole("button", { name: "SEO", exact: true }).click();
  await expect(page.getByRole("status")).toHaveText("1 article about SEO");
});
test("contact preselects a service and validates locally without transmitting data", async ({
  page,
}) => {
  let submissions = 0;
  page.on("request", (r) => {
    if (r.method() === "POST" && r.url().includes("/api/contact"))
      submissions++;
  });
  await page.goto("/contact?service=web-development");
  await expect(
    page.getByRole("checkbox", { name: "Web Development", exact: true }),
  ).toBeChecked();
  await page.locator("form button[type=submit]").click();
  await expect(page.getByLabel("Full name *", { exact: true })).toBeFocused();
  await expect(
    page.getByText("Please enter your name.", { exact: true }),
  ).toBeVisible();
  expect(submissions).toBe(0);
});
test("navigation disclosures close on Escape and restore focus", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  const trigger = page.getByRole("button", {
    name: isMobile ? /^(Open|Close) menu$/ : "Explore services",
    exact: true,
  });
  if (!isMobile) {
    const navigation = page.getByRole("navigation", {
      name: "Main navigation",
      exact: true,
    });
    const menu = page.locator("#services-menu");
    await navigation
      .getByRole("link", { name: "Services", exact: true })
      .hover();
    await expect(menu).toBeVisible();
    await menu.getByRole("link").first().hover();
    await expect(menu).toBeVisible();
    await navigation.getByRole("link", { name: "Work", exact: true }).hover();
    await expect(menu).toBeHidden();
  }
  if (isMobile)
    await expect(
      page
        .getByRole("navigation", { name: "Main navigation", exact: true })
        .getByRole("link", { name: "Start a project", exact: true }),
    ).toBeHidden();
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(trigger).toBeFocused();
});
