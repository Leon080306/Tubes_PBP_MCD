import express from "express";
import sequelize from "./../config/database";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(3000, "0.0.0.0", () => {
    console.log("Server started!");
});