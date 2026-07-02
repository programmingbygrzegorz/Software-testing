import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


@pytest.fixture
def driver():
    # Przygotowanie przeglądarki przed każdym testem
    drv = webdriver.Chrome()
    drv.maximize_window()  # maksymalizacja okna - niektóre elementy są ukryte na małym ekranie
    yield drv
    drv.quit()


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


class TestOnetSearch:
    """
    Grupa testów dotyczących wyszukiwarki na Onet.pl.
    Użycie klasy pozwala logicznie pogrupować powiązane ze sobą testy.
    """

    def test_page_loads_successfully(self, driver):
        """Test 1: sprawdza czy strona w ogóle się ładuje i ma poprawny tytuł"""
        driver.get("https://www.onet.pl")
        accept_cookies_if_present(driver)

        assert "Onet" in driver.title
        assert driver.current_url.startswith("https://www.onet.pl")

    def test_navigation_menu_is_visible(self, driver):
        """Test 2: sprawdza czy menu jest widoczne na stronie (po klasie CSS zawierającej 'Menu')"""
        driver.get("https://www.onet.pl")
        accept_cookies_if_present(driver)

        wait = WebDriverWait(driver, 10)
        # Szukamy elementu, którego klasa CSS zawiera słowo "Menu" (wielka litera - onet tak nazywa swoje klasy)
        nav = wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, "[class*='Menu']")))

        assert nav.is_displayed()

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
        wait.until(EC.presence_of_element_located((By.TAG_NAME, "a")))

        links = driver.find_elements(By.TAG_NAME, "a")

        # Sprawdzamy, że strona główna ma więcej niż np. 10 linków
        # (typowa strona główna portalu ma ich zwykle setki)
        assert len(links) > 10, f"Znaleziono tylko {len(links)} linków - podejrzanie mało"