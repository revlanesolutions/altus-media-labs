import { expect, test } from "@playwright/test";

const heroIds = ["hero-work"];

test("main hero remains readable with its editorial alternative retained but hidden", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("#hero-original")).toHaveCount(0);
  await expect(page.locator("#hero-systems")).toHaveCount(0);
  await expect(page.locator('section[id$="-dark"]')).toHaveCount(0);
  const ids = await page
    .locator("[id]")
    .evaluateAll((elements) => elements.map((element) => element.id));
  expect(new Set(ids).size).toBe(ids.length);
  await expect(page.locator("#main-content > section").first()).toHaveAttribute(
    "id",
    "hero-work",
  );
  await expect(page.locator("#hero-work h1")).toHaveCount(1);
  await expect(page.locator("#main-content > section").nth(1)).toHaveAttribute(
    "id",
    "hero-editorial",
  );
  await expect(
    page.locator("#hero-editorial h2#editorial-hero-title"),
  ).toHaveCount(1);
  await expect(page.locator("#hero-editorial")).toBeHidden();
  for (const width of [320, 375, 430, 600, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    for (const id of heroIds) {
      const hero = page.locator(`#${id}`);
      await expect(hero).toBeVisible();
      for (const image of await hero.locator("img").all()) {
        if (!(await image.isVisible())) continue;
        await image.scrollIntoViewIfNeeded();
        await expect
          .poll(() =>
            image.evaluate(
              (element) =>
                (element as HTMLImageElement).complete &&
                (element as HTMLImageElement).naturalWidth > 0,
            ),
          )
          .toBe(true);
      }
      await expect(
        hero.getByRole("link", { name: "Discuss your project", exact: true }),
      ).toHaveAttribute("href", "/contact");
      await expect(
        hero.getByRole("link", { name: "Explore our work", exact: true }),
      ).toHaveAttribute("href", "/work");
      if (id.startsWith("hero-work")) {
        const action = await hero
          .getByRole("link", { name: "Discuss your project", exact: true })
          .boundingBox();
        const firstImage = await hero.locator("img").first().boundingBox();
        expect(action!.y + action!.height).toBeLessThan(firstImage!.y);
      }
      if (process.env.HERO_CAPTURE_DIR) {
        await hero.screenshot({
          path: `${process.env.HERO_CAPTURE_DIR}/${id}-${width}.png`,
          style:
            "nav[aria-label='Main navigation'], body > a { visibility: hidden; }",
        });
      }
    }
  }
});
