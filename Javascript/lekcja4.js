//Pierwszy sposob tworzenia funkcji 

function dodaj(a, b) {
    return a + b;
   }
    console.log(dodaj(2, 3));
//Drugi sposob tworzenia funkcji
const dodaj2 = function (a, b) {
    return a + b;
    }
console.log(dodaj2(2, 3));
//Pierwszy sposob funkcji
/*function wyswietlNapis(){
    console.log("To jest napis");
}

//Drugi sposob tworzenia funkcji
const wyswietlNapis2 = () => {
    console.log("To jest napis 2");
}
wyswietlNapis();
wyswietlNapis2();*/

//Pierwszy sposob funkcji 

function wyswietlNapis(pierwszaLiczba, drugaLiczba){
    console.log(pierwszaLiczba + drugaLiczba);
}

//Drugi sposob funkcji
const wyswietlNapis2 = (imie) => {
    console.log("Witaj " + imie + " co tam slychać");
wyswietlWiek(30);
}

function wyswietlWiek(wiek) {
    console.log("Masz " + wiek + " lat");
}

wyswietlNapis(5, 10);
wyswietlNapis2("Jan");