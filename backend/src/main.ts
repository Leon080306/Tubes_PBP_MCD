import express from "express";
// import dotenv from 'dotenv';
import globalStaffApi from './roots/GlobalStaffApi';
import sequelize from "./../config/database";

console.log("MODELS:", sequelize.models);
// dotenv.config();

const app = express();

app.use(express.json());

app.use('/api', globalStaffApi);

app.get("/api/test", (req, res) => {
    res.send("API Jalur /api/test sudah nyambung!");
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// app.listen(3000, "0.0.0.0", () => {
//     console.log("Server started!");
// });

sequelize.authenticate()
    .then(() => console.log("DB Successfully Connected"))
    .catch(err => console.error("DB Error: ", err));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server is Running")
});