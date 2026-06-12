import { uploaderUrl } from "../../lib/pages";

describe("Lesson 6 - Upload File", async() => {
    it("Should open upload page and verify url", async () => {
        await browser.url(uploaderUrl);
        await expect(browser).toHaveUrl(uploaderUrl);
    })
})