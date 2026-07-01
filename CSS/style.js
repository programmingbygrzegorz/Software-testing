// Przykład 1. Przełącznik stylu (toggle) za pomocą zmiennej boolowskiej
// znajduje nagłówek h2 wewnątrz sekcji "The Band"
const h2Element = document.querySelector("div#band h2.w3-wide");

// zmienna przełącznika — false = stan początkowy (klik zrobi kolor czerwony)
// true = stan po pierwszym kliknięciu (klik cofnie do czarnego)
let swichVariable = false;

h2Element.addEventListener("click", function() {
    //h2Element.style.color = "blue";   // poprzednia wersja — zmiana koloru bez przełącznika
    if(swichVariable === false) {
        // PIERWSZE kliknięcie — ustawia czerwony kolor i większą czcionkę
        this.style.color = "red";
        this.style.fontSize = "56px";
        swichVariable = true;   // bez tego zmienna zostaje false i else nigdy nie zadziała
    } else {
        // DRUGIE kliknięcie — przywraca czarny kolor i oryginalny rozmiar
        this.style.color = "black";
        this.style.fontSize = "22px";
        swichVariable = false;  // przywraca false żeby następny klik znów wszedł w if
    }
    // !swichVariable samo z siebie nic nie robi — żeby odwrócić wartość trzeba przypisać:
    // swichVariable = !swichVariable (ale tu obsługujemy to ręcznie w if/else wyżej)
});

// Przykład 2. Zmiana koloru paska nawigacji w zależności od pozycji scrolla
// zakomentowana wersja — tylko logowanie pozycji scrolla do konsoli
// const navbar = document.querySelector("div.w3-bar");
// window.addEventListener("scroll", () => {
// console.log(window.scrollY);
// })

// navbar — pasek nawigacji na górze strony (div z klasą w3-bar)
const navbar = document.querySelector("div.w3-bar");
// nasłuchuje na zdarzenie scroll — wykonuje się przy każdym przewinięciu strony
window.addEventListener("scroll", () => {
    // window.scrollY — aktualna liczba pikseli przewinięcia w pionie
    if(window.scrollY > 350) {
       // po przewinięciu powyżej 350px zmienia tło nawigacji na niebieskie
       navbar.style.background = "blue";
    } else {
       // poniżej 350px przywraca czarne tło nawigacji
       navbar.style.background = "black";
    }
 })
