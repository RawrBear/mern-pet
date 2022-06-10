const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Welcome to the home page");
});

app.get("/admin", (req, res) => {
    res.send("Welcome to the admin page");
});

app.listen(3000);
