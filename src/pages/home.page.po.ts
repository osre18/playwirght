import { expect, type Page } from '@playwright/test';

export class HomePage {
  constructor(private readonly page: Page) {}

  //Locators
  get productsTitle() {
    return this.page.locator('.title');
  }
 

  //Metodos

  async waitForTitle() {
    await this.productsTitle.waitFor({state: 'visible', timeout: 5000});
  }

}
