import { Request, Response } from 'express';
import { Menu } from '../models/Menu';
import { MenuVarian } from '../../src/models/MenuVarian';
import { MenuOption } from '../../src/models/MenuOption';
import sequelize from "../../config/database";

export class menuController {
    static async getAll(req: Request, res: Response) {
        try {
            const menus = await Menu.findAll({
                where: { isAvailable: "true" },
                include: [MenuVarian, MenuOption]
            });

            res.json({
                success: true,
                total: menus.length,
                records: menus
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : "Server error"
            });
        }
    }

    static async getById(req: Request, res: Response) {
        const id = req.params.id as string;

        const menu = await Menu.findByPk(id, {
            include: [MenuVarian, MenuOption]
        });

        res.json({
            record: menu
        });
    }
}