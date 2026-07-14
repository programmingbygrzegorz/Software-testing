// PageObject wspólny dla wszystkich stron - metody uniwersalne, niezależne od konkretnej podstrony.
// Dzięki temu zamiast wołać w każdym teście browser.url() i expect(browser).toHaveUrl() osobno,
// spec woła jedną metodę GlobalPage.openPage(...).
class GlobalPage {
    // pageUrl - adres, pod który ma wejść przeglądarka
    // expectedPageUrl - adres, który powinien być w pasku przeglądarki po wejściu (np. po przekierowaniu może się różnić od pageUrl)
    async openPage(pageUrl: string, expectedPageUrl: string) {
        // 1. nawigacja - otwiera podany adres w bieżącej sesji przeglądarki
        await browser.url(pageUrl);
        // 2. asercja - czeka aż URL przeglądarki zgodzi się z oczekiwanym i rzuca błąd, jeśli tak się nie stanie
        await expect(browser).toHaveUrl(expectedPageUrl);
    }
}

// eksport gotowej (singleton) instancji, żeby w testach korzystać z GlobalPage.openPage(...)
// bez ręcznego tworzenia obiektu przez `new GlobalPage()`
export default new GlobalPage();