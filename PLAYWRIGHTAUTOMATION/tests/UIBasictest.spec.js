// import funkcji test i expect z biblioteki Playwright
// test - służy do definiowania pojedynczych testów
// expect - służy do tworzenia asercji (sprawdzania oczekiwanych warunków)
const { test, expect } = require('@playwright/test');

// TEST 1 - logowanie na stronie testowej: najpierw błędne dane, potem poprawne
test.only('Browser Context Playwright test', async ({ browser }) => {
    // browser - cała instancja przeglądarki udostępniona przez fixture Playwright
    // newContext() tworzy nowy, izolowany kontekst (jak osobne okno incognito)
    const context = await browser.newContext();

    // newPage() otwiera nową kartę w tym kontekście
    const page = await context.newPage();

    // lokatory pól/przycisków używane wielokrotnie w teście
    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');

    // nawiguje do strony testowej do praktyki logowania
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());

    // --- KROK 1: logowanie na celowo błędny login (poprawne jest "rahulshettyacademy") ---
    await userName.type('rahulshetty');
    await page.locator("[type='password']").type('learning');
    await signIn.click();

    // po nieudanym logowaniu strona odkrywa ukryty wcześniej div z błędem
    // (selektor [style*='block'] łapie element, który stał się widoczny: display:block)
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    // --- KROK 2: poprawiamy login na właściwy i logujemy się ponownie ---
    // type - symuluje wpisywanie znak po znaku, fill - wstawia tekst od razu
    await userName.fill('');
    await userName.fill('rahulshettyacademy');
    await signIn.click();

    // po poprawnym logowaniu wypisuje tekst linku z sekcji ".card-body"
    console.log(await page.locator('.card-body a').textContent());
});
