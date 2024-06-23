import { Locator, Page } from "@playwright/test";

export class LoginPage{

    private readonly usernameTextBox: Locator;
    private readonly passwordTextBox: Locator;
    private readonly loginButton: Locator;

    constructor(page: Page){
        this.usernameTextBox = page.locator('#user-name');
        this.passwordTextBox = page.locator('#password');
        this.loginButton = page.locator('#login-button');
    }

    async fillUsername(username:string){
        await this.usernameTextBox.fill(username);
    }

    async fillPassword(password:string){
        await this.passwordTextBox.fill(password);
    }

    async clickOnLogin(){
        await this.loginButton.click();
    }

    async loginWithCredencials(username:string, password:string){
        await this.usernameTextBox.fill(username);
        await this.passwordTextBox.fill(password);
        await this.loginButton.click();
    }

}