// PageObject z uniwersalną metodą do otwierania strony i weryfikacji jej URL
import GlobalPage from "../../pages/GlobalPage";
// URL strony głównej Helion
import {helionHomeUrl, searchPageUrl} from "../../config/pageUrl";
// fraza użyta do przetestowania wyszukiwarki
import {incorrectSearchPhrase, notFoundMessage, searchPhrase, searchResultTitle,} from "../../config/data";
// PageObject searchbara - selektory i akcje związane z wyszukiwarką w nagłówku
import SearchBarPage from "../../pages/components/SearchbarPage";

// PageObject strony wyników wyszukiwania - odczyt tytułu wyników
import SearchResultPage from "../../pages/SearchResultPage";



describe ("E2E Searchbar", () => {

    // ============================================================================
    // TEST 1 - punkt wyjścia dla całego scenariusza: wchodzimy na stronę główną
    // Helion i upewniamy się, że pasek wyszukiwania w ogóle jest widoczny, zanim
    // w kolejnych testach zaczniemy w nim cokolwiek robić.
    // ============================================================================
    it("Should open Helion home page and display a visible search bar", async () => {
        // krok 1: nawiguje pod helionHomeUrl i sprawdza, że przeglądarka faktycznie tam wylądowała
        await GlobalPage.openPage(helionHomeUrl, helionHomeUrl);
        // krok 2: sprawdza, że pole wyszukiwania (#header-search-text) jest widoczne na stronie
        await SearchBarPage.searchBarIsVisible();
    });

    // ============================================================================
    // TEST 2 - sprawdza walidację formularza: pole wyszukiwania ma atrybut "required",
    // więc kliknięcie lupki bez wpisanej frazy nie powinno nigdzie nawigować.
    // ============================================================================
    it("Should stay on the home page when clicking search icon with an empty search field", async () => {
        // klika w ikonę lupki, nic wcześniej nie wpisując w pole wyszukiwania
        await SearchBarPage.clickSearchIcon();
        // sprawdza, że URL się NIE zmienił - przeglądarka zablokowała wysłanie pustego formularza
        await expect(browser).toHaveUrl(helionHomeUrl);
    });

    // ============================================================================
    // TEST 3 - symuluje wpisywanie frazy przez użytkownika i sprawdza, że strona
    // reaguje na to podpowiedziami (typowe "auto-suggest" pod polem wyszukiwania).
    // ============================================================================
    it("Should show the suggestion popup after typing a search phrase", async () => {
         // krok 1: wpisuje searchPhrase ("testowanie oprogramowania") w pole wyszukiwania
         await SearchBarPage.typeSearchPhrase(searchPhrase);
         // krok 2: czeka, aż pod polem pojawi się popup z podpowiedziami (.suggest-list)
         await SearchBarPage.suggestPopupIsVisible();
        });

    // ============================================================================
    // TEST 4 - kontynuacja TEST 3: w popupie podpowiedzi jest link "Wszystkie",
    // prowadzący do pełnej listy wyników. Test klika w niego i sprawdza nawigację.
    //
    // UWAGA na flakiness: strona helion.pl aktualizuje href tego linku asynchronicznie,
    // w miarę wpisywania kolejnych znaków (odpowiedzi AJAX mogą wrócić nie po kolei),
    // dlatego zanim klikniemy, czekamy aż link "dogoni" pełną wpisaną frazę - inaczej
    // kliknięcie mogłoby przenieść na wyniki dla niepełnego, wpisywanego w danym
    // momencie tekstu. Mimo to test bywa czasem czerwony na żywej stronie (patrz
    // komentarz przy SearchBarPage.waitForSeeAllBooksLinkToMatchPhrase).
    // ============================================================================
    it("Should navigate to the search results page when clicking the \"see all books\" link", async () => {
         // krok 1: czeka aż href linku "Wszystkie" zawiera pełną frazę searchPhrase
         await SearchBarPage.waitForSeeAllBooksLinkToMatchPhrase(searchPhrase);
         // krok 2: klika w link "Wszystkie" (przewija do niego widok i klika)
         await SearchBarPage.clickOnSeeAllBookBtn();
         // krok 3: sprawdza, że przeglądarka nawigowała na stronę wyników (searchPageUrl)
         await expect(browser).toHaveUrl(searchPageUrl);

    });

    // ============================================================================
    // TEST 5 - ostatni krok scenariusza: na stronie wyników (na którą przenieśliśmy
    // się w TEST 4) sprawdza, czy treść strony faktycznie odpowiada wyszukanej frazie.
    // Zależny od TEST 4 - jeśli tamten nie zdąży nawigować, ten test też padnie,
    // bo będzie szukał tytułu/listy książek wciąż na stronie głównej.
    // ============================================================================
    it("Should display the correct title and number of books on the search results page", async () => {
         // krok 1: odczytuje tekst nagłówka H1 (div#page-title > h1) ze strony wyników
         const title: string = await SearchResultPage.getPageTitle();
         // krok 2: sprawdza, że nagłówek zawiera oczekiwany tekst - potwierdza, że strona
         // "wie", czego szukaliśmy (searchResultTitle = 'Szukasz "testowanie oprogramowania"')
         await expect(title).toContain(searchResultTitle)
         // krok 3: liczy elementy listy wyników (ul.list > li)
         const numberOfBooks = await SearchResultPage.getNumberOfBooks();
         // krok 4: sprawdza, że liczba znalezionych książek to dokładnie 25
         // (wartość zweryfikowana ręcznie na żywej stronie dla tej konkretnej frazy;
         // jeśli Helion doda/usunie pasującą książkę, ta liczba się zdezaktualizuje)
         await expect (numberOfBooks).toEqual(25);

         
    });

    // ============================================================================
    // TEST 6 - niezależny od poprzednich testów w sensie logiki biznesowej (nie sprawdza
    // wyników wyszukiwania), ale nadal działa na tej samej sesji przeglądarki, więc pole
    // wyszukiwania (#header-search-text) może wciąż zawierać frazę z TEST 3. Test korzysta
    // z SearchBarPage.clearSearchBar() (czyści pole) i getInputValue() (odczytuje wartość),
    // żeby potwierdzić, że pole da się wyczyścić i po czyszczeniu jest faktycznie puste.
    // ============================================================================
    it("Should clear input value", async () =>{
        // krok 1: czyści zawartość pola wyszukiwania (mogła w nim zostać fraza z TEST 3)
        await SearchBarPage.clearSearchBar();
        // krok 2: odczytuje wartość pola i sprawdza, że jest pusta (toContain("") jest zawsze
        // prawdziwe dla pustego stringa, więc realnie sprawdza brak wyjątku przy odczycie)
        await expect(await SearchBarPage.getInputValue()).toContain("");
    })

    // ============================================================================
    // TEST 7 - scenariusz negatywny: wyszukanie frazy, która nie pasuje do żadnej książki
    // (incorrectSearchPhrase = "blablablabla" z config/data.ts). Zamiast przechodzić przez
    // popup podpowiedzi (jak TEST 3/4), test od razu klika ikonę lupki (SearchBarPage.clickSearchIcon),
    // co wysyła pełny formularz wyszukiwania i przenosi na stronę wyników. Tam, zamiast listy
    // książek, strona pokazuje komunikat div.not-found z tekstem "Nie znaleziono szukanej frazy"
    // (notFoundMessage z config/data.ts) - dokładnie ten komunikat test weryfikuje.
    // ============================================================================
    it("Should type incorrect book name and verify alert ", async () =>{
        // krok 1: wpisuje frazę, która nie pasuje do żadnej książki (incorrectSearchPhrase)
        await SearchBarPage.typeSearchPhrase(incorrectSearchPhrase)
        // krok 2: klika ikonę wyszukiwania, żeby wysłać zapytanie (nawiguje na stronę wyników)
        await SearchBarPage.clickSearchIcon();
        // krok 3: czeka na komunikat "brak wyników" (div.not-found) i sprawdza jego treść
        await expect(await SearchBarPage.getNotFoundAlertText()).toContain(notFoundMessage);
    })

    // ============================================================================
    // TEST 8 - podobnie jak TEST 2, sprawdza kliknięcie ikony lupki z pustym polem
    // wyszukiwania, ale tym razem pole jest najpierw jawnie czyszczone (na wypadek gdyby
    // zostało w nim coś z TEST 7). browser.pause(4000) daje czas na obejrzenie efektu
    // w przeglądarce - nie jest to jednak asercja, więc test przejdzie nawet jeśli
    // kliknięcie coś zepsuje; brakuje tu sprawdzenia (np. że URL się nie zmienił, jak
    // w TEST 2), więc realnie test niczego jeszcze nie weryfikuje.
    // ============================================================================
    it("Should clear input value and click on search icon", async () => {
        // krok 1: czyści pole wyszukiwania
        await SearchBarPage.clearSearchBar();
        // krok 2: klika ikonę wyszukiwania z pustym polem
        await SearchBarPage.clickSearchIcon();
        // krok 3: pauza 4s (do ręcznej obserwacji) - TODO: zastąpić realną asercją
        await browser.pause(4000)

    })

});
