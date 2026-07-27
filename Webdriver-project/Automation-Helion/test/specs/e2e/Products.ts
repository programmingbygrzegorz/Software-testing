// fraza użyta do wyszukania produktów
import { searchPhrase } from "../../config/data";
// URL strony głównej oraz oczekiwany URL wyników wyszukiwania dla searchPhrase
import { helionHomeUrl, searchProduct, cartUrl } from "../../config/pageUrl";
// PageObject searchbara - wpisywanie frazy i klikanie ikony wyszukiwania
import SearchbarPage from "../../pages/components/SearchbarPage";
// PageObject strony wyników wyszukiwania - dostęp do listy znalezionych książek
import SearchResultPage from "../../pages/SearchResultPage";
// PageObject strony produktu - tytuł produktu i przycisk "Dodaj do koszyka"
import ProductPage from "../../pages/ProductPage"
// PageObject strony koszyka - odczyt komunikatu potwierdzającego dodanie produktu
import CartPage from "../../pages/CartPage";



describe("E2E - Products", async() => {

    // tytuł produktu odczytany w TEST 2, wykorzystywany później w TEST 3 do sprawdzenia,
    // że komunikat w koszyku dotyczy właśnie tego produktu - "let", bo jest przypisywany
    // dopiero wewnątrz testu (nie da się tego zrobić dla "const")
    let productTitle: string = "";
    // cena produktu odczytana w TEST 2, na razie tylko wypisywana w konsoli (console.log)
    // w TEST 3 - miejsce na przyszłą asercję ceny w koszyku
    let price: string = "";
    // hook wykonywany raz przed wszystkimi testami w tym pliku: otwiera stronę główną Helion,
    // żeby każdy kolejny test zaczynał się od tego samego, znanego stanu przeglądarki
    before(async () => {
        await browser.url(helionHomeUrl)
    })

    // ============================================================================
    // TEST 1 - wpisuje frazę w searchbarze i wysyła wyszukiwanie przez kliknięcie ikony
    // lupki (a nie przez popup podpowiedzi, jak w Searchbar.ts) - sprawdza, że przeglądarka
    // nawiguje na spodziewaną stronę wyników (searchProduct z config/pageUrl.ts).
    // ============================================================================
    it("Should type search phrase and click search icon", async() =>{
        // krok 1: wpisuje searchPhrase ("testowanie oprogramowania") w pole wyszukiwania
        await SearchbarPage.typeSearchPhrase(searchPhrase);
        // krok 2: klika ikonę wyszukiwania, żeby wysłać zapytanie
        await SearchbarPage.clickSearchIcon();
        // krok 3: sprawdza, że przeglądarka trafiła na stronę wyników dla wpisanej frazy
        await expect(browser).toHaveUrl(searchProduct);
    })

    // ============================================================================
    // TEST 2 - kontynuacja TEST 1: na stronie wyników (na którą TEST 1 nawigował) klika
    // w pierwszą książkę z listy, żeby przejść na jej stronę produktową, sprawdza że
    // kluczowe elementy tej strony są widoczne i zapamiętuje tytuł oraz cenę produktu
    // (productTitle, price) do wykorzystania w TEST 3. Zależny od TEST 1 - jeśli tamten
    // nie zdąży nawigować, ten test nie znajdzie listy książek do kliknięcia.
    // ============================================================================
    it("Should click on first book", async() =>{
        // krok 1: klika w pierwszy element listy wyników (SearchResultPage.firstBookItem)
        await SearchResultPage.clickOnFirstBookItem();
        // krok 2: sprawdza, że tytuł produktu (div.title-group > h1) jest widoczny na stronie
        await ProductPage.productTitleIsVisible();
        // krok 3: sprawdza, że przycisk "Dodaj do koszyka" (a.addToBasket) jest widoczny
        await ProductPage.addToCartBtnIsVisible();
        // krok 4: zapamiętuje tekst tytułu produktu we współdzielonej zmiennej productTitle,
        // żeby TEST 3 mógł sprawdzić, czy komunikat w koszyku dotyczy tego samego produktu
        productTitle = await ProductPage.getProductTitleValue();
        // krok 5: zapamiętuje cenę produktu (#cena_d) we współdzielonej zmiennej price
        price = await ProductPage.getProductPrice();
    })

    // ============================================================================
    // TEST 3 - kontynuacja TEST 2: na stronie produktu (na którą TEST 2 nawigował) klika
    // przycisk "Dodaj do koszyka", sprawdza że przeglądarka trafia na stronę koszyka
    // (cartUrl z config/pageUrl.ts), i że komunikat potwierdzający w koszyku wspomina
    // tytuł produktu zapamiętany w TEST 2 (productTitle). Zależny od TEST 2.
    // ============================================================================
    it("Should click on add to cart button", async () => {
        // krok 1: klika przycisk "Dodaj do koszyka" (czeka aż będzie widoczny, dopiero potem klika)
        await ProductPage.clickOnAddToCartBtn();
        // krok 2: sprawdza, że przeglądarka nawigowała na stronę koszyka
        await expect(browser).toHaveUrl(cartUrl);
        // krok 3: sprawdza, że komunikat potwierdzający (div.successbox.oneline > p) zawiera
        // tytuł produktu dodanego w TEST 2 - potwierdza, że do koszyka trafił właściwy produkt
        await expect(await CartPage.getSuccessAlertValue()).toContain(productTitle);
        // krok 4: cena zapamiętana w TEST 2 - na razie tylko wypisana w konsoli (bez asercji)
        console.log(price);
    })

})