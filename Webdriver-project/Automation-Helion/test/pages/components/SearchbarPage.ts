// PageObject komponentu searchbara - selektory i akcje związane z wyszukiwarką w nagłówku strony,
// wielokrotnego użytku w różnych testach zamiast powtarzania tych samych selektorów w specach

class SearchBarPage {

    // === SELEKTORY (gettery) ===
    // Każdy getter zwraca lokalizator jednego elementu UI. Same w sobie niczego nie robią -
    // służą jako "adres" elementu, z którego korzystają metody poniżej (sekcja AKCJE).

    // pole tekstowe searchbara, w które wpisuje się szukaną frazę
    // używane przez: searchBarIsVisible(), typeSearchPhrase()
    get searchInput() {
        return $("#header-search-text");
    }

    // przycisk (ikona lupki) obok pola wyszukiwania, uruchamiający wyszukiwanie po kliknięciu
    // używane przez: clickSearchIcon()
    get searchIcon() {
        return $('//*[@id="szukanie"]//button[@aria-label="Szukaj"]');
    }

    // popup z podpowiedziami wyników, który wyskakuje pod polem po wpisaniu frazy
    // używane przez: suggestPopupIsVisible()
    get suggestPopup() {
        return $("form#szukanie .suggest-list");
    }

    // przycisk "Wszystkie" wewnątrz popupu podpowiedzi, przenoszący do pełnej listy wyników wyszukiwania
    // używane przez: clickOnSeeAllBookBtn()
    get seeAllBooksBtn(){
        return $("li.wszystkie > p > a");
    }

    // === AKCJE (metody) ===
    // Metody wykonują konkretny krok testu na elemencie wskazanym przez odpowiedni getter powyżej.

    // krok weryfikacyjny: sprawdza, czy pole wyszukiwania (searchInput) jest widoczne na stronie
    // służy do potwierdzenia, że searchbar w ogóle się załadował, zanim zaczniemy w nim cokolwiek robić
    async searchBarIsVisible(){
        const input = await this.searchInput;
        await input.waitForDisplayed();
    }

    // krok akcji: wpisuje podaną frazę (value) w pole wyszukiwania (searchInput)
    // służy do symulacji wpisania hasła przez użytkownika, np. przed sprawdzeniem podpowiedzi
    async typeSearchPhrase(value: string) {
        const input = await this.searchInput;
        await input.waitForDisplayed();
        await input.setValue(value);
    }

    // krok akcji: klika w ikonę wyszukiwania (searchIcon), czeka aż będzie klikalna
    // służy do zatwierdzenia wpisanej frazy i wywołania wyszukiwania
    async clickSearchIcon() {
        const icon = await this.searchIcon;
        await icon.waitForClickable();
        await icon.click();
    }

    // krok weryfikacyjny: sprawdza, czy popup z podpowiedziami (suggestPopup) pojawił się po wpisaniu frazy
    async suggestPopupIsVisible() {
        const popup = await this.suggestPopup;
        await popup.waitForDisplayed();
    }

    // krok pomocniczy: strona aktualizuje link przycisku "Wszystkie" asynchronicznie (debounce) w trakcie
    // wpisywania frazy, a odpowiedzi kolejnych zapytań AJAX mogą wrócić nie po kolei - href bywa przez
    // chwilę "prawie kompletny" (np. bez ostatniej litery) i wygląda na ustabilizowany, zanim dotrze
    // ostatnia, właściwa odpowiedź. Dlatego zamiast jednorazowo czekać na stabilność, próbujemy cyklicznie,
    // aż href faktycznie zawiera pełną frazę - a jeśli ustabilizuje się na złej wartości, próbujemy dalej.
    async waitForSeeAllBooksLinkToMatchPhrase(phrase: string) {
        const btn = await this.seeAllBooksBtn;

        await browser.waitUntil(
            async () => (await btn.getAttribute("href") ?? "").includes(phrase),
            { timeout: 15000, interval: 300, timeoutMsg: `Link "Wszystkie" nie zaktualizował się do frazy "${phrase}"` }
        );
    }

    // krok akcji: klika w przycisk "Wszystkie" (seeAllBooksBtn) w popupie podpowiedzi,
    // czeka aż będzie klikalny, przewija do niego widok (na wypadek gdyby był poza ekranem)
    // i przenosi do pełnej listy wyników wyszukiwania
    async clickOnSeeAllBookBtn(){
        const btn = await this.seeAllBooksBtn;
        await btn.waitForClickable();
        await btn.scrollIntoView();
        await btn.click();
    }
}

// eksport gotowej (singleton) instancji, żeby w testach korzystać z SearchBarPage.metoda(...)
// bez ręcznego tworzenia obiektu przez `new SearchBarPage()`
export default new SearchBarPage();