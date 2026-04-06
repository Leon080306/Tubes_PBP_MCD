import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize({
    dialect: "postgres",
    host: process.env.DB_HOST as string,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
    models: [__dirname + "/../models"],
    logging: false,
});

export default sequelize;