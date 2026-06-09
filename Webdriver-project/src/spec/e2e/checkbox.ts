import { channel } from "node:diagnostics_channel";
import { homeUrl2, category9Art, clothesUrl } from "../../lib/pages";

describe("Lesson 2 - Category navigation flow (fast visual)", () => {

    before(async () => {
        await browser.url(homeUrl2);
        await browser.pause(1000);
    });

    it("Should open 9-art category page", async () => {
        await browser.url(`${homeUrl2}${category9Art}`);
        await browser.pause(1000);
        await expect(browser).toHaveUrl(`${homeUrl2}${category9Art}`);
    });

    it("Should click Clothes link from 9-art page", async () => {
        const fashionLink = await $('=FASHION');
        await fashionLink.waitForDisplayed();
        await browser.pause(500);
        await fashionLink.click();
        await browser.pause(1000);

        const clothesLink = await $('=Clothes');
        await clothesLink.waitForDisplayed();
        await browser.pause(500);
        await clothesLink.click();
        await browser.pause(1000);

        await expect(browser).toHaveUrl(clothesUrl);
    });

    it("Should close newsletter popup", async () => {
        try {
            const closeBtn = await $("a.fancybox-close");
            await closeBtn.waitForDisplayed({ timeout: 5000 });
            await closeBtn.click();
            await browser.pause(500);
        } catch (e) {
            console.log("Brak popupu - kontynuuję");
        }
    });
/*
    it("Should check Rozmiar-S checkbox", async () => {
        // Szukamy labela który zawiera link z "Rozmiar-S" w href
        // XPath: znajdź label który wewnątrz ma element <a>
        // którego atrybut href zawiera "Rozmiar-S"
        const label = await $('//label[.//a[contains(@href,"Rozmiar-S")]]');

        await label.waitForDisplayed({ timeout: 10000 });
        await label.scrollIntoView();
        await browser.pause(500);

        await label.click();

        await browser.pause(2000);
        
        await expect(browser).toHaveUrl(expect.stringContaining("Rozmiar-S"));
    
    });*/

   it("Should check multiple checkboxes", async () => {

    // =====================================================
    // KROK 1: Klikamy filtr S
    // =====================================================
    // Szukamy labela który wewnątrz ma link z tekstem "S"
    // normalize-space() usuwa białe znaki z tekstu
    // np. "  S  " → "S"
    const labelS = await $('//label[.//a[normalize-space(text())="S"]]');
    await labelS.waitForExist({ timeout: 1000 }); // czekamy aż pojawi się w DOM
    await labelS.scrollIntoView();                  // przewijamy do elementu
    await labelS.click();                           // klikamy label
    await browser.pause(1000);                      // czekamy na przeładowanie strony
    // URL zmienia się na: ?q=Rozmiar-S

    // =====================================================
    // KROK 2: Klikamy filtr M
    // =====================================================
    // Strona przeładowała się z filtrem S
    // Szukamy labela który wewnątrz ma link z tekstem "M"
    // Tekst linka jest stały - zawsze "M" niezależnie od URL
    const labelM = await $('//label[.//a[normalize-space(text())="M"]]');
    await labelM.waitForExist({ timeout: 1000 }); // czekamy aż pojawi się w DOM
    await labelM.scrollIntoView();                  // przewijamy do elementu
    await labelM.click();                           // klikamy label
    await browser.pause(1000);                      // czekamy na przeładowanie strony
    // URL zmienia się na: ?q=Rozmiar-S-M

    // =====================================================
    // KROK 3: Klikamy filtr L
    // =====================================================
    // Strona przeładowała się z filtrami S i M
    // Szukamy labela który wewnątrz ma link z tekstem "L"
    const labelL = await $('//label[.//a[normalize-space(text())="L"]]');
    await labelL.waitForExist({ timeout: 1000 }); // czekamy aż pojawi się w DOM
    await labelL.scrollIntoView();                  // przewijamy do elementu
    await labelL.click();                           // klikamy label
    await browser.pause(2000);                      // czekamy na przeładowanie strony
    // URL zmienia się na: ?q=Rozmiar-S-M-L

    // =====================================================
    // ASERCJA
    // =====================================================
    // Sprawdzamy czy URL zawiera wszystkie trzy rozmiary
    // stringContaining = URL musi zawierać ten tekst gdziekolwiek
    await expect(browser).toHaveUrl(expect.stringContaining("Rozmiar-S-M-L"));
    });
});