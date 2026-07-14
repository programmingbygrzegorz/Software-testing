// PageObject strony wyników wyszukiwania (adres w postaci helion.pl/search/?szukaj=...).
// Na tę stronę trafiamy po kliknięciu "Wszystkie" w popupie podpowiedzi searchbara
// (patrz SearchBarPage.clickOnSeeAllBookBtn) - stąd żaden getter/metoda tutaj nie otwiera
// strony samodzielnie, tylko odczytuje to, co jest na niej już wyświetlone.
class SearchResultPage {

    // === SELEKTORY (gettery) ===

    // nagłówek H1 na górze strony wyników, np. 'Szukasz "testowanie oprogramowania"'
    // pokazuje, jaką frazę system faktycznie wziął pod uwagę przy wyszukiwaniu
    // używane przez: getPageTitle()
    get pageTitle(){
        return $("div#page-title > h1");
    }

    // wszystkie elementy <li> na liście wyników - każdy odpowiada jednej znalezionej książce
    // używane przez: getNumberOfBooks()
    get booksItem(){
        return $$("ul.list > li");
    }

    // === AKCJE (metody) ===

    // czeka, aż nagłówek (pageTitle) będzie widoczny, i zwraca jego tekst
    // służy do sprawdzenia, że wyszukiwarka pokazała wyniki dla właściwej, wpisanej frazy
    async getPageTitle(): Promise<string> {
        const h1 = await this.pageTitle;
        await h1.waitForDisplayed();
        return await h1.getText();
    }

    // pobiera listę elementów (booksItem) i zwraca ich liczbę
    // służy do sprawdzenia, ile książek wyszukiwarka znalazła dla danej frazy
    async getNumberOfBooks(){
        const books = await this.booksItem;
        return await books.length;
    }
}

// eksport gotowej (singleton) instancji, żeby w testach korzystać z SearchResultPage.metoda(...)
// bez ręcznego tworzenia obiektu przez `new SearchResultPage()`
export default new SearchResultPage();