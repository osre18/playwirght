import { expect, type Page } from '@playwright/test';

export class Kart {
  constructor(private readonly page: Page) {}

  // Locators

  get itemQuantity() {
    return this.page.locator('//div[@class="cart_quantity" and @data-test="item-quantity"]');
  }

  async waitForItemQuantity() {
    await this.itemQuantity.waitFor({ state: 'visible', timeout: 5000 });
}
}
