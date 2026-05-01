import { NextFunction, Request, Response } from "express";
import { Order } from "../models/Order";
import { OrderMenu } from "../models/OrderMenu";
import { OrderMenuOption } from "../models/OrderMenuOption";
import { Menu } from "../models/Menu";
import { MenuVarian } from "../models/MenuVarian";
import { MenuOption } from "../models/MenuOption";
import { PaketItem } from "../models/PaketItem";

export const getPackageByMenuId = async (req: Request, res: Response,  next: NextFunction) => {
    try {
        const { menu_id } = req.params;
        const paket = await PaketItem.findAll({
            where: { item_menu_id: menu_id },
            include: [{ model: Menu, as: 'pakets' }],
        });
        res.json(paket);
    } catch (error) {
       next(error)
    }
}