///reference types="cypress" />


describe('Login test with fixtures', () => {
  it('should login using fixture data', () => {

    cy.fixture('login').then((user) => {

      cy.visit('/')

      cy.get('#user-name').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login-button').click()

      cy.url().should('include', '/inventory.html')
      cy.get('.app_logo').should('have.text', 'Swag Labs')

    })

  })
})