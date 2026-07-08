# Skrypt zawiera rozszerzone testy automatyczne strony Onet.pl napisane w Selenium + pytest.
# W porównaniu do testOnetpl_1.py, używa bardziej zaawansowanych technik:
#   - WebDriverWait zamiast statycznych opóźnień (czeka aż element będzie dostępny, max N sekund)
#   - obsługi baneru cookies (RODO), który blokuje interakcję ze stroną
#   - grupowania testów w klasę (TestOnetSearch)
#   - parametryzacji testów (@pytest.mark.parametrize) - jeden test uruchamiany z różnymi danymi
# Testy sprawdzają: ładowanie strony, widoczność menu, obecność header/footer oraz liczbę linków.

# --- Importy ---
import pytest
# webdriver - główna klasa do sterowania przeglądarką
from selenium import webdriver
# By - definiuje sposób wyszukiwania elementów (CSS, TAG_NAME, ID itp.)
from selenium.webdriver.common.by import By
# Keys - symulacja klawiszy klawiatury (np. Enter, Tab)
from selenium.webdriver.common.keys import Keys
# WebDriverWait - czeka na element przez określony czas zamiast używać sleep()
from selenium.webdriver.support.ui import WebDriverWait
# EC (expected_conditions) - gotowe warunki czekania, np. "element jest klikalny"
from selenium.webdriver.support import expected_conditions as EC


# --- Fixture: przygotowanie i sprzątanie przeglądarki ---
# Fixture to funkcja, którą pytest automatycznie wywołuje przed każdym testem.
# Dzięki "yield" przeglądarka jest otwierana PRZED testem i zamykana PO teście.
@pytest.fixture
def driver():
    # Przygotowanie przeglądarki przed każdym testem
    drv = webdriver.Chrome()
    drv.maximize_window()  # maksymalizacja okna - niektóre elementy są ukryte na małym ekranie
    yield drv
    drv.quit()


# --- Funkcja pomocnicza: obsługa baneru cookies ---
# Nie jest testem - służy jako wspólna logika wywoływana na początku każdego testu.
# Baner RODO pojawia się przy pierwszym wejściu na stronę i zasłania inne elementy.
def accept_cookies_if_present(driver):
    """
    Funkcja pomocnicza - próbuje zaakceptować baner cookies, jeśli się pojawi.
    Wiele stron (w tym Onet) pokazuje baner RODO, który blokuje interakcję ze stroną.
    """
    try:
        wait = WebDriverWait(driver, 5)
        # Szukamy przycisku akceptacji - selektor może się różnić w zależności od strony
        accept_button = wait.until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, "button[id*='accept'], button[class*='accept']"))
        )
        accept_button.click()
    except Exception:
        # Jeśli baner się nie pojawił w ciągu 5s - po prostu kontynuujemy test
        pass


# --- Klasa z testami ---
# Grupowanie testów w klasę pozwala logicznie je powiązać i uruchamiać razem.
# pytest automatycznie rozpoznaje metody zaczynające się od "test_" jako testy.
class TestOnetSearch:
    """
    Grupa testów dotyczących wyszukiwarki na Onet.pl.
    Użycie klasy pozwala logicznie pogrupować powiązane ze sobą testy.
    """

    def test_page_loads_successfully(self, driver):
        """Test 1: sprawdza czy strona w ogóle się ładuje i ma poprawny tytuł"""
        driver.get("https://www.onet.pl")
        accept_cookies_if_present(driver)

        # Weryfikacja tytułu karty przeglądarki oraz adresu URL
        assert "Onet" in driver.title
        assert driver.current_url.startswith("https://www.onet.pl")

    def test_navigation_menu_is_visible(self, driver):
        """Test 2: sprawdza czy menu jest widoczne na stronie (po klasie CSS zawierającej 'Menu')"""
        driver.get("https://www.onet.pl")
        accept_cookies_if_present(driver)

        wait = WebDriverWait(driver, 10)
        # Szukamy elementu, którego klasa CSS zawiera słowo "Menu" (wielka litera - onet tak nazywa swoje klasy)
        # visibility_of_element_located czeka aż element będzie widoczny (nie tylko obecny w DOM)
        nav = wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, "[class*='Menu']")))

        assert nav.is_displayed()

    # @pytest.mark.parametrize uruchamia ten sam test wielokrotnie z różnymi wartościami.
    # Poniżej test wykona się 2 razy: raz dla "header", raz dla "footer".
    @pytest.mark.parametrize("expected_element_tag", ["header", "footer"])
    def test_key_structural_elements_present(self, driver, expected_element_tag):
        """
        Test 3: sprawdza obecność kluczowych elementów strukturalnych strony.
        Dzięki @pytest.mark.parametrize ten SAM test uruchomi się 2 razy,
        raz dla header, raz dla footer.
        """
        driver.get("https://www.onet.pl")
        accept_cookies_if_present(driver)

        wait = WebDriverWait(driver, 10)
        # presence_of_element_located czeka aż element pojawi się w DOM (niekoniecznie widoczny)
        element = wait.until(
            EC.presence_of_element_located((By.TAG_NAME, expected_element_tag))
        )

        assert element is not None

    def test_navigation_by_class_present(self, driver):
        """Test 3b: sprawdza obecność elementu menu po klasie CSS zawierającej 'Menu'"""
        driver.get("https://www.onet.pl")
        accept_cookies_if_present(driver)

        wait = WebDriverWait(driver, 10)
        nav_element = wait.until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "[class*='Menu']"))
        )

        assert nav_element is not None

    def test_page_has_links(self, driver):
        """Test 4: sprawdza czy na stronie jest sensowna liczba linków (np. artykuły)"""
        driver.get("https://www.onet.pl")
        accept_cookies_if_present(driver)

        wait = WebDriverWait(driver, 10)
        # Czekamy aż przynajmniej jeden link pojawi się na stronie
        wait.until(EC.presence_of_element_located((By.TAG_NAME, "a")))

        # find_elements (liczba mnoga) zwraca LISTĘ wszystkich pasujących elementów
        links = driver.find_elements(By.TAG_NAME, "a")

        # Sprawdzamy, że strona główna ma więcej niż np. 10 linków
        # (typowa strona główna portalu ma ich zwykle setki)
        assert len(links) > 10, f"Znaleziono tylko {len(links)} linków - podejrzanie mało"
