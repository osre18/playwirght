import { expect, type Page } from '@playwright/test';

export class Login {
  constructor(private readonly page: Page) {}

  //Locators
  get titulo() {
  return this.page.locator('.login_logo');
  }
  get usernameInput() {
    return this.page.locator('#user-name');
  }
  get passwordInput() {
    return this.page.locator('#password');
  }
  get submitButton() {
    return this.page.locator('#login-button');
  }

//Errores
  get errorMessage() {
    return this.page.locator('.error-button');
  }
  get errorUser() {
    return this.page.locator('//input[@class="input_error form_input error" and @id="user-name"]');
  }
  get errorPass() {
    return this.page.locator('//input[@class="input_error form_input error" and @id="password"]');
  }


  //Metodos

  /**
   * Waits for the login page title/logo to be visible.
   * This should be called before interacting with the login form
   * to ensure the page has loaded and the relevant elements are present.
   *
   * Behavior:
   *  - waits up to 5000ms for the `.login_logo` locator to become visible
   *
   * Throws on timeout if the element doesn't become visible.
   */
  async waitForTitle() {
    await this.titulo.waitFor({state: 'visible', timeout: 5000});
  }

  /**
   * Perform login using the provided credentials.
   *
   * Steps performed:
   *  1. Fill the username input (`#user-name`).
   *  2. Fill the password input (`#password`).
   *  3. Click the submit button (`#login-button`).
   *
   * Notes:
   *  - Assumes the page is already on the login screen and inputs are visible.
   *  - Does not perform any additional waiting after the click; callers
   *    should wait for navigation or a page-specific signal (e.g. home title)
   *    if they expect a transition.
   *
   * @param username - login username to use
   * @param password - login password to use
   */
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
