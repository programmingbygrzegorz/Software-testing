const divElement = document.createElement("div");

divElement.style.width="100px";
divElement.style.height="100px";
divElement.style.backgroundColor = "red";
console.log(divElement);
const p = document.createElement("p");
p.innerText="Nowy super element"
console.log(p);

//Wstawianie elementów do HTML (DOM)
const form = document.querySelector("form");
const band = document.querySelector("#band");

form.appendChild(divElement);
//band.appendChild(divElement.cloneNode(true));

const boxBand = document.querySelector("div#band");
boxBand.appendChild(p)