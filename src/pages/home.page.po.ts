import { expect, type Page } from '@playwright/test';

/**
 * Page object representing the application's home/products page.
 * Encapsulates locators and actions/assertions related to the products view
 * that appears after a successful login.
 */
export class HomePage {
  constructor(private readonly page: Page) {}

  // Locators
  get productsTitle() {
    return this.page.locator('.title');
  }

  /**
   * Waits for the products page title to be visible.
   *
   * Behavior:
   *  - waits up to 5000ms for the `.title` locator to be visible
   *
   * Usage:
   *  - call this after performing a login or navigation that should land on
   *    the products/home page to ensure the page is ready for assertions.
   *
   * Throws on timeout if the element does not become visible.
   */
  async waitForTitle() {
    await this.productsTitle.waitFor({ state: 'visible', timeout: 5000 });
  }

}
