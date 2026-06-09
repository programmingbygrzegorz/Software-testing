// =====================================================
// IMPORT - skąd bierzemy dane
// =====================================================
// Importujemy stałe z pliku pages.ts:
// homeUrl2    = adres strony głównej sklepu
// category9Art = ścieżka do kategorii 9-art
// clothesUrl  = pełny URL strony z ubraniami
import { homeUrl2, category9Art, clothesUrl } from "../../lib/pages";

// =====================================================
// DESCRIBE - grupuje powiązane testy
// =====================================================
// describe() to kontener na testy.
// Pierwszy argument = nazwa grupy (widoczna w raporcie)
// Drugi argument = funkcja z testami
describe("Lesson 2 - Category navigation flow (fast visual)", () => {

    // =====================================================
    // BEFORE HOOK - wykonuje się RAZ przed wszystkimi testami
    // =====================================================
    // before() uruchamia się jeden raz zanim wystartuje
    // pierwszy it(). Używamy go do ustawienia stanu początkowego.
    before(async () => {
        // Otwieramy stronę główną sklepu w przeglądarce
        await browser.url(homeUrl2);

        // Czekamy 1 sekundę - tylko do celów wizualnych
        // żeby zobaczyć że strona się załadowała
        await browser.pause(1000);
    });

    // =====================================================
    // TEST 1 - wejście na stronę kategorii 9-art
    // =====================================================
    // it() = pojedynczy test
    // Pierwszy argument = opis testu (widoczny w raporcie)
    it("Should open 9-art category page", async () => {

        // Składamy URL z dwóch części i nawigujemy do niego
        // Backtick `` pozwala wstawić zmienne do tekstu przez ${}
        // np. "https://sklep.pl" + "/9-art" = "https://sklep.pl/9-art"
        await browser.url(`${homeUrl2}${category9Art}`);

        // Pauza wizualna 1 sekunda
        await browser.pause(1000);

        // ASERCJA: sprawdzamy czy przeglądarka jest na właściwym URL
        // expect(browser) = sprawdzaj stan przeglądarki
        // toHaveUrl()     = URL powinien być równy temu co podajemy
        await expect(browser).toHaveUrl(`${homeUrl2}${category9Art}`);
    });

    // =====================================================
    // TEST 2 - kliknięcie linku "Clothes"
    // =====================================================
    it("Should click Clothes link from 9-art page", async () => {

        // Szukamy elementu po jego widocznym tekście
        // '=Clothes' w WebdriverIO znaczy: znajdź element
        // którego DOKŁADNY tekst to "Clothes"
        const clothesLink = await $('=Clothes');

        // Czekamy aż element będzie widoczny na stronie
        // (może się jeszcze ładować)
        await clothesLink.waitForDisplayed();

        // Pauza wizualna 0.5 sekundy przed kliknięciem
        await browser.pause(500);

        // Symulujemy kliknięcie w link - jak prawdziwy użytkownik
        await clothesLink.click();

        // Czekamy 1 sekundę na załadowanie nowej strony
        await browser.pause(1000);

        // ASERCJA: sprawdzamy czy trafiliśmy na stronę Clothes
        await expect(browser).toHaveUrl(clothesUrl);
    });

    // =====================================================
    // TEST 3 - zamknięcie popupu newslettera
    // =====================================================
    it("Should close newsletter popup", async () => {

        // try...catch = próbuj, a jeśli błąd - nie przerywaj testu
        try {
            // Szukamy przycisku zamknięcia popupu fancybox
            // 'a.fancybox-close' = element <a> z klasą fancybox-close
            const closeBtn = await $("a.fancybox-close");

            // Czekamy max 5 sekund aż przycisk będzie widoczny
            // Jeśli nie pojawi się w 5s → rzuca błąd → catch go łapie
            await closeBtn.waitForDisplayed({ timeout: 5000 });

            // Klikamy przycisk zamknięcia
            await closeBtn.click();

            // Krótka pauza po zamknięciu
            await browser.pause(500);

        } catch (e) {
            // Popup się nie pojawił - to jest OK
            // Logujemy info i przechodzimy dalej
            console.log("Brak popupu - kontynuuję");
        }
    });

    // =====================================================
    // TEST 4 - zaznaczenie checkboxa filtra "Rozmiar S"
    // =====================================================
    it("Should check Rozmiar-S checkbox", async () => {

        // Szukamy inputa po atrybucie data-search-url
        // input[data-search-url*="Rozmiar-S"] znaczy:
        //   input         = element HTML typu input
        //   []            = warunek na atrybut
        //   data-search-url = nazwa atrybutu
        //   *=            = "zawiera" (gwiazdka = dowolny fragment)
        //   "Rozmiar-S"   = szukana wartość
        // Używamy tego zamiast ID bo ID jest dynamiczne (zmienia się)
        const checkbox = await $('input[data-search-url*="Rozmiar-S"]');

        // Czekamy aż element pojawi się w DOM (niekoniecznie widoczny)
        // waitForExist ≠ waitForDisplayed
        // waitForExist  = element jest gdzieś w HTML (może być ukryty)
        // waitForDisplayed = element jest widoczny dla użytkownika
        await checkbox.waitForExist({ timeout: 10000 });

        // Przewijamy stronę tak żeby element był widoczny w oknie
        // Bez tego klik przez JS może nie zadziałać
        await checkbox.scrollIntoView();

        // Krótka pauza wizualna
        await browser.pause(500);

        // Klikamy przez JavaScript zamiast przez WebdriverIO
        // Dlaczego? Bo PrestaShop ukrywa input CSS-em (display:none)
        // WebdriverIO nie pozwala klikać ukrytych elementów
        // ale JavaScript może kliknąć każdy element w DOM
        // (el) => (el as HTMLElement).click() = funkcja JS wykonana w przeglądarce
        await browser.execute((el) => (el as HTMLElement).click(), checkbox);

        // Czekamy 2 sekundy na przeładowanie strony po kliknięciu filtra
        await browser.pause(2000);

        // ASERCJA: sprawdzamy czy URL zawiera "Rozmiar-S"
        // PrestaShop po kliknięciu filtra zmienia URL zamiast
        // zaznaczać checkbox - dlatego sprawdzamy URL a nie stan inputa
        // expect.stringContaining("Rozmiar-S") = URL musi zawierać ten tekst
        await expect(browser).toHaveUrl(expect.stringContaining("Rozmiar-S"));
    });

});