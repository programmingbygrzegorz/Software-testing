// PageObject z uniwersalną metodą do otwierania strony i weryfikacji jej URL
import GlobalPage from "../../pages/GlobalPage";
// URL strony głównej Helion
import {helionHomeUrl, searchPageUrl} from "../../config/pageUrl";
// fraza użyta do przetestowania wyszukiwarki
import {searchPhrase} from "../../config/data";
// PageObject searchbara - selektory i akcje związane z wyszukiwarką w nagłówku
import SearchBarPage from "../../pages/components/SearchbarPage";

// PageObject strony wyników wyszukiwania - odczyt tytułu wyników
import SearchResultPage from "../../pages/SearchResultPage";



describe ("E2E Searchbar", () => {

    // TEST 1: otwiera stronę główną Helion i sprawdza, czy searchbar jest na niej widoczny
    it("Should open helio home page and verify ul and visible searchbar", async () => {
        // otwiera stronę główną Helion i sprawdza, czy przeglądarka faktycznie na niej wylądowała
        await GlobalPage.openPage(helionHomeUrl, helionHomeUrl);
        // sprawdza, że pole wyszukiwania jest widoczne na stronie
        await SearchBarPage.searchBarIsVisible();
    });

    // TEST 2: klika w ikonę wyszukiwania (bez wpisanej frazy) i sprawdza, że URL się nie zmienił
    // (pole jest wymagane - przeglądarka blokuje wysłanie pustego formularza)
    it("Should click search icon and verify url", async () => {
        await SearchBarPage.clickSearchIcon();
        await expect(browser).toHaveUrl(helionHomeUrl);
    });

    // TEST 3: wpisuje frazę w pole wyszukiwania i sprawdza, że pojawia się popup z podpowiedziami
    it(" Should type search value and verify visible popup", async () => {
         await SearchBarPage.typeSearchPhrase(searchPhrase);
         await SearchBarPage.suggestPopupIsVisible();
        });

    // TEST 4: klika w przycisk "Wszystkie" w popupie podpowiedzi i sprawdza, że przeglądarka
    // przenosi na stronę wyników wyszukiwania (searchPageUrl)
    it(" Should click see all books button", async () => {
         // czeka aż link "Wszystkie" zdąży się zaktualizować do pełnej frazy przed kliknięciem
         // (patrz komentarz w SearchbarPage.ts przy waitForSeeAllBooksLinkToMatchPhrase - strona
         // czasem aktualizuje ten link z opóźnieniem/nie po kolei, stąd ten test bywa flaky)
         await SearchBarPage.waitForSeeAllBooksLinkToMatchPhrase(searchPhrase);
         await SearchBarPage.clickOnSeeAllBookBtn();
         await expect(browser).toHaveUrl(searchPageUrl);

    });

    // TEST 5: na stronie wyników wyszukiwania odczytuje tytuł (H1) i wypisuje go w konsoli
    // TODO: brakuje asercji - test niczego jeszcze nie sprawdza, tylko loguje wynik
    it(" Should verify visible correctly title and number of  books", async () => {
         const title: string = await SearchResultPage.getPageTitle();
         console.log(title)

    });
});
