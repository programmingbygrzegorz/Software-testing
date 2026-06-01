/// <reference types="cypress" />
import Base from '../../pages/base';
import Search from '../../pages/Search';
import searchData from '../../fixtures/searchData.json';

describe('Wpisywanie tekstu w wyszukiwarke', () => {
    it('Wpisywanie tekstu', () => {
        Base.openHomePage();
        //Search.typeInSearchBox("Raz Dwa Trzy");
        Search.typeInSearchBox(searchPhrase);
        Search.searchBox.should('have.value', searchPhrase);
        //cy.get("#search").type("Wotum");
        cy.wait(3000);
        Search.clearSearchPhrase();
        //cy.get("#search").clear();
        cy.wait(3000);
        Search.typeInSearchBox(`${searchPhrase} {enter}`);
        //cy.get("#search").type("Wotum {enter}");
    })
})
        