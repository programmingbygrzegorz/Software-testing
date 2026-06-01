/// <reference types="cypress" />
import Base from '../../pages/base';
import Home from '../../pages/Home';
import Zbiory from '../../pages/Zbiory';

// describe('Test związany z zaznaczaniem checkboxow', () => {
//     it('Klikniecie w zakladke zbiory', () => {
//         cy.visit('https://muzeum.kulturawzasiegu.eu/');
//         cy.get('a[href*="/wyszukiwarka/"]').first().click({ force: true });
//     })
//     it('Zaznaczanie checkboxa w zaklade zbiory', () => {
//         cy.get('#taxTag_154').check()
//         cy.get('#taxTag_148').check()
//       })  
// })


// describe('Test związany z zaznaczaniem checkboxow', () => {

//     it('Bezpośrednie wejście do zbiorów i zaznaczenie filtrów', () => {
//            // 1. Pomijamy klikanie w menu i wchodzimy OD RAZU tam, gdzie są checkboxy
//         cy.visit('https://muzeum.kulturawzasiegu.eu/wyszukiwarka/');

//         // 2. Czekamy max 10 sekund, aż element pojawi się w DOM
//         cy.get('#taxTag_154', { timeout: 10000 }).should('exist');

//         // 3. Zaznaczamy ukryte checkboxy (0x0px) za pomocą force: true
//         cy.get('#taxTag_154').check({ force: true });
//         cy.get('#taxTag_148').check({ force: true });

//         // 4. Asercja sprawdzająca, czy Cypress skutecznie zmienił ich stan
//         cy.get('#taxTag_154').should('be.checked');
//         cy.get('#taxTag_148').should('be.checked');
//     });

// });

// Rozdzielenie na dwa kroki działa, ponieważ masz wyłączoną izolację testów (testIsolation: false)
describe('Test związany z zaznaczaniem checkboxow', () => {

    it('Krok 1: Klikniecie w zakladke zbiory', () => {
        // Ustawiamy duży ekran, by zminimalizować problemy z menu
        cy.viewport(1920, 1080);
        
        Base.openHomePage();

        // Używamy force: true, ponieważ skrypty strony chowają to menu przed Cypressem
        Home.clickOnZbiory();

        // Czekamy i upewniamy się, że strona faktycznie się zmieniła
        cy.url().should('include', '/wyszukiwarka/');
    });

    it('Krok 2: Zaznaczanie checkboxa w zaklade zbiory', () => {
        // Nie musimy robić cy.visit(), bo dzięki testIsolation: false jesteśmy już na podstronie zbiorów
        
        // Czekamy na załadowanie elementu w kodzie strony
        cy.get('#taxTag_154', { timeout: 10000 }).should('exist');

        // Używamy force: true, bo styl CSS ukrywa inputy (błąd 0 x 0 pikseli)
        Zbiory.checkCzasopisma();
        Zbiory.checkPlakaty();

        // Sprawdzamy czy operacja się udała
        Zbiory.czasopismaCheckbox.should('be.checked');
        Zbiory.plakatyCheckbox.should('be.checked');
        //cy.get('#taxTag_154').should('be.checked');
        // cy.get('#taxTag_148').should('be.checked');
    });

})
