// ============================================================================
// TESTY AUTOMATYCZNE - Strona główna Onet.pl
// ============================================================================
// Ten plik zawiera zestaw testów smoke (dymnych) sprawdzających, czy strona
// główna onet.pl działa poprawnie i zawiera kluczowe elementy strukturalne.
//
// Framework: NUnit (organizacja i uruchamianie testów)
// Biblioteka: Selenium WebDriver (sterowanie przeglądarką Chrome)
//
// Co jest sprawdzane:
//   1. Czy strona się ładuje i ma poprawny tytuł oraz adres URL
//   2. Czy menu nawigacyjne jest widoczne na stronie
//   3. Czy strona zawiera elementy <header> i <footer>
//   4. Czy element menu jest obecny w kodzie strony (po klasie CSS)
//   5. Czy na stronie znajduje się wystarczająca liczba linków (>10)
//
// Przed każdym testem otwierana jest nowa przeglądarka Chrome (SetUp),
// a po jego zakończeniu przeglądarka jest zamykana (TearDown).
// Baner cookies (RODO) jest automatycznie akceptowany, jeśli się pojawi.
// ============================================================================

// ===== IMPORTY (odpowiednik "import" w Pythonie) =====

using NUnit.Framework;              // Framework testowy - dostarcza [Test], [SetUp], Assert.That itd.
using OpenQA.Selenium;              // Podstawowe klasy Selenium: IWebDriver, By (sposoby szukania elementów)
using OpenQA.Selenium.Chrome;       // Konkretnie sterownik przeglądarki Chrome (ChromeDriver)
using OpenQA.Selenium.Support.UI;   // Narzędzia do czekania: WebDriverWait
using System;                       // Podstawowe narzędzia C#: obsługa czasu (TimeSpan), wyjątków (Exception)

// Przestrzeń nazw - "pojemnik" grupujący cały nasz kod, żeby uniknąć konfliktów nazw z innymi projektami
namespace OnetTestsCSharp
{
    // Atrybut [TestFixture] mówi NUnit: "ta klasa zawiera testy, sprawdź ją"
    // To odpowiednik tego, że w pytest klasa zaczynająca się od "Test" jest automatycznie testowa
    [TestFixture]
    public class TestOnetSearch
    {
        // Pole klasy - zmienna dostępna we WSZYSTKICH metodach tej klasy (nie tylko w jednej)
        // "private" = dostępna tylko wewnątrz tej klasy
        // "IWebDriver" = typ zmiennej - musimy jawnie zadeklarować, że będzie przechowywać obiekt sterujący przeglądarką
        private IWebDriver driver;

        // ===== SETUP - wykonuje się PRZED każdym pojedynczym testem =====
        // To odpowiednik części "przed yield" z Pythonowej fixture
        [SetUp]
        public void SetUp()
        {
            // "new ChromeDriver()" = stwórz nowy obiekt, który otwiera nowe okno przeglądarki Chrome
            // "new" w C# zawsze poprzedza tworzenie nowego obiektu (w Pythonie po prostu wywoływałeś klasę)
            driver = new ChromeDriver();

            // Powiększenie okna przeglądarki na cały ekran
            // (odpowiednik drv.maximize_window() z Pythona)
            driver.Manage().Window.Maximize();
        }

        // ===== TEARDOWN - wykonuje się PO każdym pojedynczym teście =====
        // To odpowiednik części "po yield" z Pythonowej fixture (czyli drv.quit())
        [TearDown]
        public void TearDown()
        {
            // Zamyka wszystkie okna przeglądarki i kończy sesję WebDrivera
            driver.Quit();

            // Zwalnia zasoby systemowe samego obiektu .NET (pliki, uchwyty)
            // NUnit wymaga tego jawnie, bo IWebDriver "obiecuje" że będzie poprawnie posprzątany
            driver.Dispose();
        }

        // ===== FUNKCJA POMOCNICZA (nie jest testem!) =====
        // "private void" = dostępna tylko w tej klasie, nic nie zwraca
        // Odpowiednik funkcji accept_cookies_if_present() z Pythona
        private void AcceptCookiesIfPresent()
        {
            // try/catch = "spróbuj to zrobić, a jeśli coś pójdzie nie tak - złap błąd i nie wywalaj programu"
            // Dokładny odpowiednik Pythonowego try/except
            try
            {
                // Tworzymy "czekacza" - będzie próbował maksymalnie 5 sekund
                // TimeSpan.FromSeconds(5) = sposób zapisania "5 sekund" w C# (w Pythonie po prostu pisałeś liczbę 5)
                var wait = new WebDriverWait(driver, TimeSpan.FromSeconds(5));

                // wait.Until(...) czeka, aż podana funkcja zwróci coś sensownego (nie null/błąd)
                // "d => d.FindElement(...)" to WYRAŻENIE LAMBDA - mała, anonimowa funkcja
                // "d" reprezentuje przeglądarkę, strzałka "=>" oddziela argument od tego, co funkcja zwraca
                // Czyli: "weź przeglądarkę (d) i znajdź w niej element pasujący do selektora CSS"
                var acceptButton = wait.Until(d =>
                    d.FindElement(By.CssSelector("button[id*='accept'], button[class*='accept']")));
                    // By.CssSelector - szukamy elementu <button>, którego id LUB class zawiera słowo "accept"
                    // (identyczna logika selektora jak w Pythonie, tylko inna nazwa metody: CssSelector zamiast CSS_SELECTOR)

                // Klikamy znaleziony przycisk (symulacja kliknięcia myszką)
                acceptButton.Click();
            }
            catch (Exception)
            {
                // Jeśli baner cookies się NIE pojawił w ciągu 5 sekund, WebDriverWait rzuci błąd
                // Łapiemy ten błąd tutaj i CELOWO nic z nim nie robimy (puste klamry = "pass" z Pythona)
                // Bo brak banera to normalna sytuacja, nie prawdziwy błąd
            }
        }

