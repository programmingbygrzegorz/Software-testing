// Tablice danych używane we wszystkich przykładach
const imiona = ["Alicja", "Tomasz", "Agnieszka", "Beata", "Rafał", "Klaudisz"];
const liczby = [24, 63, 41, 42, 68, 85];

// Przykład 1. map() z warunkiem if/else — klasyfikacja liczb względem progu 41
// map() iteruje po każdym elemencie tablicy i wywołuje callback dla każdego z nich
// liczba = bieżący element, index = jego pozycja w tablicy (tu nieużywany)
// liczby.map((liczba, index) => {
//     if(liczba > 41) {
//         console.log(`Liczba ${liczba} jest większa od 41`)
//     } else {
//         console.log(`Liczba ${liczba} jest mniejsza bądź równa 41`)
//     }
// })

// Przykład 2. map() z wypisaniem indeksu i wartości elementu
// index — pozycja elementu w tablicy (0, 1, 2 ...)
// liczba — wartość elementu pod tym indeksem
// liczby.map((liczba, index) => {
//     console.log(`Indeks ${index} kryje się pod indexem ${liczba}`)
// })

// Przykład 3. map() do filtrowania imion — podział na dziewczyny i chłopaków
// dziewczyny i chlopaki — puste tablice wypełniane podczas iteracji
let dziewczyny = [];
let chlopaki = [];

imiona.map((imie) => {
    console.log(imie);
    // sprawdza ostatnią literę imienia przez indeks [imie.length - 1]
    // imiona kończące się na "a" to zazwyczaj imiona żeńskie
    if(imie[imie.length - 1] === "a") {   // fix: imie.[...] -> imie[...] (kropka była błędem składniowym)
        dziewczyny.push(imie);  // dodaje imię do tablicy dziewczyn
    }else {
        chlopaki.push(imie);    // dodaje imię do tablicy chłopaków
    }
    // wypisuje aktualny stan obu tablic po każdej iteracji
    console.log(`Dziewczyny: ${dziewczyny}`);
    console.log(`Chłopaki: ${chlopaki}`);
})
