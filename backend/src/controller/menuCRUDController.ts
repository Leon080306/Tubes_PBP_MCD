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
        const file = (req as any).file;

        const {
            nama,
            harga_awal,
            tipe_menu,
            category_id,
            isAvailable
        } = req.body;

        let gambarUrl = null;

        if (file) {
            const folder = (req as any).uploadFolder ?? "menus";
            gambarUrl = `uploads/${folder}/${file.filename}`;
        }

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

        const validVariants = variants.filter(
            (v: any) => v.name?.trim() && v.price !== "" && v.price !== null
        );
        const validOptions = options.filter(
            (o: any) => o.name?.trim() && o.price !== "" && o.price !== null
        );

        for (const v of validVariants) {
            await MenuVarian.create({
                menu_id: menu.menu_id,
                nama_varian: v.name,
                harga_tambahan: v.price
            });
        }

        for (const o of validOptions) {
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
        const file = (req as any).file;

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

        let gambarUrl = null;

        if (file) {
            const folder = (req as any).uploadFolder ?? "menus";
            gambarUrl = `uploads/${folder}/${file.filename}`;
        }

        await menu.update({
            nama,
            harga_awal,
            tipe_menu,
            category_id,
            isAvailable,
            gambarUrl
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