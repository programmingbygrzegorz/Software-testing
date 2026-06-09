import { productUrl } from "../../lib/pages";

describe("Lesson 3b - Select", async () => {

    it("Should open product page and verify url", async () => {
        // Otwieramy stronę produktu
        await browser.url(productUrl);
        await browser.pause(2000);

        // Sprawdzamy czy jesteśmy na właściwej stronie
        await expect(browser).toHaveUrl(productUrl);
    });

    it("Should select product size", async () => {

        // =====================================================
        // OBSŁUGA POPUP COOKIES
        // =====================================================
        // Popup pojawia się od razu po załadowaniu strony
        // try...catch = jeśli popup nie pojawi się, kontynuuj
        try {
            // Szukamy przycisku po ID
            const cookieBtn = await $("#onetrust-accept-btn-handler");
            await cookieBtn.click();
            await browser.pause(1000);
        } catch (e) {
            console.log("Brak popupu cookies");
        }

        // =====================================================
        // KROK 1: Otwieramy dropdown
        // =====================================================
        // data-role="select" = kontener całego dropdowna
        const select: WebdriverIO.Element = await $('[data-role="select"]');
        await select.waitForDisplayed({ timeout: 10000 });
        await browser.pause(1000);

        // Klikamy żeby otworzyć listę opcji
        await select.click();
        await browser.pause(1500);

        // =====================================================
        // KROK 2: Wybieramy opcję "brak systemu w komplecie"
        // =====================================================
        // data-name="attributesDropdownItem" = pojedyncza opcja
        // normalize-space(text()) = tekst opcji bez białych znaków
        const option = await $('//div[@data-name="attributesDropdownItem" and normalize-space(text())="brak systemu w komplecie"]');
        await option.waitForDisplayed({ timeout: 10000 });
        await browser.pause(1000);

        // Klikamy opcję
        await option.click();
        await browser.pause(2000);

        // =====================================================
        // ASERCJA
        // =====================================================
        // data-role="selectLabel" = element pokazujący aktualny wybór
        const label = await $('[data-role="selectLabel"]');

        // Sprawdzamy czy label zmienił się na wybraną opcję
        await expect(label).toHaveText("brak systemu w komplecie");
        await browser.pause(2000);
    });

});