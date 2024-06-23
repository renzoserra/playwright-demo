import { expect, Locator, Page } from "@playwright/test";
import exp from "constants";
import { InventoryPage } from "./InventoryPage";


export class ShoppingCartPage {

    private readonly buttonCheckout: Locator;
    private readonly nameProduct: Locator;
    private readonly descriptionProduct: Locator;
    private readonly priceProduct: Locator;

    constructor(page:Page) {
        this.buttonCheckout = page.getByRole('button', {name:'Checkout'});
        this.nameProduct = page.locator('.inventory_item_name');
        this.descriptionProduct = page.locator('.inventory_item_desc');
        this.priceProduct = page.locator('.inventory_item_price');
    }


    async visualizeButtonCheckout(){
        await expect(this.buttonCheckout).toBeVisible();


//  await page.getByRole('button', {name:'Checkout'}).click();
    }

    async validateItemAdded(){
        await expect(await this.nameProduct.innerText()).toEqual(InventoryPage.expectedName);
        await expect(await this.descriptionProduct.innerText()).toEqual(InventoryPage.expectedDescription);
        await expect(await this.priceProduct.innerText()).toEqual(InventoryPage.expectedPrice);
        console.log('Validated fields of product added')
    }

    async clickOnButtonCheckout(){
        await this.buttonCheckout.click();
    }
}