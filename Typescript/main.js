"use strict";
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
var JobLevel;
(function (JobLevel) {
    JobLevel["Junior"] = "Junior";
    JobLevel["Mid"] = "Mid";
    JobLevel["Senior"] = "Senior";
})(JobLevel || (JobLevel = {}));
class ValidatorHumanType {
    isWomen;
    constructor(isWomen) {
        this.isWomen = isWomen;
    }
    isValidate() {
        return this.isWomen ? "Kobieta" : "Mężczyzna";
    }
}
const person = {
    firstName: "Konrad",
    lastName: "Wesołowski",
    age: 23,
    isWomen: false,
    level: JobLevel.Junior,
    hobby: ["Jazda na rowerze", "Oglądanie seriali", "Gra w piłkę"]
};
function createNewUser(person) {
    const validatorHuman = new ValidatorHumanType(person.isWomen);
    const humanType = validatorHuman.isValidate();
    function generateID() {
        return Math.floor(Math.random() * (1000 - 1)) + 1;
    }
    console.log(`Stworzyłem nowe konto ${person.firstName} ${person.lastName}
Przypisano wiek: ${person.age}, poziom: ${person.level}, hobby: ${person.hobby}, płeć: ${humanType}.
ID: ${generateID()}`);
}
createNewUser(person);
