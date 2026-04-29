import { Request, Response } from 'express';
import { Menu } from '../models/Menu';
import { MenuVarian } from '../models/MenuVarian';
import { MenuOption } from '../models/MenuOption';
import { Category } from '../models/Category';
import sequelize from "../../config/database";
// import { sequelize } from "../../config/database";

export class menuController {
    static async getAll(req: Request, res: Response) {
        try {
            const menus = await Menu.findAll({
                where: { isAvailable: true },
                include: [
                    MenuVarian,
                    MenuOption,
                    Category
                ]
            });

            res.json({
                success: true,
                total: menus.length,
                records: menus
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Get All Menu error" });
        }
    }

    static async getById(req: Request, res: Response) {
        const id = req.params.id as string;

        const menu = await Menu.findByPk(id, {
            include: [MenuVarian, MenuOption, Category]
        });

        res.json({
            record: menu
        });
    }
}