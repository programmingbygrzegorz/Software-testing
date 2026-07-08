# Skrypt zawiera podstawowe testy automatyczne strony Onet.pl napisane w Selenium + pytest.
# Sprawdza czy strona się ładuje (tytuł zawiera "Onet") oraz czy element <header> jest obecny w DOM.
# Każdy test dostaje własną instancję przeglądarki Chrome poprzez fixture "driver",
# który automatycznie otwiera przeglądarkę przed testem i zamyka ją po jego zakończeniu.

# Import biblioteki pytest - frameworka do pisania i uruchamiania testów w Pythonie
import pytest

# Import głównej klasy webdriver - służy do sterowania przeglądarką
from selenium import webdriver


# DEKORATOR @pytest.fixture - tworzy tzw. "fixture", czyli funkcję przygotowującą
# dane/zasoby dla testów. Fixture można "wstrzyknąć" do dowolnego testu,
# po prostu podając jego nazwę jako argument funkcji testowej
@pytest.fixture
def driver():
    # Ta część wykonuje się PRZED każdym testem, który używa tego fixture
    # Tworzymy nową instancję przeglądarki Chrome
    drv = webdriver.Chrome()

    # "yield" oddaje sterowanie do testu - test dostaje obiekt "drv"
    # i wykonuje się cały swój kod, korzystając z tej przeglądarki
    yield drv

    # Ta część wykonuje się PO zakończeniu testu (niezależnie czy się powiódł czy nie)
    # To odpowiednik bloku "finally" - gwarantuje zamknięcie przeglądarki
    drv.quit()


# Funkcja testowa - pytest rozpoznaje ją jako test, bo nazwa zaczyna się od "test_"
# Argument "driver" to nazwa fixture'a zdefiniowanego wyżej - pytest automatycznie
# go wywoła i przekaże gotowy obiekt przeglądarki do tej funkcji
def test_onet_title(driver):
    # Otwieramy stronę onet.pl w przeglądarce
    driver.get("https://www.onet.pl")

    # ASERCJA - sprawdzamy czy tytuł strony (widoczny na karcie przeglądarki)
    # zawiera słowo "Onet". Jeśli nie - pytest oznaczy ten test jako FAILED
    assert "Onet" in driver.title


# Drugi, niezależny test - pytest ponownie uruchomi fixture "driver" od zera
# (czyli otworzy NOWĄ przeglądarkę, osobną dla tego testu)
def test_onet_header_present(driver):
    # Otwieramy stronę onet.pl (ponownie, bo to inna sesja przeglądarki)
    driver.get("https://www.onet.pl")

    # Szukamy elementu na stronie po nazwie tagu HTML - w tym przypadku <header>
    # find_element() zwraca PIERWSZY pasujący element, albo rzuca wyjątek
    # NoSuchElementException, jeśli elementu nie znajdzie
    header = driver.find_element("tag name", "header")

    # ASERCJA - sprawdzamy, że element został znaleziony (nie jest None)
    # W praktyce find_element() i tak rzuci błąd wcześniej, jeśli nic nie znajdzie,
    # więc ta asercja jest tu bardziej "na wszelki wypadek"
    assert header is not None