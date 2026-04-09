import { Sequelize } from 'sequelize-typescript';
import { appConfig } from '../src/appConfig';

import { Menu } from '../src/models/Menu';
import { MenuVarian } from '../src/models/MenuVarian';
import { MenuOption } from '../src/models/MenuOption';
import { PaketItem } from '../src/models/PaketItem';
import { Order } from '../src/models/Order';
import { OrderMenu } from '../src/models/OrderMenu';
import { Payment } from '../src/models/Payment';

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