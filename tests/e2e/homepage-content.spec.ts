import { expect, test } from "@playwright/test";

test("homepage guidance supports touch, keyboard, and narrow layouts", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  const startingPoint = page.getByRole("region", {
    name: "What’s getting in the way?",
    exact: true,
  });
  const beforeWeBegin = page.getByRole("region", {
    name: "A little clarity before we talk.",
    exact: true,
  });
  const choices = startingPoint.getByRole("tab");
  const servicePaths = [
    "ai-business-automation",
    "web-development",
    "branding-design",
  ];

  for (const width of [320, 375, 430, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (let index = 0; index < servicePaths.length; index++) {
      if (isMobile) await choices.nth(index).tap();
      else await choices.nth(index).click();
      await expect(choices.nth(index)).toHaveAttribute("aria-selected", "true");
      const panel = startingPoint.getByRole("tabpanel");
      await expect(panel).toHaveCount(1);
      await expect(panel.getByRole("link")).toHaveAttribute(
        "href",
        `/services/${servicePaths[index]}`,
      );
      const bounds = await panel.boundingBox();
      expect(bounds!.x).toBeGreaterThanOrEqual(0);
      expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    }
    await expect(beforeWeBegin.locator("dt")).toHaveCount(4);
    for (const answer of await beforeWeBegin.locator("dd").all())
      await expect(answer).toBeVisible();

    await choices.first().click();
    if (process.env.CONTENT_CAPTURE_DIR && [320, 768, 1440].includes(width)) {
      await page.evaluate(() => document.fonts.ready);
      for (const section of [startingPoint, beforeWeBegin]) {
        await section.screenshot({
          path: `${process.env.CONTENT_CAPTURE_DIR}/${await section.getAttribute("id")}-${width}.png`,
          style:
            "nav[aria-label='Main navigation'], body > a { visibility: hidden; }",
        });
      }
    }
  }

  await choices.first().focus();
  await page.keyboard.press("ArrowDown");
  await expect(choices.nth(1)).toBeFocused();
  await expect(choices.nth(1)).toHaveAttribute("aria-selected", "true");
  await page.keyboard.press("End");
  await expect(choices.last()).toBeFocused();
  await page.keyboard.press("ArrowDown");
  await expect(choices.first()).toBeFocused();
  await page.keyboard.press("ArrowUp");
  await expect(choices.last()).toBeFocused();
  await page.keyboard.press("Home");
  await expect(choices.first()).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(startingPoint.getByRole("tabpanel")).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    startingPoint.getByRole("tabpanel").getByRole("link"),
  ).toBeFocused();
});
