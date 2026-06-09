describe("Komputronik - wybór systemu operacyjnego", () => {

    before(async () => {
        // Otwieramy stronę produktu przed wszystkimi testami
        await browser.url("https://www.komputronik.pl/product/1006228/komputer-level-up-r02-ryzen-7-rtx-5070-32gb-1tb-w11h.html");
        await browser.pause(2000);

        // =====================================================
        // OBSŁUGA POPUP COOKIES
        // =====================================================
        // Na stronie komputronik pojawia się popup cookies
        // który zasłania stronę i blokuje interakcję z elementami
        // Popup pojawia się od razu więc nie potrzebujemy czekać
        // try...catch = jeśli popup nie pojawi się, kontynuuj dalej
        try {
            // Szukamy przycisku "Zgadzam się na wszystkie"
            // ID="onetrust-accept-btn-handler" = stały identyfikator przycisku
            const cookieBtn = await $("#onetrust-accept-btn-handler");

            // Klikamy przycisk akceptacji cookies
            await cookieBtn.click();

            // Krótka pauza po zamknięciu popupu
            await browser.pause(500);
        } catch (e) {
            // Popup nie pojawił się - kontynuujemy dalej
            console.log("Brak popupu cookies");
        }
    });

    // =====================================================
    // TEST 1: sprawdzenie URL strony
    // =====================================================
    it("Should open product page", async () => {
        // Sprawdzamy czy przeglądarka jest na właściwym URL
        // toHaveUrl() = URL musi być dokładnie taki jak podany
        await expect(browser).toHaveUrl(
            "https://www.komputronik.pl/product/1006228/komputer-level-up-r02-ryzen-7-rtx-5070-32gb-1tb-w11h.html"
        );
    });

    // =====================================================
    // TEST 2: sprawdzenie domyślnej wartości dropdowna
    // =====================================================
    it("Should have default Windows 11 Home selected", async () => {
        // Szukamy labela który pokazuje aktualnie wybraną opcję
        // data-role="selectLabel" = element wyświetlający aktualny wybór
        const label = await $('div[data-role="selectLabel"]');

        // Sprawdzamy czy domyślnie wybrany jest "Windows 11 Home"
        // toHaveText() = tekst elementu musi być równy podanej wartości
        await expect(label).toHaveText("Windows 11 Home");
    });

    // =====================================================
    // TEST 3: wybór opcji z dropdowna
    // =====================================================
    it("Should select brak systemu w komplecie", async () => {

        // KROK 1: Otwieramy dropdown
        // data-name="attributesDropdown" = kontener całego dropdowna
        const dropdown = await $('div[data-name="attributesDropdown"]');

        // Czekamy aż dropdown będzie widoczny
        await dropdown.waitForDisplayed({ timeout: 10000 });

        // Klikamy żeby otworzyć listę opcji
        await dropdown.click();

        // Krótka pauza żeby lista się rozwinęła
        await browser.pause(500);

        // KROK 2: Wybieramy opcję "brak systemu w komplecie"
        // data-name="attributesDropdownItem" = pojedyncza opcja na liście
        // normalize-space(text()) = tekst opcji bez białych znaków
        const option = await $('//div[@data-name="attributesDropdownItem" and normalize-space(text())="brak systemu w komplecie"]');

        // Czekamy aż opcja będzie widoczna
        await option.waitForDisplayed({ timeout: 10000 });

        // Klikamy opcję
        await option.click();

        // Czekamy na zmianę wartości w dropdownie
        await browser.pause(3000);

        // KROK 3: Sprawdzamy czy label zmienił się na wybraną opcję
        const label = await $('div[data-role="selectLabel"]');

        // toHaveText() = tekst elementu musi być równy "brak systemu w komplecie"
        await expect(label).toHaveText("brak systemu w komplecie");
    });

});