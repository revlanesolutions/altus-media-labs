import { expect, test } from "@playwright/test";

test("homepage navigation blends into the hero and stays readable after scrolling", async ({
  page,
}) => {
  await page.goto("/");
  const navigation = page.getByRole("navigation", {
    name: "Main navigation",
    exact: true,
  });
  for (const width of [320, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(navigation).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
    await expect(navigation).toHaveCSS("backdrop-filter", "none");
    await expect(navigation).toHaveCSS(
      "border-bottom-color",
      "rgba(0, 0, 0, 0)",
    );
    const header = await navigation.boundingBox();
    const heading = await page.locator("#hero-work h1").boundingBox();
    expect(heading!.y).toBeGreaterThanOrEqual(header!.y + header!.height);
    const headerContainer = await navigation
      .locator(".site-container")
      .boundingBox();
    const heroContainer = await page
      .locator("#hero-work > .site-container")
      .boundingBox();
    expect(Math.abs(headerContainer!.x - heroContainer!.x)).toBeLessThan(1);
    if (process.env.NAV_CAPTURE_DIR) {
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({
        path: `${process.env.NAV_CAPTURE_DIR}/homepage-${width}.png`,
        style: "body > a { visibility: hidden; }",
      });
    }
    await page.evaluate(() => window.scrollTo(0, 160));
    await expect(navigation).toHaveCSS(
      "background-color",
      /(?:,\s*|\/\s*)0\.8\)/,
    );
    await expect(navigation).toHaveCSS("backdrop-filter", "blur(12px)");
    await expect(navigation).toHaveCSS(
      "border-bottom-color",
      "rgb(206, 202, 202)",
    );
    expect((await navigation.boundingBox())!.height).toBe(header!.height);
  }
  await page.setViewportSize({ width: 320, height: 1000 });
  await page.evaluate(() => window.scrollTo(0, 0));
  const toggle = page.getByRole("button", { name: "Open menu", exact: true });
  await toggle.click();
  await expect(navigation).toHaveCSS("background-color", "rgb(246, 243, 241)");
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await expect(navigation).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await page.goto("/about");
  await expect(navigation).toHaveCSS("background-color", "rgb(246, 243, 241)");
  await expect(navigation).toHaveCSS(
    "border-bottom-color",
    "rgb(206, 202, 202)",
  );
});
