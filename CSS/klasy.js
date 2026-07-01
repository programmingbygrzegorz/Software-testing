// pobiera sekcję "The Band" jako kontener do wstawiania nowych elementów
const boxBand = document.querySelector("div#band");

// tworzy nowy element <p> i <a> w pamięci (jeszcze niewidoczne na stronie)
const p = document.createElement("p");
const link = document.createElement("a");

// innerText ustawia tekst wewnątrz elementu
p.innerText = "Nowy super paragraf!";
link.innerText = "Przekierowanie do strony google !";

// classList.add() — dodaje klasę CSS do elementu (odpowiednik class="" w HTML)
p.classList.add("active");    // dodaje klasę "active"
p.classList.add("active2");   // dodaje klasę "active2"
// classList.remove() — usuwa klasę CSS z elementu
p.classList.remove("active2"); // usuwa klasę "active2" — zostaje tylko "active"

// setAttribute() — ustawia dowolny atrybut HTML na elemencie
// tutaj ustawia href czyli adres docelowy linku
link.setAttribute("href", "https://www.google.com");

// removeAttribute() — całkowicie usuwa atrybut z elementu
// link traci href — kliknięcie nie będzie nic robić (link nieaktywny)
link.removeAttribute("href");

// przypisanie id przez właściwość — odpowiednik setAttribute("id", "Super link")
link.id = "Super link";

// appendChild() — wstawia elementy jako ostatnie dzieci div#band
// od tej chwili elementy są widoczne na stronie
boxBand.appendChild(p)
boxBand.appendChild(link)
