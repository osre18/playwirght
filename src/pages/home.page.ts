import { expect, type Page } from '@playwright/test';

export class HomePage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto('/');
  }

  async assertTitleContains(text: string) {
    await expect(this.page).toHaveTitle(new RegExp(text, 'i'));
  }

  async openGetStarted() {
    await this.page.getByRole('link', { name: 'Get started' }).first().click();
  }

  async assertDocsHeadingVisible() {
    await expect(
      this.page.getByRole('heading', { name: /Installing Playwright/i })
    ).toBeVisible();
  }
}
