// znajduje nagłówek h2 wewnątrz sekcji "The Band" (div#band)
const h2Band = document.querySelector("div#band h2")
// znajduje akapit z klasą w3-justify (opis zespołu)
const p = document.querySelector("p.w3-justify")

// przykład z funkcją anonimową (arrow function) przekazaną wprost do addEventListener
// — zakomentowany, zastąpiony wersją z nazwaną funkcją (showText) niżej
/*h2Band.addEventListener("click", () => {
    console.log("Kliknalem w naglow")
})*/

// nazwana funkcja obsługi zdarzenia — można ją podać po nazwie (bez wywołania, bez ())
function showText(){
console.log("Kliknalem w naglowek z funkcji")
}
// rejestruje listener: po kliknięciu na h2Band wywoła się funkcja showText
h2Band.addEventListener("click",showText)

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