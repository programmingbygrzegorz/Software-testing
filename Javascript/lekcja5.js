const wyszukiwarka = document.getElementById("search_query_top");
// Pobiera element HTML o id="search_query_top" za pomocą getElementById.
// Zwraca pojedynczy element lub null jeśli nie istnieje.

const wyszukiwarka2 = document.querySelector("#search_query_top");
// Robi to samo co linia wyżej, ale używa querySelector z selektorem CSS.
// Znak # oznacza wyszukiwanie po id. Zwraca pierwszy pasujący element lub null.

const wyszukiwark3 = document.querySelector("form#searchbox > input.form-control");
// Pobiera pierwsze pole <input> z klasą "form-control",
// które jest bezpośrednim dzieckiem (>) formularza o id="searchbox".

const wszystkieWyszukiwarki = document.querySelectorAll(".form-control");
// Pobiera WSZYSTKIE elementy posiadające klasę "form-control".
// Zwraca NodeList (kolekcję elementów), a nie pojedynczy element.

const wyszukiwarka4 = document.querySelector('input[name="search_query"]');
// Pobiera pierwsze pole <input>, które posiada atrybut name="search_query".
// Selektor atrybutowy [...] przydatny gdy element nie ma unikalnego id lub klasy.

console.log(wszystkieWyszukiwarki);
// Wypisuje w konsoli przeglądarki (F12) kolekcję wszystkich
// elementów znalezionych przez querySelectorAll w linii wyżej.