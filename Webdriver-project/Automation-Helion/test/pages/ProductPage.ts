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

    // przycisk "Przejdź do koszyka" w bocznym mini-koszyku (panel boczny) -
    // strona Helion po kliknięciu "Dodaj do koszyka" zachowuje się NIEDETERMINISTYCZNIE:
    // czasem od razu przekierowuje na /zakupy/edycja, a czasem zamiast tego otwiera
    // boczny panel "Twój koszyk" z komunikatem "Dodano do koszyka!" i tym przyciskiem,
    // BEZ zmiany URL. Ten getter obsługuje ten drugi przypadek.
    // TODO: selektor NIEPOTWIERDZONY przez Inspect - zweryfikować dokładną strukturę HTML
    // (na razie dopasowanie po widocznym tekście linku)
    get goToCartBtn() {
        return $("a=Przejdź do koszyka");
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
    // widoczny, dopiero potem klika.
    // Efektem KLIKNIĘCIA jest jeden z dwóch wariantów zachowania strony Helion
    // (potwierdzone empirycznie - zobacz notatkę przy goToCartBtn):
    //   A) strona sama przekierowuje na /zakupy/edycja (stary/oczekiwany flow)
    //   B) strona zostaje na miejscu i otwiera boczny panel "Twój koszyk" z przyciskiem
    //      "Przejdź do koszyka" - trzeba go kliknąć samodzielnie, żeby dotrzeć na koszyk
    // Metoda sprawdza URL po kliknięciu i dociska wariant B, jeśli zaszedł.
    // (używane w TEST 3 w Products.ts)
    async clickOnAddToCartBtn() {
        const btn = await this.addToCartBtn;
        await btn.waitForDisplayed();
        await btn.click();

        // dajemy stronie chwilę na ewentualne przekierowanie / wyrenderowanie panelu bocznego
        const currentUrl = await browser.getUrl();
        if (!currentUrl.includes("zakupy/edycja")) {
            // wariant B: boczny mini-koszyk zamiast przekierowania - trzeba kliknąć
            // "Przejdź do koszyka", żeby faktycznie dotrzeć na stronę koszyka
            const goToCart = await this.goToCartBtn;
            await goToCart.waitForDisplayed({ timeout: 5000 });
            await goToCart.click();
        }
    }

}

// eksport gotowej (singleton) instancji, żeby w testach korzystać z ProductPage.metoda(...)
// bez ręcznego tworzenia obiektu przez `new ProductPage()`
export default new ProductPage();