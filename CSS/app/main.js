
// Pobiera referencję do elementu input o id "add_input" z DOM
const addInput = document.getElementById("add_input");

// Nasłuchuje zdarzenia keyup (po puszczeniu klawisza) na polu input
addInput.addEventListener("keyup", function(event) {

    // Odczytuje aktualną wartość wpisaną w polu input (właściwość .value pobiera tekst bezpośrednio z elementu <input> w HTML)
    const inputValue = addInput.value;
    // Sprawdza, czy naciśnięto Enter (keyCode 13)
    if (event.keyCode === 13 && inputValue.length > 0) {
        console.log("Item został dodany");
    }
})
    