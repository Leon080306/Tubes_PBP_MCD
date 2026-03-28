import express from "express";
import { Sequelize } from "sequelize-typescript";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(3000, "0.0.0.0", () => {
    console.log("Server started!");
});