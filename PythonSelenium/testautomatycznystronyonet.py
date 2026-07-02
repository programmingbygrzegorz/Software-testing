# Import głównej klasy webdriver - to przez nią sterujemy przeglądarką
from selenium import webdriver

# Import klasy By - służy do wskazywania SPOSOBU wyszukiwania elementów na stronie
# (np. po ID, klasie CSS, tagu, XPath itp.)
from selenium.webdriver.common.by import By

# Import WebDriverWait - pozwala "czekać" na pojawienie się elementu na stronie
# zamiast na sztywno używać time.sleep() (co jest złą praktyką w testach)
from selenium.webdriver.support.ui import WebDriverWait

# Import expected_conditions (EC) - zestaw gotowych "warunków oczekiwania"
# np. czy element jest widoczny, klikalny, obecny w strukturze strony (DOM) itd.
from selenium.webdriver.support import expected_conditions as EC

# Import modułu time - tu użyty tylko do sleep(), czyli sztucznego opóźnienia
import time

# Tworzymy instancję przeglądarki Chrome - to fizycznie otwiera okno przeglądarki
# Selenium Manager (wbudowany od wersji 4.6) sam pobiera odpowiedni ChromeDriver
driver = webdriver.Chrome()

# Blok try/finally gwarantuje, że przeglądarka zostanie zamknięta
# nawet jeśli test się wywali (np. przez błąd asercji)
try:
    # Otwieramy podaną stronę w przeglądarce - to jak wpisanie adresu i Enter
    driver.get("https://www.onet.pl")

    # Tworzymy obiekt "czekacza" - będzie próbował sprawdzać warunek
    # co jakiś czas, maksymalnie przez 10 sekund, zanim rzuci błąd (TimeoutException)
    wait = WebDriverWait(driver, 10)

    # ASERCJA - sprawdzamy, czy tytuł strony (to co widać na karcie przeglądarki)
    # zawiera słowo "Onet". Jeśli nie - Python rzuci błąd AssertionError i test się nie powiedzie
    assert "Onet" in driver.title
    print("Test tytułu strony: OK")

    # PRZYKŁAD (obecnie zakomentowany) - jak znaleźć element i go kliknąć:
    # element_to_be_clickable = czeka aż element będzie widoczny I klikalny
    # By.CSS_SELECTOR = szukamy elementu po selektorze CSS (jak w stylach)
    # element = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "a.some-class")))
    # element.click()  # symuluje kliknięcie myszką na ten element

    # Czekamy, aż w strukturze strony (DOM) pojawi się element <header>
    # presence_of_element_located = sprawdza tylko czy element ISTNIEJE w kodzie strony
    # (niekoniecznie czy jest widoczny na ekranie - do tego jest visibility_of_element_located)
    # By.TAG_NAME = szukamy po nazwie znacznika HTML (np. <header>, <div>, <a>)
    logo = wait.until(EC.presence_of_element_located((By.TAG_NAME, "header")))
    print("Nagłówek strony znaleziony: OK")

    # Sztuczne opóźnienie 2 sekundy - tylko po to, żebyś zdążył zobaczyć wynik
    # na ekranie zanim przeglądarka się zamknie. W prawdziwych testach się tego
    # UNIKA, bo spowalnia testy i nie jest wiarygodnym sposobem czekania
    time.sleep(2)

finally:
    # Zamykamy przeglądarkę i kończymy sesję WebDrivera
    # To WAŻNE - bez tego procesy przeglądarki mogą zostać "wiszące" w tle
    driver.quit()