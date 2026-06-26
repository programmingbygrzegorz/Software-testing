// Samodzielny skrypt Node.js (NIE jest to test Playwright - nie używa "test()" z @playwright/test).
// Służy do ręcznej diagnostyki: sprawdza czy zdarzenie "mouseover" na konkretnym
// elemencie strony HTML faktycznie wywołuje kod JavaScript (np. console.log).
//
// Jak odpalić (z katalogu PLAYWRIGHTAUTOMATION, bo tam jest paczka "playwright" w node_modules):
//   node wlasneskrypty/checkhover.js

// chromium - moduł Playwright który umożliwia programowe sterowanie przeglądarką Chrome/Chromium
const { chromium } = require('playwright');

(async () => {
  // launch() - otwiera nową, niewidoczną (headless) instancję przeglądarki
  const browser = await chromium.launch();
  // newPage() - otwiera nową kartę (taką jak nowa zakładka w przeglądarce)
  const page = await browser.newPage();

  // nasłuchuje na zdarzenie "console" - przechwytuje WSZYSTKIE console.log/warn/error
  // wykonane przez JavaScript na stronie i wypisuje je też w terminalu Node.js
  page.on('console', msg => console.log('CONSOLE:', msg.text()));
  // nasłuchuje na błędy JS które wystąpiły podczas wykonywania skryptów na stronie
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  // ścieżka do lokalnego pliku HTML otwierana jako URL "file:///"
  // (tak jakby wkleić tę ścieżkę w pasek adresu przeglądarki)
  const filePath = 'file:///C:/Projekty/Testowanie oprogramowania/CSS/index.html';
  console.log('Opening:', filePath);
  // goto() - nawiguje przeglądarkę do podanego adresu i czeka aż strona się wczyta
  await page.goto(filePath);

  // locator() - znajduje element na stronie po selektorze CSS (tu: po id="buy-ticket")
  const btn = page.locator('#buy-ticket');
  // count() - ile elementów odpowiada selektorowi (powinno być 1)
  console.log('Button count:', await btn.count());
  // isVisible() - czy element jest widoczny na stronie (nie display:none, nie poza ekranem itp.)
  console.log('Button visible:', await btn.isVisible());

  // scrollIntoViewIfNeeded() - przewija stronę tak żeby element był w widocznym obszarze
  // (potrzebne bo prawdziwa przeglądarka nie może "najechać" na element poza ekranem)
  await btn.scrollIntoViewIfNeeded();
  // hover() - symuluje fizyczne przesunięcie kursora myszki na środek elementu
  // — to właśnie wyzwala zdarzenie "mouseover" zarejestrowane w addeventlistener.js
  await btn.hover();
  // krótka pauza żeby dać czas na wykonanie się ewentualnego console.log w odpowiedzi na hover
  await page.waitForTimeout(500);

  // close() - zamyka przeglądarkę i zwalnia zasoby
  await browser.close();
})();
