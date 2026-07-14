// PageObject strony wyników wyszukiwania
class SearchResultPage {
    // nagłówek H1 z tytułem strony wyników
    get pageTitle(){
        return $("div#page-title > h1");
    }

    // czeka aż tytuł strony będzie widoczny i zwraca jego tekst
    async getPageTitle(): Promise<string> {
        const h1 = await this.pageTitle;
        await h1.waitForDisplayed();
        return await h1.getText();
    }
}

// eksport gotowej (singleton) instancji, żeby w testach korzystać z SearchResultPage.metoda(...)
// bez ręcznego tworzenia obiektu przez `new SearchResultPage()`
export default new SearchResultPage();