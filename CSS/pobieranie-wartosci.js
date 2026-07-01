const p = document.querySelector("p.w3-justify");

//pobieranie wartości z atrybutu HTML
const value = p.innerText
console.log(value);  // wypisuje w konsoli tekst wewnątrz paragrafu

const h2Band = document.querySelector("div#band h2");
console.log(h2Band.innerText);  // wypisuje w konsoli tekst nagłówka h2 w sekcji "The Band"

const pWeLoveMusic = document.querySelector("p.w3-opacity");
console.log(pWeLoveMusic.innerText);  // wypisuje w konsoli tekst wewnątrz paragrafu z klasą "w3-opacity"

console.log(pWeLoveMusic.innerHTML);  // wypisuje w konsoli cały kod HTML wewnątrz paragrafu z klasą "w3-opacity"

const img = document.querySelector("img.w3-image");
console.log(img.getAttribute("src"));  // wypisuje w konsoli wartość atrybutu src obrazka z klasą "w3-image"
console.log(img.style.width);  // wypisuje w konsoli wartość atrybutu style="width:..." obrazka z klasą "w3-image"

const inputName = document.querySelector('input[name="Name"]');
console.log(inputName.value);  // zwraca "" bo pole jest puste przy wczytaniu strony

// rozwiązanie — listener "input" odczytuje wartość dynamicznie podczas pisania
// bez wpisywania czegokolwiek na stałe w kodzie
inputName.addEventListener("input", () => {
    console.log(inputName.value);  // wypisuje aktualną wartość przy każdym wciśniętym klawiszu
})

inputName.addEventListener("keyup", () => {
    console.log(inputName.value);  // wypisuje aktualną wartość przy każdym wciśniętym klawiszu
})

// Różnica jest subtelna, ale realna:
// input

// Odpala się przy każdej zmianie wartości pola, niezależnie od tego, co ją spowodowało.
// Zadziała nie tylko przy pisaniu na klawiaturze, ale też przy: wklejeniu tekstu (Ctrl+V lub prawym przyciskiem myszy), przeciągnięciu tekstu do pola, dyktowaniu głosowym, autouzupełnianiu, cofnięciu przez undo (Ctrl+Z).
// Nie odpali się, jeśli wciśniesz klawisz, który nie zmienia wartości (np. samo Shift, strzałki, Tab).

// keyup

// Odpala się przy puszczeniu dowolnego klawisza, niezależnie od tego, czy wartość pola się faktycznie zmieniła.
// Zadziała też np. przy strzałkach, Tab, Shift, Ctrl — czyli klawiszach, które nie zmieniają tekstu.
// Nie zadziała przy wklejeniu myszką (bez klawiatury), przeciągnięciu tekstu czy dyktowaniu głosowym — bo tam nie ma naciśnięcia żadnego klawisza.