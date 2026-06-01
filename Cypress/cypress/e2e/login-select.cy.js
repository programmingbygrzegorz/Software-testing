/// <reference types="cypress" />

describe('Login test with fixtures', () => {

  // KROK 1: Logowanie użytkownika
  it('should login using fixture data', () => {
    cy.fixture('login').then((user) => {
      // Wejście na stronę główną (SauceDemo)
      cy.visit('/')

      // Wprowadzanie danych logowania pobranych z pliku fixture
      cy.get('#user-name').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login-button').click()

      // Sprawdzenie, czy logowanie się udało i jesteśmy na właściwej stronie
      cy.url().should('include', '/inventory.html')
      cy.get('.app_logo').should('have.text', 'Swag Labs')
    })
  })

  // KROK 2: Sortowanie produktów na liście
  it('Wybór opcji z listy rozwijanej i sprawdzenie wartości', () => {
    // Dzięki testIsolation: false jesteśmy już zalogowani na stronie /inventory.html
    cy.url().should('include', '/inventory.html')

    // Łapiemy listę rozwijaną za pomocą poprawnego selektora z myślnikiem "product-sort-container"
    cy.get('[data-test="product-sort-container"]', { timeout: 10000 })
      .should('be.visible')
      .select('za') // Wybieramy opcję 'Name (Z to A)', która w HTML ma value="za"

    // Odwołanie (Asercja): Sprawdzamy, czy wartość w elemencie select na pewno zmieniła się na 'za'
    cy.get('[data-test="product-sort-container"]').should('have.value', 'za')
  })

})