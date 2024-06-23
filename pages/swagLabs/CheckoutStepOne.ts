import { expect, Locator, Page } from "@playwright/test";
import exp from "constants";

export class CheckoutStepOne {

    private readonly buttonContinue: Locator;
    private readonly inputFirstName:Locator;
    private readonly inputLastName:Locator;
    private readonly inputZipCode:Locator;

    constructor(page: Page) {
        this.buttonContinue = page.getByRole('button', {name:'Continue'});
        this.inputFirstName = page.getByRole('textbox', {name:'First Name'});
        this.inputLastName = page.getByRole('textbox', {name:'Last Name'});
        this.inputZipCode = page.getByRole('textbox', {name:'Zip/Postal Code'});
    }

    async handleButtonContinue(shouldClick: boolean, expectedText?: string) {
        await expect(this.buttonContinue).toBeVisible();

        if (expectedText) {
            const buttonText = await this.buttonContinue.getAttribute('value');
            await expect(buttonText).toBe(expectedText);
        }

        if (shouldClick) {
            await this.buttonContinue.click();
        }
    }

    async fillFirtsName(txtName: string){
        await this.inputFirstName.pressSequentially(txtName,{delay:100});
    }

    async fillLastName(txtLastName: string){
        await this.inputLastName.pressSequentially(txtLastName,{delay:100});
    }

    async fillZipCode(txtZipCode:string){
        await this.inputZipCode.pressSequentially(txtZipCode,{delay:100});
    }
}