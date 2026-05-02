import { NextFunction, Request, Response } from "express";
import { Category } from "../models/Category";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt";


export const getAllCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = await Category.findAll({
            order: [['sort_order', 'ASC']],
        });
        res.json(category);
    } catch (error) {
       next(error);
    }
}

export const getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { category_id } = req.params;
        const category = await Category.findOne({
            where: {
                category_id: category_id
            }
        });

        if (!category) {
            return res.status(404).json({
                status: "Fail",
                message: "Category dengan ID tersebut tidak ditemukan"
            })
        }

        return res.status(200).json({
            status: "Success",
            data: category
        })

    } catch (error) {
        next(error);
    }
}

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = req.body;
        payload.category_id = uuidv4();

        const { name, sort_order } = payload;

        if (!name || sort_order == undefined) {
            return res.status(400).json({
                status: "Fail",
                message: "Data tidak boleh kosong"
            })
        }

        const cekSortOrder = await Category.findOne({ where: { sort_order } });
        if (cekSortOrder) {
            return res.status(400).json({
                status: "Fail",
                message: `Nomor Sort Order ${sort_order} sudah gunakan oleh kategori "${cekSortOrder.name}"`
            })
        }

        const newCategory = await Category.create({
            category_id: uuidv4(),
            name,
            sort_order
        });

        return res.status(201).json({
            success: true,
            message: "Category berhasil di daftarkan",
            data: {
                staff_id: newCategory.category_id,
                name: newCategory.name,
                sort_order: newCategory.sort_order
            }
        })
    } catch (error: any) {
        next(error);
    }
}

export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { category_id } = req.params;

        const { name, sort_order } = req.body;

        const category = await Category.findOne({
            where: {
                category_id: category_id
            }
        });

        if (!category) {
            return res.status(404).json({
                status: "Fail",
                message: "Category dengan ID tersebut tidak ditemukan"
            })
        }
        
        if (sort_order !== undefined) {
            const cekSortOrder = await Category.findOne({ where: { sort_order } });

            //jadi kalau ada yg punya nomernya dan IDnya bukan yg meja itu maka gagal
            if (cekSortOrder && cekSortOrder.category_id !== category_id) {
                const currentCategory = cekSortOrder.name || "Kategori lain"
                return res.status(400).json({
                    status: "Fail",
                    message: `Nomor Sort Order ${sort_order} sudah gunakan oleh "${currentCategory}"`
                })
            }
        }

        await category.update({ name, sort_order });
        return res.json({
            success: true,
            message: "Data Category berhasil di update",
            data: category
        })

    } catch (error) {
        next(error)
    }
}

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { category_id } = req.params;
        const category = await Category.findOne({
            where: {
                category_id: category_id
            }
        })

        if (!category) {
            return res.status(404).json({
                status: "fail",
                message: "Category dengan ID tersebut tidak ditemukan"
            })
        }

        await category.destroy();

        return res.json({
            success: true,
            message: "Data Category berhasil di delete",
            data: category
        })

    } catch (error) {
        next(error)
    }
}