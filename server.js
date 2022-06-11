const { MongoClient } = require("mongodb");
const express = require("express");
let db;

const app = express();
app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", async (req, res) => {
    const allAnimals = await db.collection("animals").find().toArray();

    res.render("home", { allAnimals });
});

app.get("/admin", (req, res) => {
    res.render("admin");
});

async function start() {
    const client = new MongoClient(
        "mongodb://root:root@localhost:27017/MernPetApp?authSource=admin"
    );
    await client.connect();
    db = client.db();
    app.listen(3000);
}

start();
