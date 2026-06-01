class Zbiory{
    get czasopismaCheckbox() {
        return cy.get('#taxTag_154');
    }
    get plakatyCheckbox() {
        return cy.get('#taxTag_148');
    }
    checkCzasopisma() {
        this.czasopismaCheckbox.check({ force: true });
    }
    checkPlakaty() {
        this.plakatyCheckbox.check({ force: true });
    }
}
export default new Zbiory();