import { expect, test, type Page } from "@playwright/test";
import { Login } from "@pages/login.po";
import { HomePage } from "@pages/home.page.po";
import { Kart } from "@pages/kart.po";

test.describe("Login page", () => {
  let loginPage: Login;
  let homePage: HomePage;
  let kartPage: Kart;

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    loginPage = new Login(page);
    homePage = new HomePage(page);
    kartPage = new Kart(page);
    await loginPage.waitForTitle();
  });

  const items = [
    "Backpack",
    "Bike Light",
    "Bolt T-Shirt",
    "Fleece Jacket",
    "Onesie",
    "Red",
  ];

  const removeItems = ["Red", "Onesie"];

  test("@smoke should login with valid credentials", async () => {
    //login to the app
    await loginPage.login("standard_user", "secret_sauce");
    //wait for products to be displayed
    await homePage.waitForTitle();
    //validate that the tittle text is Products
    await expect(homePage.productsTitle).toHaveText("Products");
    //click on addToKartButton
    await homePage.addToKartOrangeSwater();
    //wait for item quantity to be updated
    await homePage.clickOnKart();
    await kartPage.waitForItemQuantity();
    //validate that the item quantity is 1
    await expect(kartPage.itemQuantity).toHaveText("1");
  });

  test.only("@smoke add multiple items to cart", async ({ page }) => {
    //login to the app
    await loginPage.login("standard_user", "secret_sauce");
    //wait for products to be displayed
    await homePage.waitForTitle();
    //validate that the tittle text is Products
    await expect(homePage.productsTitle).toHaveText("Products");
    //click on addToKartButton
    for (const item of items) {
      await homePage.clickOnAddToCartButton(item);
      const removeButton = await homePage.removeButton(item);
      await expect(removeButton).toBeVisible();
    }
    //click on remove button for removeItems
    //Identicar remove button
    //Para darle click en el remove button. removeButton
    //validar Add to cart
    for (const item of removeItems) {
      const removeButton = await homePage.removeButton(item);
      await expect(removeButton).toBeVisible();
      await homePage.clickOnRemoveButton(item);
      await expect(await homePage.removeButton(item)).not.toBeVisible();
    }
  });
});
