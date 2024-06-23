import { expect, Locator, Page } from "@playwright/test";

export class CheckoutStepTwo {

    private readonly buttonFinish: Locator;
    
    constructor(page: Page) {

        this.buttonFinish = page.getByRole('button', {name:'Finish'});
    }

    async handleButtonFinish(shouldClick: boolean, expectedText?: string) {
        await expect(this.buttonFinish).toBeVisible();

        if (expectedText) {
            const buttonText = await this.buttonFinish.innerText();
            await expect(buttonText).toBe(expectedText);
        }

        if (shouldClick) {
            await this.buttonFinish.click();
        }
    }
}