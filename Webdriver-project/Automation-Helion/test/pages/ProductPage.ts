// PageObject strony pojedynczego produktu (książki). Na tę stronę trafiamy po kliknięciu
// w książkę na liście wyników wyszukiwania (patrz SearchResultPage.clickOnFirstBookItem)
// - stąd żaden getter/metoda tutaj nie otwiera strony samodzielnie, tylko odczytuje
// to, co jest na niej już wyświetlone.
class ProductPage {

    // === SELEKTORY (gettery) ===

    // tytuł produktu - pierwszy <span> wewnątrz <h1> w div.title-group
    // (drugi <span> w tym samym h1 to autor/przedmowa, dlatego :first-child)
    // używane przez: getProductTitleValue(), productTitleIsVisible()
    get productTitle() {
        return $("div.title-group > h1 > span:first-child");
    }

    // przycisk "Dodaj do koszyka" - klasa a.addToBasket jest wspólna dla wszystkich
    // produktów (w przeciwieństwie do id, które ma inny sufiks dla każdej książki)
    // używane przez: addToCartBtnIsVisible(), clickOnAddToCartBtn()
    get addToCartBtn() {
        return $("a.addToBasket");
    }
    // cena domyślnie zaznaczonej wersji produktu (drukowanej) - #cena_d
    // (ebook ma osobny element #cena_e; #cart-edit-summary to element ze strony koszyka,
    // nie strony produktu, więc nie pasował tutaj)
    // używane przez: getProductPrice()
    get productPrice(){
        return $("#cena_d");
    }


    // krok weryfikacyjny: czeka aż cena (productPrice) będzie widoczna i zwraca jej tekst
    async getProductPrice():Promise<string> {
        const price = await this.productPrice;
        await price.waitForDisplayed();
        return await price.getText();
    }

    // === AKCJE (metody) ===

    // czeka aż tytuł produktu (productTitle) będzie widoczny i zwraca jego tekst
    // (obecnie nieużywane w Products.ts - dostępne do przyszłej asercji treści tytułu)
    async getProductTitleValue():Promise<string>{
        const title = await this.productTitle;
        await title.waitForDisplayed();
        return await title.getText();
    }

    // krok weryfikacyjny: sprawdza, czy tytuł produktu (productTitle) jest widoczny na stronie
    // (używane w TEST 2 w Products.ts, po kliknięciu pierwszej książki z listy wyników)
    async productTitleIsVisible() {
        const title = await this.productTitle;
        await title.waitForDisplayed();
    }

    // krok weryfikacyjny: sprawdza, czy przycisk "Dodaj do koszyka" (addToCartBtn) jest widoczny
    // (używane w TEST 2 w Products.ts, zaraz po productTitleIsVisible)
    async addToCartBtnIsVisible() {
        const btn = await this.addToCartBtn;
        await btn.waitForDisplayed();
    }

    // krok akcji: klika w przycisk "Dodaj do koszyka" (addToCartBtn) - czeka aż będzie
    // widoczny, dopiero potem klika; efektem jest przejście na stronę koszyka
    // (używane w TEST 3 w Products.ts)
    async clickOnAddToCartBtn() {
        const btn = await this.addToCartBtn;
        await btn.waitForDisplayed();
        await btn.click();
    }

}

// eksport gotowej (singleton) instancji, żeby w testach korzystać z ProductPage.metoda(...)
// bez ręcznego tworzenia obiektu przez `new ProductPage()`
export default new ProductPage();
