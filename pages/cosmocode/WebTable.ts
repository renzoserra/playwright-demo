import { expect, Locator, Page } from "@playwright/test";

export class webtable{

    private titleMain: Locator;
    private subtitleMain: Locator;
    private tableContainerCountries: Locator;
    page: Page;

    constructor (page: Page){
        this.page = page;
        this.titleMain = page.getByRole('heading',{name:'Automation Practice | WebTable'});
        this.subtitleMain = page.locator("//h2[contains(text(),'List of Countries, Capitals, Currencies and Languages')]");
        this.tableContainerCountries = page.locator('#countries')
    }

    async validateTitleMain(txtExpect: string){
        const txtActual = await this.titleMain.innerText();
        await expect(txtActual).toEqual(txtExpect);
    }

    async validateSubTitleMain(txtExpect: string){
        const txtActual = await this.subtitleMain.innerText();
        await expect(txtActual).toEqual(txtExpect);
    }

    async validateRowsTable(){
        const rowsTable = await this.tableContainerCountries.locator('tr').all();
        console.log(`There is a total rows: ${rowsTable.length - 1}`)
    }

    async showResultRowsTable() {
            const rowsTable = await this.tableContainerCountries.locator('tr').all();
            const resultsArray: { 
                country: string; 
                capital: string; 
                currency: string; 
                language: string 
                }[] = [];
        
            for (let index = 0; index < rowsTable.length; index++) {
                const row = rowsTable[index];
                const resultCountry = await row.locator('//td[2]').innerText();
                const resultCapital = await row.locator('//td[3]').innerText();
                const resultCurrency = await row.locator('//td[4]').innerText();
                const resultLanguage = await row.locator('//td[5]').innerText();
        
                if (resultLanguage.trim() === 'Spanish'){
                const resultObject = {
                    country: resultCountry,
                    capital: resultCapital,
                    currency: resultCurrency,
                    language: resultLanguage
                };
                resultsArray.push(resultObject);
            }
        }
            console.log(`Total countries that speak Spanish: ${resultsArray.length}`)
            console.log(JSON.stringify(resultsArray,null,2));
        }
        
}