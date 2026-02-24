import { expect, test } from "@playwright/test";
import { Login } from "@pages/login.po";
import { HomePage } from "@pages/home.page.po";

test.describe("Login page", () => {
  let loginPage: Login;
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    loginPage = new Login(page);
    homePage = new HomePage(page);
    await loginPage.waitForTitle();
  });

  test("@smoke should login with valid credentials", async () => {
    await loginPage.login("standard_user", "secret_sauce");
    await homePage.waitForTitle();
    await expect(homePage.productsTitle).toHaveText("Products");
  });

  test("@smoke should NOT login with invalid credentials", async () => {
    await loginPage.login("standard_user", "wrong_password");
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorUser).toBeVisible();
    await expect(loginPage.errorPass).toBeVisible();
  });
});
