import { homeUrl2 } from "../../lib/pages";


describe("Lesson 7 - Moveto, MoveIntoView", async () => {
    it("Should open automation practice page and verify url", async () => {
        await browser.url(homeUrl2);
        await expect(browser).toHaveUrl(homeUrl2);
    })

    it("Should scroll into view Subskrybuj", async () => {
        const fbIcon = await $('input[name="submitNewsletter"]');
        await fbIcon.scrollIntoView();
       
    })

    it("Should hover on Electronics category and open Computers & Laptops page", async () => {
        // przewija stronę z powrotem na górę (poprzedni test zjechał na dół)
        await browser.execute(() => window.scrollTo(0, 0));
        const category = $("li#CAT_1_19 > a");
        await category.moveTo();

        const computersLink = $('a.menu-tab-a[href*="22-computers-laptops"]');
        await computersLink.waitForDisplayed();
        await computersLink.click();

        const url = await browser.getUrl();
        expect(url).toContain("22-computers-laptops");
    })
})