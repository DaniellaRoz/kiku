document.getElementById("js-only").classList.remove("requires-js");

const languageToggleButton = document.getElementById("language-toggle-button")

let currentLanguage = "ja";

async function loadBooks() {
    const data = await (await fetch("/api/books")).json();
    const books = data.books // List

    const table = document.getElementById("book-table");

    const jaHeaders = ["タイトル", "著者", "発行年", "文字数", "完了回数"];
    const enHeaders = ["Title", "Author", "Year", "Characters", "Times Read"];
    const headers = table.querySelectorAll("th");

    headers.forEach((th, i) => {
        th.textContent = currentLanguage === "ja" ? jaHeaders[i] : enHeaders[i];
    });


    if (currentLanguage === "ja") {
        table.classList.add("ja");
    } else {
        table.classList.remove("ja");
    }

    let characterCountSum = 0;
    
    while (table.rows.length > 1) table.deleteRow(1);

    for (let i = 0; i < books.length; i++) {        
        let timesRead = books[i]["timesRead"];

        characterCountSum += parseInt(books[i]["characterCount"]) * parseInt(timesRead);

        let newRow = table.insertRow(-1);

        let title = newRow.insertCell(0);
        let author = newRow.insertCell(1);
        let year = newRow.insertCell(2);
        let characterCount = newRow.insertCell(3);
        let timesReadCell = newRow.insertCell(4);

        title.textContent = currentLanguage === "ja" ? books[i]["title"] : books[i]["titleRoman"];
        author.textContent = currentLanguage === "ja" ? books[i]["author"] : books[i]["authorRoman"];
        year.textContent = books[i]["year"] + (currentLanguage === "ja" ? "年" : "");
        characterCount.textContent = books[i]["characterCount"] + (currentLanguage === "ja" ? "字" : "");
        timesReadCell.textContent = timesRead + (currentLanguage === "ja" ? "回" : "");
    }

    let sumRow = table.insertRow(-1);
    sumRow.id = "sum-row";

    let title = sumRow.insertCell(0);
    let _blank1 = sumRow.insertCell(1);
    let _blank2 = sumRow.insertCell(2);
    let sum = sumRow.insertCell(3);
    let _blank3 = sumRow.insertCell(4);

    title.innerHTML = currentLanguage === "ja" ? `<strong>文字数の合計</strong>` : `<strong>Character count sum</strong>`
    sum.innerHTML = `<strong>${characterCountSum}</strong>` + (currentLanguage === "ja" ? "字" : ""); 
}

languageToggleButton.addEventListener("click", () => {
    if (currentLanguage === "ja") {
        currentLanguage = "en";
        languageToggleButton.textContent = "日本語に変える";
    } else {
        currentLanguage = "ja";
        languageToggleButton.textContent = "English Please";
    }

    loadBooks();
});

loadBooks();