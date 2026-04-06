import express from 'express';
import cors from 'cors';
// import { Sequelize } from 'sequelize-typescript';
import { Menu } from './models/Menu';
import { MenuVarian } from './models/MenuVarian';
import { PaketItem } from './models/PaketItem';
import { MenuOption } from './models/MenuOption';
import { Order } from './models/Order';
import { OrderMenu } from './models/OrderMenu';
import { Payment } from './models/Payment';
import { appConfig } from './appConfig';
import menuRoutes from "./routes/menuRoutes";

const app = express();
app.use(cors());
app.use(express.json());


// menuRouter.get('/', async (req, res) => {
//     try {
//         const menus = await Menu.findAll({
//             where: { isAvailable: true },
//             include: [MenuVarian, MenuOption]
//         });

//         res.json({
//             success: true,
//             total: menus.length,
//             records: menus
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error instanceof Error ? error.message : "Server error"
//         });
//     }
// });

// menuRouter.get('/:id', async (req, res) => {
//     const id = req.params.id;

//     const menu = await Menu.findByPk(id, {
//         include: [MenuVarian, MenuOption]
//     });

//     res.json({
//         record: menu
//     });
// });

app.use("/menu", menuRouter)

app.listen(3000, () => {
    console.log("server started!");
});
