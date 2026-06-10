import { alertHomePage } from "../../lib/pages";

describe("Lesson 5  - Alerts", async() => {
    it("should open alert home page and verify url", async () => {
        await browser.url(alertHomePage);
        await expect(browser).toHaveUrl(alertHomePage);
    })
    it("Should handle consent popup", async () => {
        try {
            const consentBtn = $("button=Consent");
            await consentBtn.waitForDisplayed({ timeout: 5000 });
            await consentBtn.click();
        } catch {
            console.log("Brak popupu consent - kontynuuję");
        }
    })
    it("Should click on the button and get text on the alert", async() => {
        await browser.url(alertHomePage);
        const button = $(".btn-danger");
        await button.click();
        const alertText:string = await browser.getAlertText();
        console.log(alertText);
    })
})


