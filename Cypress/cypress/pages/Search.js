import {searchPhrase} from '../fixtures/searchData.json';

class Search{
    get searchBox() {
        return cy.get("#search");
    }

    typeInSearchBox() {
    this.searchBox.type(SearchPhrase);
    //typeInSearchBox(SerchValue) {
    //this.searchBox.type(SerchValue);
    }
    clearSearchPhrase() {
        this.SearchBox.clear();

    }
}
export default new Search();