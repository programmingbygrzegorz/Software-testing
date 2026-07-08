//korzystamy z klasy HomePage zamiast bezpośredniego użycia browser.url() i expect(browser).toHaveUrl()
//import { homeUrl2 } from "../../lib/pages";

import HomePage from "../../pages/homePage";

describe("Lesson 7 - Moveto, MoveIntoView", async () => {

    // TEST 1 - otwiera stronę sklepu PrestaShop i weryfikuje URL
    it("Should open automation practice page and verify url", async () => {
        // nawiguje do strony głównej sklepu PrestaShop
        
        //zamieniamy na wywołanie metody z klasy HomePage zamiast bezpośredniego użycia browser.url()
        //await browser.url(homeUrl2);
        
        // asercja: sprawdza czy przeglądarka jest na właściwym URL
        //zamieniamy na wywołanie metody z klasy HomePage zamiast bezpośredniego użycia expect(browser).toHaveUrl()
        //await expect(browser).toHaveUrl(homeUrl2);

        // użycie metody z klasy HomePage zamiast bezpośredniego użycia browser.url() i expect(browser).toHaveUrl()
        await HomePage.openHomePage2();

        // popup newslettera pojawia się z opóźnieniem po załadowaniu strony
        // try/catch: jeśli popup nie pojawi się w ciągu 5s, test przechodzi dalej
        try {
            const closeBtn = $("a.fancybox-close");
            // czeka maksymalnie 5 sekund na pojawienie się przycisku zamknięcia popup
            await closeBtn.waitForDisplayed({ timeout: 5000 });
            // klika X żeby zamknąć popup newslettera przed dalszymi testami
            await closeBtn.click();
        } catch {
            console.log("Brak popup newslettera - kontynuuję");
        }
    })

    // TEST 2 - demonstracja scrollIntoView(): przewija stronę do elementu poza ekranem
    it("Should scroll into view Subskrybuj", async () => {
        // pole "Zapisz się" do newslettera znajduje się na dole strony — poza ekranem
        const newsletterInput = $('input[name="submitNewsletter"]');
        // scrollIntoView() przewija stronę tak żeby element stał się widoczny w viewport
        await newsletterInput.scrollIntoView();
        // asercja: sprawdza czy element jest wyświetlony po przewinięciu
        await expect(newsletterInput).toBeDisplayed();
    })

    // TEST 3 - demonstracja moveTo(): hover na kategorię i przejście do podkategorii
    it("Should hover on Electronics category and open Computers & Laptops page", async () => {
        // przewija stronę z powrotem na górę — test 2 zjechał na dół strony
        await browser.execute(() => window.scrollTo(0, 0));
        await browser.pause(300);

        // Problem z tym motywem PrestaShop: w DOM są DWA li#CAT_1_18
        //   [1] = mobilna nawigacja (display:none na desktopie) — brak rozmiaru
        //   [2] = desktopowa nawigacja (widoczna) — MA rozmiar, moveTo() działa
        // XPath [2] wybiera DRUGI element = desktopowy link SHOP
        const shopLink = $('(//li[@id="CAT_1_18"]/a)[2]');
        // moveTo() przesuwa kursor myszki na link SHOP w desktopowej nawigacji
        await shopLink.moveTo();
        // asercja: sprawdza czy link SHOP jest wyświetlony (jest w viewport)
        await expect(shopLink).toBeDisplayed();
        await browser.pause(500);

        // moveTo() wyzwala zdarzenia myszy ale JS tego motywu nie reaguje na mouseenter
        // — otwieramy podmenu SHOP bezpośrednio przez JavaScript
        // jednocześnie usuwamy target="_blank" z linku żeby nie otwierał nowej zakładki
        await browser.execute(() => {
            // pobiera div podmenu SHOP z desktopowej nawigacji
            const submenu = document.querySelector('#_desktop_top_menu #top_sub_menu_CAT_1_18') as HTMLElement;
            if (submenu) {
                // Bootstrap collapse: usunięcie klasy "collapse" + dodanie "show" otwiera element
                submenu.classList.remove('collapse');
                submenu.classList.add('show');
                // wymusza widoczność nadpisując inline style
                submenu.style.display = 'block';
                submenu.style.visibility = 'visible';
            }
            // usuwa target="_blank" żeby kliknięcie nie otwierało nowej zakładki
            const link = document.querySelector('#_desktop_top_menu li#CAT_1_22 > a.dropdown-item') as HTMLElement;
            link?.removeAttribute('target');
        });
        await browser.pause(500);

        // w podmenu SHOP szukamy li#CAT_1_22 = "Computers & Laptops"
        const computersLink = $('#_desktop_top_menu li#CAT_1_22 > a.dropdown-item');
        // waitForExist() czeka aż element pojawi się w DOM
        // (nie sprawdza widoczności CSS — element ma brak rozmiaru mimo display:block na rodzicu)
        await computersLink.waitForExist({ timeout: 5000 });

        // klikamy przez JavaScript bo WebDriver wymaga rozmiaru > 0 do kliknięcia
        // — element istnieje w DOM i ma poprawny href, ale CSS podmenu nadal daje mu size=0
        await browser.execute(() => {
            const link = document.querySelector('#_desktop_top_menu li#CAT_1_22 > a.dropdown-item') as HTMLAnchorElement;
            link?.click();
        });

        // asercja: sprawdza czy URL po kliknięciu zawiera identyfikator podkategorii
        await expect(browser).toHaveUrl("22-computers-laptops", { containing: true });
    });
})
