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
  /**
   * @test: @smoke should login with valid credentials
   * Purpose: Verify that a user with valid credentials can successfully log in
   * Steps:
   *  1. Fill username and password with valid credentials
   *  2. Click the login button
   *  3. Wait for the home/products page to appear
   * Expected result: The products page title is visible and equals 'Products'.
   */
  await loginPage.login("standard_user", "secret_sauce"); //Parametros
  await homePage.waitForTitle();
  await expect(homePage.productsTitle).toHaveText("Products");
  });

  test("@smoke should NOT login with invalid credentials", async () => {
  /**
   * @test: @smoke should NOT login with invalid credential
   * Purpose: Ensure the application shows appropriate error indicators
   * when login is attempted with invalid credentials.
   * Steps:
   *  1. Fill username with a valid user and an incorrect password
   *  2. Click the login button
   * Expected result: Error message and input-level error indicators are visible
   * (error message element and the username/password inputs in error state).
   */
  await loginPage.login("standard_user", "wrong_password");
  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorUser).toBeVisible();
  await expect(loginPage.errorPass).toBeVisible();
  });
});
