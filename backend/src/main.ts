import "reflect-metadata";
import express from 'express';
import cors from 'cors';

import { sequelize } from "../config/database";
import menuRouter from "./routes/menuRoutes";

const app = express();

app.use(cors());
app.use(express.json());

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