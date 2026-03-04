import { expect, type Page } from "@playwright/test";

/**
 * Page object representing the application's home/products page.
 * Encapsulates locators and actions/assertions related to the products view
 * that appears after a successful login.
 */
export class HomePage {
  constructor(private readonly page: Page) {}

  // Locators
  get productsTitle() {
    return this.page.locator(".title");
  }
  get addToKartButtonOrangeSweater() {
    //Elementos donde los nombras y tienes el locator Es mas tedioso y no tiene buena parctica
    return this.page.locator(
      '//button[@id="add-to-cart-test.allthethings()-t-shirt-(red)"]',
    );
  }
  get shoppingKart() {
    return this.page.locator(".shopping_cart_container");
  }
  async addItemToCartButton(item: string) {
    //Locator dinamico con buena practica haciendo llamar el parametro
    return this.page.locator(
      `//div[@class="inventory_item_name " and contains(text(), "${item}")]/ancestor::div[@class="inventory_item_description"]//button`,
    );
  }

  async removeButton(item: string) {
    return this.page.locator(
      `//div[@class="inventory_item_name " and contains(text(), "${item}")]/ancestor::div[@class="inventory_item_description"]//button[text()= "Remove"]`,
    );
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
    await this.productsTitle.waitFor({ state: "visible", timeout: 5000 });
  }

  async waitForRemoveButton(product: string) {
    const removeButton = await this.removeButton(product);
    await removeButton.waitFor({ state: "visible", timeout: 2000 });
  }

  //actions
  async clickOnAddToCartButton(item: string) {
    const button = await this.addItemToCartButton(item);
    await button.click();
  }

  async clickOnRemoveButton(item: string) {
    const button = await this.removeButton(item);
    await button.click();
  }

  async addToKartOrangeSwater() {
    await this.addToKartButtonOrangeSweater.click();
    await this.shoppingKart.waitFor({ state: "visible", timeout: 2000 });
  }

  async clickOnKart() {
    await this.shoppingKart.click();
  }

  async addItemToCart(product: string) {
    await this.clickOnAddToCartButton(product);
    //despues de hacer click esperar a que e botton cambie
    await this.waitForRemoveButton(product);
  }
}
