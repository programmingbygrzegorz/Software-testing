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
