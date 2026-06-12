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
const server = app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));

process.on("SIGTERM", () => {
    server.close(() => {
        console.log("Server closing, good night.");
        process.exit(0);
    });
});

process.on("SIGINT", () => {
    server.close(() => {
        console.log("Server closing, good night.");
        process.exit(0);
    });
});

