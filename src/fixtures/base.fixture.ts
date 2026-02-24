import { test as base } from '@playwright/test';
import { HomePage } from '../pages/home.page.po';

type Pages = {
  homePage: HomePage;
};

export const test = base.extend<Pages>({
  homePage: async ({ page }, use) => {
  // Navega a la página base (usa baseURL configurada en playwright.config.ts)
  await page.goto('/');
  await use(new HomePage(page));
  },
});

export { expect } from '@playwright/test';
