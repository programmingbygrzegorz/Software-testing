import HomePage from "../../pages/homePage";

describe('Verify Home Page Google', async () => {
    it('should open google page and wait for 3000 ms', async () => {

        //zmieniemy na PageObject i korzystamy z metody openHomePage3() z klasy HomePage zamiast bezpośredniego użycia browser.url() i expect(browser).toHaveUrl()
        //await browser.url('https://www.google.com/');
        await HomePage.openHomePage3();
        //const fbIcon = $(".social-link-inline");
        //await fbIcon.click();
        await HomePage.moveToFbIcon();
        await HomePage.clickFbIcon();
    
        
        //await browser.pause(3000);
        // zdeklarowana w PageObject asercja sprawdzająca czy przeglądarka jest na właściwym URL
        //await expect(browser).toHaveUrl(expect.stringContaining("facebook.com/dystans.trofea"));
        await HomePage.verifyFacebookUrl();
        
    });
});