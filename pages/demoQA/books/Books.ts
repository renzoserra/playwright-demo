import { Locator, Page } from "@playwright/test";

export class Books {

    private readonly listBooks: Locator;
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        this.listBooks = page.locator('.rt-tbody .rt-tr-group');

    }

    async getListBooks(): Promise<Locator[]> {
        const bookLocators =  await this.listBooks.locator('//div[@class="rt-td"][2]//span[@class="mr-2"]').all();
        for(let booksList of bookLocators){
            const bookTitle = await booksList.innerText();
                console.log(`Book title: ${bookTitle}`);
        }
        return bookLocators;
      }
    
      async interceptBooksAPI() {
        await this.page.route("https://demoqa.com/BookStore/v1/Books", (route) => {
          route.fulfill({
            status: 200,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              books: [
                {
                  isbn: "9781449325862",
                  title: "This is a test with interceptor",
                  subTitle: "A Working Introduction",
                  author: "Renzo Serra",
                  publish_date: "2020-06-04T08:48:39.000Z",
                  publisher: "O'Reilly Media",
                  pages: 234,
                  description: "This pocket guide is the perfect on-the-job companion to Git, the distributed version control system. It provides a compact, readable introduction to Git for new users, as well as a reference to common commands and procedures for those of you with Git exp",
                  website: "http://chimera.labs.oreilly.com/books/1230000000561/index.html"
                }
              ]
            }),
          });
        });
      }
}
