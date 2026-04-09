import { Request, Response } from "express";
import { Menu } from "../models/Menu";


export const getMenus = async (_req: Request, res: Response) => {
    try {
        const menus = await Menu.findAll();
        return res.json(menus);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

export const getMenuById = async (req: Request, res: Response) => {
    try {
        const menu = await Menu.findByPk(req.params.id);

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
        const menu = await Menu.create(req.body);
        return res.status(201).json(menu);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateMenu = async (req: Request, res: Response) => {
    try {
        const menu = await Menu.findByPk(req.params.id);

        if (!menu) {
            return res.status(404).json({ message: "Menu not found" });
        }

        await menu.update(req.body);

        return res.json(menu);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteMenu = async (req: Request, res: Response) => {
    try {
        const menu = await Menu.findByPk(req.params.id);

        if (!menu) {
            return res.status(404).json({ message: "Menu not found" });
        }

        await menu.destroy();

        return res.json({ message: "Menu deleted" });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};