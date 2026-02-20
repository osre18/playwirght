import { expect, test } from '../../fixtures/base.fixture';

test.describe('Home page', () => {
  test('@smoke should open docs from home', async ({ homePage, page }) => {
    await homePage.goto();
    await homePage.assertTitleContains('Playwright');
    await homePage.openGetStarted();
    await expect(page).toHaveURL(/.*docs.*/);
    await homePage.assertDocsHeadingVisible();
  });
});
