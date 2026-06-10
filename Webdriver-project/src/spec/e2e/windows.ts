import { homeUrl, homeUrl2 }  from "../../lib/pages";

describe("Lesson 4 - Windows", async () => {
    it("Should open home page", async () => {
        await browser.url(homeUrl);
        await browser.saveScreenshot("./screenshots/01_home_url.png");
        await expect(browser).toHaveUrl(homeUrl);
        await browser.saveScreenshot("./screenshots/02_home_assert.png");
    });
    it("Should open women page ", async () => {
        await browser.newWindow(homeUrl2);
        await browser.saveScreenshot("./screenshots/03_women_new_window.png");
        await browser.pause(4000);
        await browser.saveScreenshot("./screenshots/04_women_after_pause.png");
    });
    it("Should verify title pages", async () => {
        // pobiera listę uchwytów (ID) wszystkich aktualnie otwartych okien/zakładek
        const openWindows = await browser.getWindowHandles();

        // przełącza fokus przeglądarki na pierwsze okno z listy (indeks 0)
        await browser.switchWindow(openWindows[0]);

        // pobiera tytuł strony aktualnie aktywnego okna (zawartość tagu <title>)
        const windowTitle1: string = await browser.getTitle();

       // await expect(await windowTitle1).toContain("Meble - Internetowy Sklep Meblowy Gama")
        await expect(browser).toHaveTitle("Meble - Internetowy Sklep Meblowy Gama")

        await browser.switchWindow(openWindows[1]);
        const windowTitle2: string = await browser.getTitle();
        await expect(browser).toHaveTitle("Best E-commerce PrestaShop Theme");
        
    });
});
