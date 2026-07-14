// PageObject komponentu searchbara - metody i selektory związane z wyszukiwarką, wielokrotnego użytku w różnych testach
class SearchBarPage {
    // 1. selektor pola wyszukiwania na stronie - dodane jako pierwsze, do weryfikacji widoczności searchbara
    get searchInput() {
        return $("#header-search-text");
    }

    // 3. selektor ikony (przycisku) otwierającej/wyszukującej w wyszukiwarce - dodane po searchBarIsVisible
    get searchIcon() {
        return $('//*[@id="szukanie"]//button[@aria-label="Szukaj"]');
    }

    // 5a. selektor popupu z podpowiedziami wyszukiwania, pojawiającego się po wpisaniu frazy
    get suggestPopup() {
        return $("form#szukanie .suggest-list");
    }
    get seeAllBooksBtn(){
        return $("li.wszystkie > p > a");
    }

    async clickOnSeeAllBookBtn(){
        const btn = await this.seeAllBooksBtn;
        await btn.waitForDisplayed();
    }


    // 5b. sprawdza, czy popup z podpowiedziami jest widoczny na stronie
    async suggestPopupIsVisible() {
        const popup = await this.suggestPopup;
        await popup.waitForDisplayed();
    }

    // 5. wpisuje podaną frazę w pole wyszukiwania - dodane jako ostatnie, do testu wpisywania frazy i popupu podpowiedzi
    async typeSearchPhrase(value: string) {
        const input = await this.searchInput;
        // czeka, aż pole będzie widoczne, zanim spróbuje coś w nie wpisać
        await input.waitForDisplayed();
        // wpisuje przekazaną frazę do pola wyszukiwania
        await input.setValue(value);
    }

    // 4. kliknięcie w ikonę wyszukiwania - czeka aż będzie klikalna, dopiero potem klika
    async clickSearchIcon() {
        const icon = await this.searchIcon;
        await icon.waitForClickable();
        await icon.click();
    }

    // 2. sprawdza, czy pole wyszukiwania jest widoczne na stronie - druga rzecz dodana po samym selektorze
    async searchBarIsVisible(){
        const input = await this.searchInput;
        await input.waitForDisplayed();
    }
}

// 6. eksport gotowej instancji, żeby korzystać z komponentu bez tworzenia obiektu w testach
export default new SearchBarPage();