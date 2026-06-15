import { uploaderUrl } from "../../lib/pages";
// moduł Node.js do budowania ścieżek do plików
const path = require("path");


describe("Lesson 6 - Upload File", async() => {
    // TEST 1 - otwiera stronę do uploadu i weryfikuje URL
    it("Should open upload page and verify url", async () => {
        // nawiguje do strony z formularzem uploadu pliku
        await browser.url(uploaderUrl);
        // sprawdza czy URL strony jest poprawny
        await expect(browser).toHaveUrl(uploaderUrl);
    })

    // TEST 2 - uploaduje plik i weryfikuje wynik
    it("Should upload file, and click upload button", async () => {
        // znajduje pole input do wyboru pliku
        const input = $("#file-upload");
        // znajduje przycisk "Upload" do zatwierdzenia
        const btnUpload = $("#file-submit");
        // buduje absolutną ścieżkę do pliku ziemia.jpg w katalogu images
        const filePath = path.join(__dirname, "../../images/ziemia.jpg");
        // przesyła plik na serwer WebdriverIO i zwraca tymczasową ścieżkę
        const uploadedFile = await browser.uploadFile(filePath);
        // wpisuje ścieżkę do pliku w pole input (ustawia plik do uploadu)
        await input.setValue(uploadedFile);
        // klika przycisk Upload żeby wysłać plik
        await btnUpload.click();
        // czeka 5 sekund na załadowanie strony z wynikiem
        await browser.pause(5000)
        // znajduje nagłówek h3 który pokazuje wynik uploadu
        const h3 = await $("div#content h3");
        // znajduje element z nazwą uploadowanego pliku
        const p = await $("#uploaded-files");
        // sprawdza czy nagłówek zawiera "File Uploaded!"
        await expect(await h3.getText()).toContain("File Uploaded!")
        // sprawdza czy na liście znajduje się nazwa uploadowanego pliku
        await expect(await p.getText()).toContain("ziemia.jpg")
    })

})