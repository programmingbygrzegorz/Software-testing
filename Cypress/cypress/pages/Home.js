class Home {
    get zbioryLink() {
        return cy.contains('a', 'Zbiory', { matchCase: false });
    }

    clickOnZbiory() {
        this.zbioryLink.click({ force: true });
    }
    }

export default new Home();