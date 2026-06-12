import { alertHomePage } from "../../lib/pages";

describe("Lesson 5  - Alerts", async() => {
    // TEST 1 - otwiera stronę z alertami i weryfikuje URL
    it("should open alert home page and verify url", async () => {
        // nawiguje do strony z alertami
        await browser.url(alertHomePage);
        // sprawdza czy URL strony jest poprawny
        await expect(browser).toHaveUrl(alertHomePage);
    })

    // TEST 2 - obsługa popupu zgody na cookies
    it("Should handle consent popup", async () => {
        try {
            // szuka przycisku "Consent" po tekście
            const consentBtn = $("button=Consent");
            // czeka aż przycisk będzie widoczny (max 5 sekund)
            await consentBtn.waitForDisplayed({ timeout: 5000 });
            // klika przycisk zgody
            await consentBtn.click();
        } catch {
            // popup nie pojawił się - kontynuuj dalej
            console.log("Brak popupu consent - kontynuuję");
        }
    })
/* Zadanie 2
    it("Should verify confirm alert", async () => {
        // znajduje zakładkę "Alert with OK & Cancel" używając XPath po tekście
        const tabConfigAlert = await $("//a[contains(text(),'Alert with OK & Cancel')]");
        // klika w zakładkę żeby przełączyć się na sekcję z confirm alertem
        await tabConfigAlert.click();
        // znajduje przycisk który wywołuje confirm alert (klasa btn-primary)
        const button = await $("button.btn-primary");
        // klika przycisk wywołując confirm alert z przyciskami OK i Cancel
        await button.click();
        // pobiera tekst z confirm alertu (treść komunikatu) - dowód że alert był otwarty
        const confirmText: string = await browser.getAlertText();
        // wypisuje tekst alertu w konsoli
        console.log(confirmText);
        // klika OK w confirm alercie - try/catch bo Chrome może go już auto-zamknąć
        try {
            await browser.acceptAlert();
        } catch {
            // Chrome już zamknął alert automatycznie
        }
        // sprawdza czy alert został zamknięty
        expect(await browser.isAlertOpen()).toBeFalsy();
    })

   
*/

//Ta sama metoda tylko dwa różne podejscia. Jedno css drugie path

//   //ul.nav-tabs > li:nth-child(2)
    //a[contains(text(),'Alert with OK & Cancel')] - xpath


//zadanie2 

it("Should verify confirm alert", async () => {
    // znajduje zakładkę "Alert with OK & Cancel" używając XPath po tekście
    const tabConfigAlert = $("//a[contains(text(), 'Alert with OK & Cancel')]");
    // klika zakładkę żeby przejść do sekcji z confirm alertem
    await tabConfigAlert.click();
    // znajduje przycisk który wywołuje confirm alert
    const button = $("button.btn-primary");
    // klika przycisk wywołując confirm alert z OK i Cancel
    await button.click();
    // klika Cancel w confirm alercie (odrzuca)
    await browser.dismissAlert();
    // znajduje element #demo który pokazuje wynik kliknięcia
    const p = await $("#demo")
    // pobiera tekst z elementu #demo
    const validationMessage: string = await p.getText();
    // wypisuje komunikat w konsoli
    console.log(validationMessage);
    // sprawdza czy tekst zawiera "You Pressed Cancel"
    expect(validationMessage).toContain("You Pressed Cancel")
});
   

    it("Should verify prompt alert", async () => {
        // znajduje zakładkę "Alert with Textbox" używając XPath po tekście
        const tabPromptAlert = await $("//a[contains(text(), 'Alert with Textbox ')]");
        // klika zakładkę żeby przejść do sekcji z prompt alertem
        await tabPromptAlert.click();
        // znajduje przycisk który otwiera prompt alert (pole tekstowe)
        const button = await $("button.btn-info");
        // klika przycisk wywołując prompt alert z polem do wpisania tekstu
        await button.click();
        // wpisuje tekst "Grzegorz" do pola w prompt alercie
        await browser.sendAlertText("Grzegorz");
        // klika OK akceptując prompt i potwierdzając wpisany tekst
        await browser.acceptAlert();
        // znajduje element #demo1 który wyświetla wynik po zamknięciu promptu
        const p = await $("#demo1");
        // sprawdza czy wyświetlony tekst zawiera wpisaną nazwę "Grzegorz"
        await expect(await p.getText()).toContain("Grzegorz");
    })
})


