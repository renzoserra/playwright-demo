import { expect, Locator, Page } from "@playwright/test";

 export class InventoryPage {

    private readonly spanProducts: Locator;
    private readonly listProductsInventory: Locator;
    private readonly buttonShoppingCart: Locator;
    static expectedDescription: string;
    static expectedName: string;
    static expectedPrice: string;

    constructor(page: Page) {
        this.spanProducts = page.locator('[data-test="title"]');
        this.listProductsInventory = page.locator('#inventory_container .inventory_item');
        this.buttonShoppingCart = page.locator('.shopping_cart_link');
    }

    
    async validateVisibleSpanProducts(){
        await expect(this.spanProducts).toBeVisible();
    }


    async addRandomItemToCart(){
        const itemsContainer = await this.listProductsInventory.all();

        const randomIndex = Math.floor(Math.random() * itemsContainer.length);

        const randomItem = itemsContainer[randomIndex];
      
        InventoryPage.expectedDescription =  await randomItem.locator('.inventory_item_desc').innerText();
        InventoryPage.expectedName =  await randomItem.locator('.inventory_item_name ').innerText();
        InventoryPage.expectedPrice =  await randomItem.locator('.inventory_item_price').innerText();
      
        console.log(`Name: ${InventoryPage.expectedName} Description: ${InventoryPage.expectedDescription}Price: ${InventoryPage.expectedPrice}`);
        await randomItem.getByRole('button', {name: 'Add to cart'}).click();

    }

    async clickButtonShoppingCart(){
        await this.buttonShoppingCart.click();
    }


}