// Ten kod jest napisany w Java Script
/*const firstName = "Konrad";
const lastName = "Wesołowski";
const age = 23;
const isWomen = false;
const level = "Junior" //Junior - Mid - Senior
const hobby = ["Jazda na rowerze", "Oglądanie seriali", "Gra w piłkę"];

function createNewUser(firstName, lastName, age, isWomen, level, hobby) {
    let humanType = "";
    if(!isWomen) {
        humanType = "Kobieta"
    } else {
        humanType = "Mężczyzna"
    }

    function generateID() {
        return Math.floor(Math.random() * (1000 - 1)) + 1;
    }

    return console.log(`Stworzyłem nowe konto ${firstName} ${lastName} \n Przypisałem mu odpowiedni wiek: ${age}, poziom: ${level} oraz hobby: ${hobby}, oraz płeć: ${humanType}. \n
    Przypisałem ID: ${generateID()}
    `);
}

createNewUser(firstName, lastName, age, isWomen, level, hobby);
*/

enum JobLevel {
    Junior = "Junior",
    Mid = "Mid",
    Senior = "Senior"
}

// Opis struktury użytkownika (typ danych)
interface Person {
    firstName: string;
    lastName: string;
    age: number;
    isWomen: boolean;
    level: JobLevel;
    hobby: string[];
}

// Interfejs dla klasy, która sprawdza płeć
interface Validator {
    isWomen: boolean;
    isValidate(): string; // zwraca tekst "Kobieta" lub "Mężczyzna"
}

// Klasa, która zamienia boolean (isWomen) na tekst
class ValidatorHumanType implements Validator {
    isWomen: boolean;

    constructor(isWomen: boolean) {
        // zapisujemy wartość do obiektu
        this.isWomen = isWomen;
    }

    // metoda sprawdza płeć i zwraca tekst
    isValidate(): string {
        return this.isWomen ? "Kobieta" : "Mężczyzna";
    }
}

// Tworzymy obiekt użytkownika zgodny z interface Person
const person: Person = {
    firstName: "Konrad",
    lastName: "Wesołowski",
    age: 23,
    isWomen: false,
    level: JobLevel.Junior,
    hobby: ["Jazda na rowerze", "Oglądanie seriali", "Gra w piłkę"]
};

// Funkcja tworząca nowego użytkownika
function createNewUser(person: Person): void {

    // Tworzymy obiekt validatora i przekazujemy płeć
    const validatorHuman = new ValidatorHumanType(person.isWomen);

    // Otrzymujemy tekstową informację o płci
    const humanType = validatorHuman.isValidate();

    // Funkcja generuje losowe ID użytkownika
    function generateID(): number {
        return Math.floor(Math.random() * (1000 - 1)) + 1;
    }

    // Wyświetlamy informacje o nowym użytkowniku
    console.log(
`Stworzyłem nowe konto ${person.firstName} ${person.lastName}
Wiek: ${person.age}
Poziom: ${person.level}
Hobby: ${person.hobby}
Płeć: ${humanType}
ID: ${generateID()}`
    );
}

// Uruchamiamy funkcję i tworzymy użytkownika
createNewUser(person);