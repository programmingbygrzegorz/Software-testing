// Przykład 1. Tworzenie nowego elementu HTML przez JavaScript
// createElement() tworzy element w pamięci — nie pojawia się jeszcze na stronie
const divElement = document.createElement("div");

// ustawia style bezpośrednio na elemencie (odpowiednik atrybutu style="" w HTML)
divElement.style.width="100px";
divElement.style.height="100px";
divElement.style.backgroundColor = "red";
// wypisuje element w konsoli (widać strukturę HTML, ale element nadal nie jest w DOM)
console.log(divElement);

// Przykład 2. Tworzenie elementu <p> z tekstem
const p = document.createElement("p");
// innerText ustawia tekst wewnątrz elementu (traktuje zawartość jako zwykły tekst, nie HTML)
p.innerText="Nowy super element"
console.log(p);

// Przykład 3. Wstawianie elementów do DOM (drzewa dokumentu HTML)
// querySelector pobiera istniejące elementy ze strony jako miejsca docelowe
const form = document.querySelector("form");
const band = document.querySelector("#band");

// appendChild() wstawia element jako ostatnie dziecko wskazanego rodzica
// — dopiero tutaj element pojawia się widocznie na stronie
form.appendChild(divElement);

// cloneNode(true) tworzy głęboką kopię elementu (ze wszystkimi stylami i dziećmi)
// — zakomentowane, żeby nie duplikować div w sekcji #band
//band.appendChild(divElement.cloneNode(true));

// Przykład 4. Wstawianie akapitu <p> do sekcji "The Band"
const boxBand = document.querySelector("div#band");
// appendChild() dodaje <p> jako ostatni element wewnątrz div#band
boxBand.appendChild(p)
