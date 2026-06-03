const miejscowosc = "Wrocław";

const tablica = ["Ala", 36, miejscowosc, {"id": 1}];
const imionaTablica = ["Ala", "Tomasz", "Wojtek", "Bartosz"];
const wiekTablica = [8, 14, 15, 3, 8, 10];

// console.log(tablica.length);
// console.log(imionaTablica.length);
// console.log(wiekTablica.length);

//Dodanie nowego elementu do tablicy na koncu
//imionaTablica.push("Kasia");

//Dodanie nowego elementu do tablicy na poczatku
//imionaTablica.unshift("Kasia");

//Pobiera ostatni element z tablicy 
//console.log(imionaTablica.pop());

//Usuwa pierwszy element z tablicy 
//imionaTablica.shift();

//Łączenie elementów tablicy w jeden string z określonym separatorem
const zlaczonaTablica = imionaTablica.join(" oraz ");
//console.log(zlaczonaTablica);

//Odwraca kolejność elementów w tablicy
//console.log(imionaTablica);
//console.log(imionaTablica.reverse());

//Sprawdza czy tablica zawiera określony elementconsole.log(imionaTablica.indexOf("Wojtek"));


//Dodanie nowego elementu do tablicy na konkretnym indeksie lub aktualizacja elementu
//mionaTablica[4] = "Tomek";

//console.log(imionaTablica);


//Sprawdza pod jakim indeksem znajduje się określony element w tablicy, jeśli element nie istnieje, zwraca -1
//console.log(imionaTablica.indexOf("Wojtek"));

//Sprawdza czy tablica zawiera określony element, zwraca true lub false
//console.log(imionaTablica.includes("Wojtek"));

//Sprawdza czy tablica zawiera określony element i wypisuje odpowiedni komunikat
/*if(imionaTablica.includes("Jacek")){
    console.log("Wojtek jest w tablicy");
}else{
    console.log("Imie nie jest w tablicy");
}*/

//Sortownie 
//console.log(wiekTablica.sort((a, b) => a - b));

//Łaczenie dwóch tablic w jedną
//console.log(imionaTablica.concat(wiekTablica));
