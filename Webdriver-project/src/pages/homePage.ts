import { homeUrl, homeUrl2, homeUrl3 } from "../lib/pages";

class HomePage{

    async openHomePage(){
        await browser.url(homeUrl);
        await expect(browser).toHaveUrl(homeUrl);
    }

    async openHomePage2(){
        await browser.url(homeUrl2);
        await expect(browser).toHaveUrl(homeUrl2);
    }
    async openHomePage3(){
        await browser.url(homeUrl3);
        await expect(browser).toHaveUrl(homeUrl3);
    }
    
    get fbIcon(){
        return $(".social-link-inline");
    }

    async clickFbIcon(){
        await this.fbIcon.click();
    }

    async moveToFbIcon(){
        const icon = await this.fbIcon;
        await icon.waitForClickable({ timeout: 5000 });
        await icon.moveTo();
    }
    async verifyFacebookUrl() {
        await expect(browser).toHaveUrl(expect.stringContaining("facebook.com/dystans.trofea"));
    }

}

export default new HomePage();