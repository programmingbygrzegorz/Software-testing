// PageObject komponentu searchbara - selektory i akcje związane z wyszukiwarką w nagłówku strony,
// wielokrotnego użytku w różnych testach zamiast powtarzania tych samych selektorów w specach.
// Obsługuje pełną ścieżkę: wpisanie frazy -> podpowiedzi -> przejście do strony wyników
// (którą dalej opisuje SearchResultPage.ts).
class SearchBarPage {

    // === SELEKTORY (gettery) ===
    // Każdy getter zwraca lokalizator jednego elementu UI. Same w sobie niczego nie robią -
    // służą jako "adres" elementu, z którego korzystają metody poniżej (sekcja AKCJE).

    // 1. pole tekstowe searchbara, w które wpisuje się szukaną frazę - dodane jako pierwsze
    // (selektor pierwotnie miał zły ID #inputSearch, poprawiony na realny #header-search-text)
    // używane przez: searchBarIsVisible(), typeSearchPhrase()
    get searchInput() {
        return $("#header-search-text");
    }

    // 3. przycisk (ikona lupki) obok pola wyszukiwania, uruchamiający wyszukiwanie po kliknięciu
    // (XPath pierwotnie miał błąd składni - brakujący cudzysłów w @aria-label=Szukaj", poprawiony)
    // używane przez: clickSearchIcon()
    get searchIcon() {
        return $('//*[@id="szukanie"]//button[@aria-label="Szukaj"]');
    }

    // 6a. popup z podpowiedziami wyników, który wyskakuje pod polem po wpisaniu frazy
    // używane przez: suggestPopupIsVisible()
    get suggestPopup() {
        return $("form#szukanie .suggest-list");
    }

    // 8a. przycisk "Wszystkie" wewnątrz popupu podpowiedzi, przenoszący do pełnej listy wyników wyszukiwania
    // używane przez: clickOnSeeAllBookBtn()
    get seeAllBooksBtn(){
        return $("li.wszystkie > p > a");
    }
    // 11a. komunikat "Nie znaleziono szukanej frazy", pokazywany na stronie wyników,
    // gdy wpisana fraza nie pasuje do żadnej książki
    // używane przez: getNotFoundAlertText()
    get notFoundAlert(){
        return $("div.not-found");
    }


    // === AKCJE (metody) ===
    // Metody wykonują konkretny krok testu na elemencie wskazanym przez odpowiedni getter powyżej.

    // 2. krok weryfikacyjny: sprawdza, czy pole wyszukiwania (searchInput) jest widoczne na stronie
    // służy do potwierdzenia, że searchbar w ogóle się załadował, zanim zaczniemy w nim cokolwiek robić
    // (używane jako pierwszy krok w TEST 1 w Searchbar.ts)
    async searchBarIsVisible(){
        const input = await this.searchInput;
        // czeka aż pole wyszukiwania pojawi się i będzie widoczne w przeglądarce
        await input.waitForDisplayed();
    }

    // 5. krok akcji: wpisuje podaną frazę (value) w pole wyszukiwania (searchInput)
    // służy do symulacji wpisania hasła przez użytkownika, np. przed sprawdzeniem podpowiedzi
    // (używane w TEST 3 w Searchbar.ts, z frazą searchPhrase z config/data.ts)
    async typeSearchPhrase(value: string) {
        const input = await this.searchInput;
        // krok 1: czeka, aż pole będzie widoczne, zanim spróbuje coś w nie wpisać
        await input.waitForDisplayed();
        // krok 2: wpisuje przekazaną frazę do pola - to właśnie ten wpis uruchamia
        // po stronie helion.pl asynchroniczne pobieranie podpowiedzi (patrz suggestPopup niżej)
        await input.setValue(value);
    }

    // 4. krok akcji: klika w ikonę wyszukiwania (searchIcon), czeka aż będzie klikalna
    // służy do zatwierdzenia wpisanej frazy i wywołania wyszukiwania
    // (używane w TEST 2 w Searchbar.ts - kliknięcie z pustym polem, sprawdzające że nic się nie dzieje)
    async clickSearchIcon() {
        const icon = await this.searchIcon;
        // czeka aż przycisk będzie klikalny (widoczny i nie zasłonięty przez nic innego)
        await icon.waitForClickable();
        await icon.click();
    }

    // 6b. krok weryfikacyjny: sprawdza, czy popup z podpowiedziami (suggestPopup) pojawił się po wpisaniu frazy
    // (używane w TEST 3 w Searchbar.ts, zaraz po typeSearchPhrase)
    async suggestPopupIsVisible() {
        const popup = await this.suggestPopup;
        await popup.waitForDisplayed();
    }

