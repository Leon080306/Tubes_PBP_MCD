import { Request, Response } from "express";
import { Menu } from "../models/Menu";
import { Category } from "../models/Category";
import { MenuVarian } from "../models/MenuVarian";
import { MenuOption } from "../models/MenuOption";


export const getMenus = async (_req: Request, res: Response) => {
    try {
        const menus = await Menu.findAll({
            include: [
                {
                    model: Category
                }
            ]
        });

        return res.json({ records: menus });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

export const getMenuById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        if (!id || Array.isArray(id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const menu = await Menu.findByPk(id);

        if (!menu) {
            return res.status(404).json({ message: "Menu not found" });
        }

        return res.json(menu);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

export const createMenu = async (req: Request, res: Response) => {
    try {
        console.log("BODY:", req.body);

        const {
            nama,
            harga_awal,
            tipe_menu,
            category_id,
            isAvailable
        } = req.body;

        const gambarUrl = req.filePath;

        const menu = await Menu.create({
            nama,
            harga_awal,
            tipe_menu,
            category_id,
            isAvailable,
            gambarUrl
        });

        const variants = JSON.parse(req.body.variants || "[]");
        const options = JSON.parse(req.body.options || "[]");

        for (const v of variants) {
            await MenuVarian.create({
                menu_id: menu.menu_id,
                nama_varian: v.name,
                harga_tambahan: v.price
            });
        }

        for (const o of options) {
            await MenuOption.create({
                menu_id: menu.menu_id,
                nama_option: o.name,
                tambahan_harga: o.price
            });
        }

        return res.status(201).json({
            success: true,
            message: "Menu + variants + options berhasil dibuat",
            data: menu
        });

    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

export const updateMenu = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        if (!id || Array.isArray(id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const menu = await Menu.findByPk(id);

        if (!menu) {
            return res.status(404).json({ message: "Menu not found" });
        }

        const {
            nama,
            harga_awal,
            tipe_menu,
            category_id,
            isAvailable
        } = req.body;

        console.log("UPDATE BODY:", req.body);

        await menu.update({
            nama,
            harga_awal,
            tipe_menu,
            category_id,
            isAvailable
        });

        return res.json({
            success: true,
            data: menu
        });

    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

export const deleteMenu = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        if (!id || Array.isArray(id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const menu = await Menu.findByPk(id);

        if (!menu) {
            return res.status(404).json({ message: "Menu not found" });
        }

        await menu.destroy();

        return res.json({ message: "Menu deleted" });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};