import test, { expect } from "@playwright/test";

test('Upload one file', async ({page})=>{
    // Select one file

await page.goto('https://the-internet.herokuapp.com/upload');  
await page.locator('#file-upload').setInputFiles('./resources/upload/image1.png');
await page.getByRole('button',{name:'Upload'}).click();
expect(await page.getByRole('heading', {name:'File Uploaded!'})).toHaveText('File Uploaded!');
})

test('Upload two files', async ({page})=>{
    await page.goto('https://the-internet.herokuapp.com/upload');
    const dragDrop =  await page.locator('//input[@multiple="multiple"]');
    // This method (setInputFiles) expects ElementHandle to point to an input element. 
    await dragDrop.setInputFiles(['./resources/upload/image1.png','./resources/upload/image2.webp']);
    await page.getByRole('button',{name:'Upload'}).click();
    expect(await page.locator('//h1').innerText()).toEqual('Internal Server Error');
    await page.close();
})