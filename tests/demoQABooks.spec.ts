import test, { expect, TestInfo } from "@playwright/test";
import { url } from "inspector";
import { Books } from "../pages/demoQA/books/Books";
import { ScreenShotsUtils } from "../Utils/ScreenShotUtils";
import exp from "constants";

test.afterEach("Close browser", async ({ page }) => {
  await page.close();
});

test("Validate get list books", async ({ page }, testInfo:TestInfo) => {
  await page.setViewportSize({
    width: 1280,
    height: 720,
  });
  console.log(`Navigating to URL: https://demoqa.com/books`);
  await page.goto("https://demoqa.com/books");
  const books = new Books(page);
  const utils = new ScreenShotsUtils(page,testInfo);


  await test.step("Validate url", async () => {
    const url = page.url();
    await expect(url.includes("/books")).toBeTruthy();
  });

  await test.step("Validate url", async () => {
    const listBooks = await books.getListBooks();
    await expect(listBooks.length).toBeGreaterThan(1);
    await utils.takeScreenshotWithoutLocator('Finish books')
  });
});

test("Validate get list books with only result. Interceptor Request", async ({ page }, testInfo:TestInfo) => {
    await page.setViewportSize({
      width: 1280,
      height: 720,
    });
  
    const books = new Books(page);
    const utils = new ScreenShotsUtils(page,testInfo);
    
    await books.interceptBooksAPI();
  
    console.log(`Navigating to URL: https://demoqa.com/books`);
    await page.goto("https://demoqa.com/books");
  
    await test.step("Validate URL", async () => {
      const url = page.url();
      await expect(url.includes("/books")).toBeTruthy();
    });
  
    await test.step("Validate list of books", async () => {
      const listBooks = await books.getListBooks();
      await expect(listBooks.length).toBe(1);
      await utils.takeScreenshotWithoutLocator('Finish books')
    });
  });
