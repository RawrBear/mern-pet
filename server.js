const { MongoClient } = require("mongodb");
const express = require("express");
let db;

const app = express();

app.get("/", async (req, res) => {
    const allAnimals = await db.collection("animals").find().toArray();
    console.log("allAnimals", allAnimals);
    res.send("Welcome to the home page");
});

app.get("/admin", (req, res) => {
    res.send("Welcome to the admin page");
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
