//Pierwszy sposób pobierania elementów querySelector

const h2Band = document.querySelector("div#band h2.w3-wide");
const bandBox = document.querySelector("div#band");
const snapchatIcon = document.querySelector("footer i:nth-child(3)");
const div = document.querySelector("div");
console.log(h2Band);
console.log(bandBox);
console.log(snapchatIcon);
console.log(div);

//Drugi sposób pobieranie elementow - querySelectorAll
const div2 = document.querySelectorAll("div");
console.log(div2)

//Trzeco sposób pobieranie elementow - getElementClassName
const specialBtn = document.getElementsByClassName("special")
console.log(specialBtn);

//Czwarty sposób pobieranie elementow - getElementById
const navDemoElemenet = document.getElementById("navDemo");
console.log(navDemoElemenet);


//Piąty sposób pobieranie elementow - getElementTagName
const imgElement = document.getElementsByTagName("img");
console.log(imgElement);