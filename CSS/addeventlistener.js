// znajduje nagłówek h2 wewnątrz sekcji "The Band" (div#band)
const h2Band = document.querySelector("div#band h2")
// znajduje akapit z klasą w3-justify (opis zespołu)
const p = document.querySelector("p.w3-justify")
const buyTicketBtn = document.querySelector("#buy-ticket")

// Przykład 1. 
// ZDARZENIE KLIKNIECIA Funkcja anonimowa (arrow function) przekazana wprost do addEventListener
// — zakomentowany, zastąpiony wersją z nazwaną funkcją (showText) niżej
/*h2Band.addEventListener("click", () => {
    console.log("Kliknalem w naglow")
})*/

// Przykład 2.PODOBNIE JAK WYŻEJ BEZ FUNKCJI STRZAŁKOWEJ Nazwana funkcja jako handler zdarzenia
// nazwana funkcja obsługi zdarzenia — można ją podać po nazwie (bez wywołania, bez ())
function showText(){
console.log("Kliknalem w naglowek z funkcji")
}
// rejestruje listener: po kliknięciu na h2Band wywoła się funkcja showText
h2Band.addEventListener("click",showText)

// Przykład 3. TUTAJ PRZEKAZUJEMY ARGUMENT, Obiekt zdarzenia (event object) i odczyt pozycji kursora
// przykład listenera na akapicie p — zakomentowany, do testów
// po kliknięciu wypisałby cały element p w konsoli
// p.addEventListener("click", function(){
//     console.log(p)

// })
p.addEventListener("click", e => {  // e = obiekt zdarzenia (event object)
                                    // e zawiera informacje o zdarzeniu:
                                    // e.clientX - pozycja kursora od lewej krawędzi okna (w px)
                                    // e.clientY - pozycja kursora od górnej krawędzi okna (w px)
                                    // e.target  - element który został kliknięty
                                    // e.type    - typ zdarzenia np. "click"
    if (e.clientX > 500) {                                                   // jeśli pozycja X > 500px
        console.log("Wartość jest większa niz 500 i wynosi: " + e.clientX)  // wypisz wartość X
    } else {                                                                 // w przeciwnym razie (X <= 500px)
        console.log("Wartość jest mniejsza niz 500 i wynosi: " + e.clientX) // wypisz wartość X
    }
})

// Przykład 4. Para zdarzeń mouseover/mouseout — wykrywanie wjazdu i zjazdu kursora z elementu
// mouseover odpala się gdy kursor WJEDZIE na przycisk "Buy Tickets" (New York)
buyTicketBtn.addEventListener("mouseover", () => {
    console.log("ZADZIAŁO SIĘ!")
    })
// mouseout odpala się gdy kursor ZJEDZIE z przycisku
buyTicketBtn.addEventListener("mouseout", () => {
    console.log("ZADZIAŁO SIĘ - #2!")
    })
/* JESLI CHCEMY EVENT WYWOŁYWAĆ w console.log DO WŁAŚCIWOŚCI MOŻNA ODWOŁAĆ
buyTicketBtn.addEventListener("mouseout", () e => {
    console.log(e)
    })*/

// Przykład 5. preventDefault() — blokowanie domyślnej akcji przeglądarki
// formContact - formularz kontaktowy (sekcja CONTACT na dole strony)
const formContact = document.querySelector("form");

formContact.addEventListener("submit", e => {
    // domyślnie wysłanie formularza przeładowałoby/przekierowałoby stronę (action="/action_page.php")
    // preventDefault() zatrzymuje tę domyślną akcję — przydatne np. gdy chcemy
    // najpierw zwalidować dane w JS, zanim formularz faktycznie zostanie wysłany
    e.preventDefault();
    console.log("Test");
})


// Przykład 6. preventDefault() na linku nawigacyjnym — blokuje domyślny skok do #contact
// selektor atrybutowy [href="#contact"] zawężony do linku w głównym pasku nawigacji (div.w3-top div.w3-bar)
// — na stronie jest kilka linków z href="#contact", więc trzeba wskazać dokładnie ten jeden
const link = document.querySelector('div.w3-top div.w3-bar a[href="#contact"]')
link.addEventListener("click", event =>{
    // bez preventDefault() kliknięcie normalnie przewinęłoby stronę do sekcji #contact
    // tutaj blokujemy ten domyślny skok (np. żeby obsłużyć nawigację własnym kodem JS)
    event.preventDefault();

})

// Przykład 7. Keydown i Keyup — zdarzenia klawiatury na polu formularza
// inputName - pole tekstowe "Name" w formularzu kontaktowym
const inputName = document.querySelector('input[name="Name"]')

// keydown odpala się w momencie WCIŚNIĘCIA klawisza (przed pojawieniem się znaku w polu)
// callback musi przyjąć parametr "e" (event), inaczej "e" jest niezdefiniowane i wywołanie rzuci błąd
inputName.addEventListener("keydown", (e) => {
   // console.log("Uruchomiono zdarzenie keydown")
   console.log(e.key)     // e.key - nazwa/znak wciśniętego klawisza, np. "a", "Enter", "Backspace"
})

// keyup odpala się w momencie PUSZCZENIA klawisza (po keydown)
inputName.addEventListener("keyup", () => {
    console.log("Uruchomiono zdarzenie keyup")
    })

// Przykład 8. Scroll — wykrywanie przewijania strony
window.addEventListener("scroll", () => {
//console.log("Skroll")
console.log(window.scrollY)   // window.scrollY - liczba pikseli o jaką strona jest przewinięta w pionie
                                // (window.screenY to coś innego — pozycja okna przeglądarki na ekranie, nie scroll)
})
// Przykład 9. DOMContentLoaded — zdarzenie wykonania kodu po wczytaniu się w pełni DOM
// odpala się gdy cała struktura HTML jest już sparsowana (przed wczytaniem obrazków/CSS z sieci)
// — bezpieczne miejsce na kod, który musi mieć dostęp do wszystkich elementów strony
window.addEventListener("DOMContentLoaded", () =>{
    console.log("Dom wczytał się poprawnie!")   // console.log() przyjmuje argumenty w (), nie w {}

})