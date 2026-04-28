import express from "express";
// import dotenv from 'dotenv';
import globalStaffApi from './roots/GlobalStaffApi';
import sequelize from "./../config/database";
console.log("MODELS:", sequelize.models);
import "reflect-metadata";
import cors from 'cors';
import menuRouter from "./routes/menuRoutes";
import Catego from "./routes/menuRoutes";
import fileUpload from "express-fileupload";

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    abortOnLimit: true
}));
app.use(express.json());

app.use('/api', globalStaffApi);

app.get("/api/test", (req, res) => {
    res.send("API Jalur /api/test sudah nyambung!");
});

app.use("/menu", menuRouter)

async function start() {
    try {
        await sequelize.authenticate();
        console.log("DB Successfully Connected");

        app.listen(3000, () => {
            console.log("server started!");
        });

    } catch (error) {
        console.error("Database connection failed:", error);
    }
}

start();