const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://www.saucedemo.com",
    redirectionLimit: 3,
    retries:{
      runMode: 1, // liczba powtórzeń testu w przypadku niepowodzenia podczas uruchamiania testów, nie widzimy przegladarki
      openMode: 1 // liczba powtórzeń testu w przypadku niepowodzenia, pojawia sie ekran z przeglądarką

    },
    watchForFileChanges: true, // wyłącza automatyczne uruchamianie testów po zmianie plików
    chromeWebSecurity: false, // wyłącza zabezpieczenia przeglądarki Chrome, co pozwala na testowanie aplikacji z różnych domen
    viewportWidth: 1920, // szerokość widoku przeglądarki podczas testów
    viewportHeight: 1080, // wysokość widoku przeglądarki podczas testów
    waitForAnimations: true, // czeka na zakończenie animacji przed wykonaniem kolejnych kroków testu
    testIsolation: false, // wyłącza izolację testów, co pozwala na zachowanie stanu między testami
  },
});