    // 9. krok pomocniczy: dodany najpóźniej, jako naprawa race condition wykrytego przy testowaniu
    // kroku 8b. Strona helion.pl aktualizuje link przycisku "Wszystkie" asynchronicznie (debounce)
    // w trakcie wpisywania frazy, a odpowiedzi kolejnych zapytań AJAX mogą wrócić nie po kolei - href
    // bywa przez chwilę "prawie kompletny" (np. bez ostatniej litery) i wygląda na ustabilizowany,
    // zanim dotrze ostatnia, właściwa odpowiedź. Dlatego zamiast jednorazowo czekać na stabilność,
    // próbujemy cyklicznie, aż href faktycznie zawiera pełną frazę.
    // Wywoływane w TEST 4 w Searchbar.ts, tuż przed clickOnSeeAllBookBtn - mimo tego zabezpieczenia
    // test bywa czasem czerwony na żywej stronie (to realna niestabilność strony, nie kodu testu).
    // Timeout podniesiony z 15s na 20s jako dodatkowy zapas na wolniejsze odpowiedzi AJAX-a
    // (obok retry(2) dodanego na poziomie testów w Searchbar.ts - to dwa niezależne
    // zabezpieczenia na tę samą, znaną niestabilność strony Helion).
    async waitForSeeAllBooksLinkToMatchPhrase(phrase: string) {
        const btn = await this.seeAllBooksBtn;

        // browser.waitUntil odpytuje warunek co interval (300ms), aż zwróci true albo minie timeout (20s)
        await browser.waitUntil(
            async () => (await btn.getAttribute("href") ?? "").includes(phrase),
            { timeout: 20000, interval: 300, timeoutMsg: `Link "Wszystkie" nie zaktualizował się do frazy "${phrase}"` }
        );
    }

    // 8b. krok akcji: klika w przycisk "Wszystkie" (seeAllBooksBtn) w popupie podpowiedzi i przenosi
    // do pełnej listy wyników wyszukiwania. Pierwotna wersja (razem z gettera 8a) tylko czekała
    // na widoczność przycisku i NIE klikała w niego - błąd znaleziony i naprawiony później:
    // dopisano faktyczne .click() oraz scrollIntoView() dla niezawodności klikania.
    // (używane w TEST 4 w Searchbar.ts, po waitForSeeAllBooksLinkToMatchPhrase - efektem jest
    // nawigacja na stronę wyników wyszukiwania, opisaną dalej przez SearchResultPage.ts)
    async clickOnSeeAllBookBtn(){
        const btn = await this.seeAllBooksBtn;
        // krok 1: czeka, aż przycisk będzie klikalny
        await btn.waitForClickable();
        // krok 2: przewija widok tak, żeby przycisk był na ekranie (na wypadek gdyby był poza nim)
        await btn.scrollIntoView();
        // krok 3: klika - to powoduje przejście przeglądarki na stronę wyników wyszukiwania
        await btn.click();
    }
    // 10a. krok akcji: czyści pole wyszukiwania (searchInput) z wpisanego wcześniej tekstu
    // (używane w TEST 6 w Searchbar.ts, przed sprawdzeniem że pole jest puste)
    async clearSearchBar(){
        const input = await this.searchInput;
        await input.waitForDisplayed();
        await input.clearValue();
    }

    // 10b. krok weryfikacyjny: odczytuje aktualną wartość pola wyszukiwania (searchInput)
    // służy do sprawdzenia efektu clearSearchBar() - że pole faktycznie zostało wyczyszczone
    // (używane w TEST 6 w Searchbar.ts, zaraz po clearSearchBar())
    async getInputValue():Promise<string>{
        const input = await this.searchInput;
        await input.waitForDisplayed();
        return await input.getValue();
    }
    // 11b. krok weryfikacyjny: czeka aż komunikat "brak wyników" (notFoundAlert) będzie widoczny
    // i zwraca jego tekst - służy do potwierdzenia, że wyszukiwanie nieistniejącej frazy
    // faktycznie kończy się komunikatem "Nie znaleziono szukanej frazy"
    // (używane w TEST 7 w Searchbar.ts, dla incorrectSearchPhrase z config/data.ts)
    async getNotFoundAlertText():Promise<string>{
        const alert = await this.notFoundAlert;
        await alert.waitForDisplayed();
        return await alert.getText();
    }


}
   
// 7. eksport gotowej (singleton) instancji, żeby w testach korzystać z SearchBarPage.metoda(...)
// bez ręcznego tworzenia obiektu przez `new SearchBarPage()` - dodane od razu po pierwszych
// selektorach/metodach, żeby plik od początku dało się importować w testach
export default new SearchBarPage();
