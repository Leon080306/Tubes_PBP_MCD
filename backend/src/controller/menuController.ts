import { NextFunction, Request, Response } from "express";
import { Menu } from '../models/Menu';
import { MenuVarian } from '../models/MenuVarian';
import { MenuOption } from '../models/MenuOption';
import { Category } from '../models/Category';
import sequelize from "../../config/database";
import { OrderMenu } from '../models/OrderMenu';
import { Op, fn, col, literal } from 'sequelize';
// import { sequelize } from "../../config/database";

export class menuController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
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
            next(error)
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

    static async getRecommendation(req: Request, res: Response,  next: NextFunction) {
        try {
            const { menu_id } = req.params;
            const limit = parseInt(req.query.limit as string) || 5;

            // Step 1: Cari order_id yang mengandung menu_id ini
            const ordersWithMenu = await OrderMenu.findAll({
                where: { menu_id },
                attributes: ['order_id'],
                raw: true,
            });

            const orderIds = [...new Set(ordersWithMenu.map(o => o.order_id))];

            if (orderIds.length === 0) {
                return res.status(200).json([]);
            }

            // Step 2: Hitung menu lain yang muncul di order tersebut
            const recommendations = await OrderMenu.findAll({
                where: {
                    order_id: { [Op.in]: orderIds },
                    menu_id: { [Op.ne]: menu_id },  // exclude menu itu sendiri
                },
                attributes: [
                    'menu_id',
                    [fn('COUNT', col('OrderMenu.menu_id')), 'bought_together_count'],
                ],
                include: [
                    {
                        model: Menu,
                        as: 'menus',
                        required: true,
                        attributes: ['menu_id', 'nama', 'harga_awal', 'gambarUrl', 'tipe_menu', 'isAvailable', 'category_id'],
                    },
                ],
                group: ['OrderMenu.menu_id', 'menus.menu_id'],
                order: [[literal('bought_together_count'), 'DESC']],
                limit,
                subQuery: false,
            });

            res.status(200).json(recommendations);
        } catch (error) {
           next(error)
        }

    }
}