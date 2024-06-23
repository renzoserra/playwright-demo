import { expect, Locator, Page } from "@playwright/test";
import { ScreenShotsUtils } from "../../Utils/ScreenShotUtils";


export class CheckoutComplete {

    private readonly headerCompleteOrder: Locator;

    constructor(page: Page) {
        this.headerCompleteOrder = page.getByRole('heading', {name:'Thank you for your order!'});
    }

    async validateHeaderCompleteOrder(txtExpected?:string){
        await expect(this.headerCompleteOrder).toBeVisible();
        if(txtExpected){
            const txtActual = await this.headerCompleteOrder.innerText();
            await expect(txtActual).toBe(txtExpected);
        }
    }

}