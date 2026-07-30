// PageObject strony koszyka. Trafiamy tu po kliknięciu "Dodaj do koszyka" na stronie produktu
// (patrz ProductPage.clickOnAddToCartBtn) - stąd żaden getter/metoda tutaj nie otwiera strony
// samodzielnie, tylko odczytuje to, co jest na niej już wyświetlone.
class CartPage {

    // komunikat potwierdzający dodanie produktu do koszyka ("Dodano: <tytuł>")
    // strona ma na tej podstronie DWA elementy div.successbox - ten (class="successbox oneline")
    // oraz osobny, niepowiązany komunikat o brakującej kwocie do darmowej dostawy
    // (class="free-delivery-miss successbox") - stąd zawężenie do klasy .oneline,
    // żeby selektor nie trafiał czasem w tamten drugi komunikat
    // używane przez: getSuccessAlertValue()
    get successAlert(){
        return $("div.successbox.oneline > p");
    }

    // suma do zapłaty w koszyku (#cart-edit-summary) - w odróżnieniu od ProductPage.productPrice
    // (cena pojedynczej książki na stronie produktu, #cena_d), to ma być łączna kwota koszyka
    // UWAGA: selektor jeszcze nie zweryfikowany na realnym koszyku z dodanym produktem
    // (statyczny podgląd pustego koszyka nie zawiera tego elementu) - obecnie nieużywane
    // w żadnym teście, sprawdzić przed pierwszym użyciem
    get totalPrice(){
        return $("#cart-edit-summary")
    }

    // checkbox "Zaznacz pozycję" przy pozycji w koszyku - prawdziwy <input type="checkbox">
    // jest w DOM, ale wizualnie zastąpiony customowym stylem (<label><span class="input">...),
    // przez co WebDriver zgłasza go jako "not interactable" mimo że jest "displayed"
    // - dlatego klikamy w powiązany <label>, a nie bezpośrednio w <input>
    // używane przez: clickOnCheckbox()
    get checkbox(){
        return $("input[aria-label='Zaznacz pozycję']")
    }

    // label powiązany z checkboxem (patrz komentarz przy checkbox) - to właśnie ten element
    // trzeba kliknąć, żeby zaznaczyć pozycję, bo input pod spodem nie jest klikalny
    get checkboxLabel(){
        return $("div.checkbox-line label");
    }

    get deleteSelectedLabel() {
        return $("div#usun a")
    }

    get deletedAlertMessage(){
        return $("div.infobox > p")
    }

    async getDeletedAlertMessageValue():Promise<string> {
        const alert = await this.deletedAlertMessage;
        await alert.waitForDisplayed();
        return await alert.getText();
    }

    async acceptDeleteAlert(){
        await browser.acceptAlert();
    }


    // klika "usuń zaznaczone" - MUSI to być prawdziwy klik WebDrivera (nie klik przez JS/
    // execute), bo alert confirm() wywołany w wyniku "nieufnego" (nie pochodzącego od
    // użytkownika) kliknięcia w ogóle się nie pojawia w przeglądarce - sprawdzone przez
    // _debug.ts: JS-owy el.click() nie generuje żadnego alertu, mimo że link realnie
    // reaguje na klik. scrollIntoView({block: 'center'}) zamiast domyślnego wyrównania do
    // góry, żeby element nie chował się pod sticky nagłówkiem (div.header-container),
    // co wcześniej powodowało "element click intercepted".
    async clickOnDeleteSelectedLabel(){
        const label = await this.deleteSelectedLabel;
        await label.waitForDisplayed();
        await label.scrollIntoView({ block: "center" });
        await label.click();
    }



    // krok akcji: zaznacza checkbox pozycji w koszyku - czeka, aż prawdziwy input będzie
    // widoczny, ale klika w jego <label> (patrz checkboxLabel), bo sam input nie jest
    // interaktywny. scrollIntoView({block: 'center'}) z tego samego powodu co w
    // clickOnDeleteSelectedLabel - unika przesłonięcia przez sticky nagłówek.
    async clickOnCheckbox() {
        const checkbox = await this.checkbox;
        await checkbox.waitForDisplayed();
        await checkbox.scrollIntoView({ block: "center" });
        const label = await this.checkboxLabel;
        await label.click();
    }


    // czeka aż suma koszyka (totalPrice) będzie widoczna i zwraca jej tekst
    async getTotalPriceValue():Promise<string> {
        const price = await this.totalPrice;
        await price.waitForDisplayed();
        return await  price.getText();
    }

    // czeka aż komunikat potwierdzający (successAlert) będzie widoczny i zwraca jego tekst
    // służy do sprawdzenia, że do koszyka trafił właściwy produkt (używane w TEST 3 w Products.ts)
    async getSuccessAlertValue():Promise<string>{
        const alert = await this.successAlert;
        await alert.waitForDisplayed();
        return await alert.getText();
    }

}

// eksport gotowej (singleton) instancji, żeby w testach korzystać z CartPage.metoda(...)
// bez ręcznego tworzenia obiektu przez `new CartPage()`
export default new CartPage();
