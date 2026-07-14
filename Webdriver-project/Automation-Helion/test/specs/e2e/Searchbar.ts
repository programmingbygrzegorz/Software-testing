// PageObject z uniwersalną metodą do otwierania strony i weryfikacji jej URL
import GlobalPage from "../../pages/GlobalPage";
// URL strony głównej Helion
import {helionHomeUrl} from "../../config/pageUrl";
import {searchPhrase} from "../../config/data";
import SearchBarPage from "../../pages/components/SearchbarPage";



describe ("E2E Searchbar", () => {
    it("Should open helio home page and verify ul and visible searchbar", async () => {
        // otwiera stronę główną Helion i sprawdza, czy przeglądarka faktycznie na niej wylądowała
        await GlobalPage.openPage(helionHomeUrl, helionHomeUrl);
        await SearchBarPage.searchBarIsVisible();
    });
    it("Should click search icon and verify url", async () => {
        await SearchBarPage.clickSearchIcon();
        await expect(browser).toHaveUrl(helionHomeUrl);
    });
    it(" Should type search value and verify visible popup", async () => {
         await SearchBarPage.typeSearchPhrase(searchPhrase);
         await SearchBarPage.suggestPopupIsVisible();
        });
    it(" Should click see all books button", async () => {
         await SearchBarPage.clickOnSeeAllBookBtn();

    });
});
