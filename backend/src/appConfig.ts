import 'dotenv/config';
import { Dialect } from "sequelize";
import { Sequelize } from 'sequelize-typescript';

const pe = process.env;
export const appConfig = {
    database: {
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
}