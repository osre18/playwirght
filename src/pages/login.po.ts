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

  async waitForTitle() {
    await this.titulo.waitFor({state: 'visible', timeout: 5000});
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
