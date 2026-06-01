class Base {
    openHomePage() {
        cy.visit('https://muzeum.kulturawzasiegu.eu/');
    }
}
export default new Base();