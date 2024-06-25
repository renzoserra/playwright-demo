import test, { expect, TestInfo } from "@playwright/test";
import { Books } from "../pages/demoQA/books/Books";

test.afterEach("Close browser", async ({ page }) => {
  await page.close();
});

test("Validate get list books", async ({ page }, testInfo:TestInfo) => {
  console.log(`Navigating to URL: https://demoqa.com/books`);
  await page.goto("https://demoqa.com/books");
  const books = new Books(page);


  await test.step("Validate url", async () => {
    const url = page.url();
    await expect(url.includes("/books")).toBeTruthy();
  });

  await test.step("Validate url", async () => {
    const listBooks = await books.getListBooks();
    await expect(listBooks.length).toBeGreaterThan(1);
  });
});

test("Validate get list books with only result. Interceptor Request", async ({ page }, testInfo:TestInfo) => {
    const books = new Books(page);
    
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
    });
  });
