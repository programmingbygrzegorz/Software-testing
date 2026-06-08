import { homeUrl } from "../../lib/pages"; 
// Importuje stałą homeUrl z pliku pages.ts (adres strony testowanej)

describe("Lesson 1 - Input", () => { 
// Grupa testów (test suite) – wszystkie testy w środku dotyczą jednej funkcjonalności

    it("Should open gama-sklep page", async () => { 
    // Pierwszy test: sprawdza czy strona się poprawnie otwiera

        await browser.url(homeUrl); 
        // Otwiera przeglądarkę na adres zapisany w homeUrl

        await expect(browser).toHaveUrl(homeUrl); 
        // Sprawdza czy aktualny URL przeglądarki jest taki jak homeUrl

        await expect(browser).toHaveTitle("Meble - Internetowy Sklep Meblowy Gama"); 
        // Sprawdza czy tytuł strony (tab przeglądarki) jest zgodny z oczekiwanym
    });

    it("Should type value to search input", async () => { 
    // Drugi test: sprawdza wpisywanie tekstu w pole wyszukiwania

        const input = await $('input.search_input'); 
        // Znajduje element input na stronie po selektorze CSS (klasa search_input)

        await input.waitForDisplayed(); 
        // Czeka aż input będzie widoczny na stronie (żeby uniknąć błędów)

        await input.setValue("Szafa"); 
        // Wpisuje tekst "Szafa" do pola input

        expect(await input.getValue()).toContain("Szafa"); 
        // Sprawdza czy wartość inputa zawiera tekst "Szafa"

        await browser.keys("Enter"); 
        // Symuluje wciśnięcie klawisza ENTER (np. uruchomienie wyszukiwania)

        await browser.pause(4000); 
        // Wstrzymuje test na 4 sekundy (tylko do debugowania, nie używać w produkcji)
    });

});