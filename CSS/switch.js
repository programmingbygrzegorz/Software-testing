// Przykład instrukcji switch — alternatywa dla if/else przy wielu możliwych wartościach
// stanSwiatla — zmienna której wartość jest sprawdzana w każdym case
const stanSwiatla = false;

switch(stanSwiatla) {
    case true:
        // wykonuje się gdy stanSwiatla === true
        console.log("Włączone światło");
        break;  // break zatrzymuje dalsze sprawdzanie case'ów — bez niego kod "wpadłby" do następnego case
    case false:
        // wykonuje się gdy stanSwiatla === false
        console.log("Wyłączone światło");
        break;
    default:
        // wykonuje się gdy żaden case nie pasuje (np. stanSwiatla = null, undefined, "coś innego")
        console.log("Nieznany stan światła");
}