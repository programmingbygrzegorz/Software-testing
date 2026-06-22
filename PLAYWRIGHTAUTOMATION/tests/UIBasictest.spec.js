// import funkcji test i expect z biblioteki Playwright
// test - służy do definiowania pojedynczych testów
// expect - służy do tworzenia asercji (sprawdzania oczekiwanych warunków)
const {test, expect} = require('@playwright/test');

// TEST 1 - demonstracja ręcznego tworzenia kontekstu przeglądarki
test('Browser Context Playwright test', async ({browser})=>
{
    // browser - cała instancja przeglądarki (np. Chromium) udostępniona przez fixture Playwright
    // newContext() tworzy nowy, izolowany kontekst (jak osobne okno incognito)
    // — własne cookies, cache, local storage, niezależne od innych testów
    const context = await browser.newContext();
    // newPage() otwiera nową kartę w tym kontekście
    const page = await context.newPage();
    // nawiguje do strony testowej do praktyki logowania
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    // wypisuje w konsoli tytuł aktualnie otwartej strony
    console.log(await page.title());
});

// TEST 2 - demonstracja gotowego fixture "page" (uproszczone podejście)
test('Page Playwright test', async ({page})=>
{
    // page - fixture Playwright automatycznie tworzy kontekst i kartę za nas
    // (linie niżej są zakomentowane, bo to dokładnie to co "page" robi pod maską)
    //const context = await browser.newContext();
    //const page = await context.newPage();
    // nawiguje do Google
    await page.goto("https://google.com/");
    // wypisuje w konsoli tytuł aktualnie otwartej strony
    console.log(await page.title());
    // asercja: sprawdza czy tytuł strony to dokładnie "Google"
    await expect(page).toHaveTitle("Google");
});
