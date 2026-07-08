// ============================================================
// Lista zakupów — logika aplikacji
// Skrypt obsługuje dodawanie i usuwanie elementów z listy.
// Po wpisaniu nazwy i naciśnięciu Enter tworzony jest nowy
// element <li> z przyciskiem "Usuń", który trafia do listy <ul>.
// ============================================================


// --- Referencje do elementów HTML ---
const addInput = document.getElementById("add_input");   // Pole tekstowe do wpisywania nazwy produktu
const itemsList = document.getElementById("items_list"); // Lista <ul>, do której dodawane są produkty


// --- Funkcja usuwająca element z listy ---
// Wywoływana przez atrybut onclick przycisku "Usuń".
// Parametr `e` to element, który wywołał zdarzenie (przycisk).
// parentNode wskazuje na rodzica przycisku, czyli element <li> — ten właśnie usuwamy.
function removeItem(e) {
    const removeParent = e.parentNode; // Pobiera element <li> — rodzica klikniętego przycisku
    removeParent.remove();             // Usuwa <li> z DOM, co znika ze strony
}


// --- Nasłuchiwanie na wciśnięcie klawisza w polu input ---
// Zdarzenie "keyup" odpala się po każdym puszczeniu klawisza.
// Sprawdzamy czy to był Enter (keyCode 13) i czy pole nie jest puste.
addInput.addEventListener("keyup", e => {

    const inputValue = addInput.value; // Aktualna wartość wpisana w polu input

    if (e.keyCode === 13 && inputValue.length > 0) {

        // --- Tworzenie nowego elementu listy <li> ---
        const newItem = document.createElement("li");
        newItem.classList.add("items");  // Klasa CSS nadająca styl elementowi listy
        newItem.innerText = inputValue;  // Tekst widoczny na liście (nazwa produktu)

        // --- Tworzenie przycisku "Usuń" ---
        const delBtn = document.createElement("button");
        delBtn.classList.add("del_btn");              // Klasa CSS nadająca styl przyciskowi
        delBtn.setAttribute("key", inputValue);       // Atrybut przechowujący nazwę produktu
        delBtn.setAttribute("onclick", "removeItem(this)"); // Po kliknięciu wywołuje removeItem()
        delBtn.innerText = "Usuń";

        // --- Składanie elementu i dodanie do DOM ---
        newItem.appendChild(delBtn);      // Wstawia przycisk "Usuń" do elementu <li>
        itemsList.appendChild(newItem);   // Dodaje gotowy <li> do listy <ul> na stronie

        addInput.value = ""; // Czyści pole input po dodaniu produktu
    }
})