        // ===== TEST 1 =====
        // Atrybut [Test] mówi NUnit: "to jest test do uruchomienia"
        // (w przeciwieństwie do pytest, gdzie samo "test_" w nazwie wystarczało - tu MUSISZ dodać atrybut)
        [Test]
        public void TestPageLoadsSuccessfully()
        {
            // Otwieramy stronę - odpowiednik driver.get(...) z Pythona
            driver.Navigate().GoToUrl("https://www.onet.pl");

            // Wywołujemy naszą funkcję pomocniczą - próba zaakceptowania cookies
            AcceptCookiesIfPresent();

            // ASERCJA nr 1 - sprawdzamy, czy tytuł strony ZAWIERA słowo "Onet"
            // Assert.That(CO_SPRAWDZAMY, JAKI_WARUNEK) - styl "gramatyczny":
            // "sprawdź, że driver.Title zawiera 'Onet'"
            Assert.That(driver.Title, Does.Contain("Onet"));

            // ASERCJA nr 2 - sprawdzamy, czy adres URL ZACZYNA SIĘ OD podanego tekstu
            // Odpowiednik Pythonowego driver.current_url.startswith(...)
            Assert.That(driver.Url, Does.StartWith("https://www.onet.pl"));
        }

        // ===== TEST 2 =====
        [Test]
        public void TestNavigationMenuIsVisible()
        {
            driver.Navigate().GoToUrl("https://www.onet.pl");
            AcceptCookiesIfPresent();

            // Nowy "czekacz" - tym razem 10 sekund (menu może się ładować dłużej niż baner cookies)
            var wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));

            // Szukamy elementu, którego klasa CSS zawiera "Menu" (wielka litera - tak nazywa swoje klasy onet.pl)
            var nav = wait.Until(d => d.FindElement(By.CssSelector("[class*='Menu']")));

            // Sprawdzamy, czy znaleziony element jest WIDOCZNY na ekranie
            // ".Displayed" to WŁAŚCIWOŚĆ (property) - odczytujemy ją BEZ nawiasów (nie jak metodę)
            // Odpowiednik Pythonowego nav.is_displayed() (tam była metoda, z nawiasami)
            Assert.That(nav.Displayed, Is.True);
        }

        // ===== TEST 3 - Z PARAMETRYZACJĄ =====
        // [TestCase("header")] i [TestCase("footer")] to odpowiednik Pythonowego:
        // @pytest.mark.parametrize("expected_element_tag", ["header", "footer"])
        // Ten sam test wykona się DWUKROTNIE - raz z "header", raz z "footer"
        [TestCase("header")]
        [TestCase("footer")]
        public void TestKeyStructuralElementsPresent(string expectedElementTag)
        // "string expectedElementTag" - MUSIMY zadeklarować typ argumentu (tutaj: tekst)
        // W Pythonie nie było takiej deklaracji typu
        {
            driver.Navigate().GoToUrl("https://www.onet.pl");
            AcceptCookiesIfPresent();

            var wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));

            // Szukamy elementu po TAGU HTML - używamy zmiennej expectedElementTag
            // (raz będzie to "header", raz "footer" - w zależności od TestCase)
            var element = wait.Until(d => d.FindElement(By.TagName(expectedElementTag)));

            // Sprawdzamy, że element NIE JEST pusty/nieistniejący
            // Odpowiednik Pythonowego "assert element is not None"
            Assert.That(element, Is.Not.Null);
        }

        // ===== TEST 3b =====
        [Test]
        public void TestNavigationByClassPresent()
        {
            driver.Navigate().GoToUrl("https://www.onet.pl");
            AcceptCookiesIfPresent();

            var wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));

            // Ten sam selektor co w Teście 2, ale sprawdzamy tylko OBECNOŚĆ w kodzie strony,
            // niekoniecznie czy element jest w danym momencie WIDOCZNY
            var navElement = wait.Until(d => d.FindElement(By.CssSelector("[class*='Menu']")));

            Assert.That(navElement, Is.Not.Null);
        }

        // ===== TEST 4 =====
        [Test]
        public void TestPageHasLinks()
        {
            driver.Navigate().GoToUrl("https://www.onet.pl");
            AcceptCookiesIfPresent();

            var wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));

            // Czekamy, aż PRZYNAJMNIEJ JEDEN link (<a>) pojawi się na stronie
            // (upewniamy się, że strona zdążyła się załadować, zanim policzymy wszystkie linki)
            wait.Until(d => d.FindElement(By.TagName("a")));

            // "FindElements" (liczba mnoga!) zwraca LISTĘ wszystkich pasujących elementów
            // W przeciwieństwie do "FindElement" (liczba pojedyncza), który zwraca tylko PIERWSZY
            var links = driver.FindElements(By.TagName("a"));

            // ".Count" to WŁAŚCIWOŚĆ zwracająca liczbę elementów w liście
            // Odpowiednik Pythonowego len(links)
            // Sprawdzamy, że linków jest WIĘCEJ NIŻ 10 (typowa strona portalu ma ich setki)
            Assert.That(links.Count, Is.GreaterThan(10),
                // Drugi argument to WŁASNY KOMUNIKAT błędu (wyświetli się tylko, jeśli test zawiedzie)
                // "$" przed cudzysłowem to C#-owy odpowiednik Pythonowego "f" - pozwala wstawiać
                // wartości zmiennych bezpośrednio do tekstu za pomocą {}
                $"Znaleziono tylko {links.Count} linków - podejrzanie mało");
        }
    }
}