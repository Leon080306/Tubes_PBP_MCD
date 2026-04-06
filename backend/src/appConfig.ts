import 'dotenv/config';
import { Dialect } from "sequelize";
import { Sequelize } from 'sequelize-typescript';

const pe = process.env;
export const appConfig = {
    database : {
        DBUsername: pe.DB_USERNAME ?? "postgres",
        DBPassword: pe.DB_PASSWORD ?? "pass",
        DBName: pe.DB_NAME ?? "tubes_pbp_mcd",
        DBHost: pe.DB_HOST ?? "localhost",
        DBPort: parseInt(pe.DB_PORT ?? '5432'),
        DBDialect: (pe.DB_DIALECT ?? "postgres") as Dialect
    },
    server: {
        port: parseInt(pe.PORT ?? '3000')
    },
    // jwt: {
    //     secret: pe.JWT_SECRET ?? 'secret'
    // }
}

export const sequelize = new Sequelize({
    username: appConfig.database.DBUsername,
    password: appConfig.database.DBPassword,
    database: appConfig.database.DBName,
    host: appConfig.database.DBHost,
    port: Number(appConfig.database.DBPort),
    dialect: appConfig.database.DBDialect,
    models: [
        Menu,
        MenuVarian,
        MenuOption,
        PaketItem,
        Order,
        OrderMenu,
        Payment
    ]
});