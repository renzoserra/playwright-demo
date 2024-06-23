import { test, expect } from '@playwright/test';
import { webtable } from '../pages/cosmocode/WebTable';

test.beforeEach('Open Browser', async ({page})=>{
    await page.setViewportSize({
      width: 1280,
      height: 720,
    });
    await page.goto('https://cosmocode.io/automation-practice-webtable/');
  })
  test.afterEach('Close browser',async ({page})=>{
    await page.close();
  })

test('Get the countries that speak Spanish', async ({page})=>{
    const webTable = new webtable(page);
    await webTable.validateTitleMain('Automation Practice | WebTable');
    await webTable.validateSubTitleMain('List of Countries, Capitals, Currencies and Languages');
    await webTable.validateRowsTable();
    await webTable.showResultRowsTable();
})