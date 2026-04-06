import { Sequelize } from 'sequelize-typescript';
import { appConfig } from '../appConfig';

import { Menu } from '../models/Menu';
import { MenuVarian } from '../models/MenuVarian';
import { MenuOption } from '../models/MenuOption';
import { PaketItem } from '../models/PaketItem';
import { Order } from '../models/Order';
import { OrderMenu } from '../models/OrderMenu';
import { Payment } from '../models/Payment';

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