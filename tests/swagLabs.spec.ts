import { test, expect, TestInfo } from '@playwright/test';
import { LoginPage } from '../pages/swagLabs/LoginPage';
import { InventoryPage } from '../pages/swagLabs/InventoryPage';
import { ScreenShotsUtils } from '../Utils/ScreenShotUtils';
import { ShoppingCartPage } from '../pages/swagLabs/ShoppingCartPage';
import { CheckoutStepOne } from '../pages/swagLabs/CheckoutStepOne';
import { CheckoutStepTwo } from '../pages/swagLabs/CheckoutStepTwo';
import { CheckoutComplete } from '../pages/swagLabs/CheckoutComplete';



test.beforeEach('Open Browser', async ({page})=>{
  await page.setViewportSize({
    width: 1280,
    height: 720,
  });
  console.log(`Navigating to URL: https://www.saucedemo.com/`);
  await page.goto('https://www.saucedemo.com/');
})
test.afterEach('Close browser',async ({page})=>{
  await page.close();
})

test('login success', async ({ page, }, testInfo: TestInfo) => {
  const loginPage = new LoginPage(page);
  const utils = new ScreenShotsUtils(page,testInfo);
  await utils.takeScreenshotWithoutLocator('Before Login');
  await loginPage.loginWithCredencials('standard_user','secret_sauce');
  await expect(page.locator('[data-test="title"]')).toBeVisible();
  await utils.takeScreenshotWithLocator('After Login',page.locator('[data-test="title"]'))
});


test('Add item to shopping cart',{tag:['@SwagLabs', '@CriticalPath', '@SmokeTest']}, async ({ page }, testInfo:TestInfo) => {
 
  const utils = new ScreenShotsUtils(page,testInfo);
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage (page);
  const shoppingCartPage = new ShoppingCartPage(page);
  const checkoutStepOne = new CheckoutStepOne(page);
  const checkoutStepTwo = new CheckoutStepTwo(page);
  const checkoutComplete = new CheckoutComplete(page);

  await test.step('Login as standard user', async ()=>{
    await loginPage.loginWithCredencials('standard_user','secret_sauce');
    await utils.takeScreenshotWithoutLocator('Inventory');
  })
  await test.step('Add random item to cart', async ()=>{
    await inventoryPage.validateVisibleSpanProducts();
    await inventoryPage.addRandomItemToCart();
    await inventoryPage.clickButtonShoppingCart();
  })
  await test.step('Validate and process to checkout',async ()=>{
    await shoppingCartPage.visualizeButtonCheckout();
    await shoppingCartPage.validateItemAdded();
    await utils.takeScreenshotWithoutLocator('Shopping Cart');
    await shoppingCartPage.clickOnButtonCheckout();
  })
  await test.step('Complete checkout step one',async ()=>{
    await checkoutStepOne.handleButtonContinue(false);
    await checkoutStepOne.fillFirtsName('Renzo');
    await checkoutStepOne.fillLastName('Serra');
    await checkoutStepOne.fillZipCode('210000');
    await utils.takeScreenshotWithoutLocator('Checkout Step One');
    await checkoutStepOne.handleButtonContinue(true,'Continue');
  })
  await test.step('Complete checkout step two',async ()=>{
    await checkoutStepTwo.handleButtonFinish(false);
    await utils.takeScreenshotWithoutLocator('Checkout Step Two');
    await checkoutStepTwo.handleButtonFinish(true,'Finish');
  })
  await test.step('Validate order completion',async ()=>{
    await checkoutComplete.validateHeaderCompleteOrder('Thank you for your order!');
    await utils.takeScreenshotWithoutLocator('Checkout Complete');
  })
});

