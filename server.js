const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(express.static("."));

app.get("/api/books", (req, res) => {
    const books = JSON.parse(fs.readFileSync("data/books.json"));
    res.json(books);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
