class Samochod{
    //marka, model, rok, kolor — to parametry, czyli "puste sloty", do których trafią wartości podane przy tworzeniu obiektu.
    constructor(marka, model, rok, kolor ) {
        this.markaSamochodu = marka;
        this.modelSamochodu = model;
        this.rokProdukcji = rok;
        this.kolorSamochodu = kolor;
    }
    //tworzymy metodę przywitaj, która wyświetli w konsoli powitanie z informacjami o samochodzie
    przywitaj() {
        console.log(`Witaj! Jestem samochodem marki ${this.markaSamochodu}, model ${this.modelSamochodu}, wyprodukowany w roku ${this.rokProdukcji}, w kolorze ${this.kolorSamochodu}.`);
    }
    pokazrokProdukcji() {
        console.log(`Rok produkcji samochodu marki ${this.markaSamochodu} to ${this.rokProdukcji}.`);
    }
}
// Tworzymy dwa obiekty klasy Samochod
const fiat = new Samochod("Fiat", "Punto", 2005, "czerwony");
const opel = new Samochod("Opel", "Astra", 2010, "czarny");

console.log(fiat);
console.log(opel);

//Wywolujemy metodę przywitaj() dla obiektu fiat
fiat.przywitaj();
opel.przywitaj();
