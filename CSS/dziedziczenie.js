class DrugaKlasa{
    druga(){
        return "Druga klasa";
    }
}

class PierwszaKlasa extends DrugaKlasa{
    pierwsza(){
        return "Pierwsza klasa";
    }
}

const obiekt1 = new PierwszaKlasa();
const obiekt2 = new DrugaKlasa();

console.log(obiekt1.pierwsza())
console.log(obiekt2.druga())
console.log(obiekt1.druga()) // dziedziczenie z klasy DrugaKlasa
