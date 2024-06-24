import { Page, Locator, TestInfo } from "@playwright/test";

export class ScreenShotsUtils {
    private page: Page;
    private testInfo: TestInfo;

    constructor(page: Page, testInfo: TestInfo) {
        this.page = page;
        this.testInfo = testInfo;
    }

    async takeScreenshotWithoutLocator(fileName: string) {
        const screenshotPath = `screenshots/${fileName}.png`;

        // Tomar una captura de pantalla completa
        await this.page.screenshot({ path: screenshotPath, fullPage:true },);
        console.log(`Screenshot saved as ${screenshotPath}`);

        // Adjuntar la captura de pantalla al reporte
        this.testInfo.attachments.push({
            name: `${fileName}`,
            path: screenshotPath,
            contentType: 'image/png'
        });
    }

    async takeScreenshotWithLocator(fileName: string, locator: Locator) {
        const screenshotPath = `screenshots/${fileName}.png`;

        // Obtener el handle del elemento
        const elementHandle = await locator.elementHandle();
        
        // Verificar si el handle del elemento no es null
        if (elementHandle) {
            // Agregar un estilo temporal al elemento para resaltarlo
            await this.page.evaluate((el) => {
                if (el) {
                    el.style.boxShadow = '0 0 0 3px red'; // Cambiar esto para personalizar el resaltado
                    el.style.transition = 'box-shadow 0.3s ease-in-out';
                }
            }, elementHandle);

            // Esperar un breve momento para asegurarse de que el navegador renderice el cambio
            await this.page.waitForTimeout(100); // Puedes ajustar el tiempo según sea necesario

            // Tomar la captura de pantalla
            await this.page.screenshot({ path: screenshotPath, fullPage:true });
            console.log(`Screenshot saved as ${screenshotPath}`);

            // Eliminar el estilo agregado
            await this.page.evaluate((el) => {
                if (el) {
                    el.style.boxShadow = '';
                    el.style.transition = '';
                }
            }, elementHandle);

            // Adjuntar la captura de pantalla al reporte
            this.testInfo.attachments.push({
                name: `${fileName}`,
                path: screenshotPath,
                contentType: 'image/png'
            });
        } else {
            console.error('Element handle is null');
        }
    }

}