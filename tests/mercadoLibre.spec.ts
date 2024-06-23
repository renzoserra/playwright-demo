import { test, expect } from '@playwright/test';



test.beforeEach('Open Browser', async ({page})=>{
  await page.setViewportSize({
    width: 1280,
    height: 720,
  });
  await page.goto('https://www.mercadolibre.cl/');

})
test.afterEach('Close browser',async ({page})=>{
  await page.close();
})

test('search elements in MercadoLibre and List', async ({ page }) => {
  await page.locator('#cb1-edit').fill('iphone');
  await page.keyboard.press('Enter');
  await expect(page.locator('//ol[contains(@class, "ui-search-layout")]')).toBeVisible();
 
  const titles = await page.locator('//ol[contains(@class, "ui-search-layout")]//li//h2').allInnerTexts();

  console.log('The total number of titles is: '+ titles.length);


  titles.forEach((title, index) => {
    console.log(`${index + 1}) The title is: ${title}`);
  });

});