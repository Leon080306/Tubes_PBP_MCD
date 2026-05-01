import e, { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt";
import { Staff } from "../models/Staff";

export const getAllStaff = async (req: Request, res: Response,  next: NextFunction) => {
    try {
        const staff = await Staff.findAll({
            attributes: {
                exclude: ['password'] //ini passwordnya ga dimunculin
            }
        })
        res.json(staff);
    } catch (error) {
        next(error)
    }
}

export const getStaffById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const staff = await Staff.findOne({
            where:{
                staff_id: id,
            },
            attributes: {
                exclude: ['password']
            }
        })

        if (!staff) {
            return res.status(404).json({
                status: "fail",
                message: "Staff dengan ID tersebut tidak ditemukan"
            })
        }

        return res.status(200).json({
            status: "Success",
            data: staff
        })
    } catch (error: any) {
        next(error)
    }
}

export const createStaff = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = req.body;
        payload.staff_id = uuidv4();

        const { name, email, password, role} = payload;
        const hashedPassword = await bcrypt.hash(password, 10);
        payload.password = hashedPassword;

        if (!name || !email || !password || !role) {
            return res.status(400).json({
                status: "Fail",
                message: "Data tidak boleh kosong"
            })
        }

        const validRoles = ['Admin', 'Cashier'];
        if (!validRoles) {
            return res.status(400).json({
                status: "Fail",
                message: 'Role tidak sesuai'
            })
        }

        const newStaff = await Staff.create({
            staff_id: uuidv4(),
            name,
            email,
            password: hashedPassword,
            role: role
        });

        return res.status(201).json({
            success: true,
            message: "Staff berhasil di daftarkan",
            data: {
                staff_id: newStaff.staff_id,
                name: newStaff.name,
                email: newStaff.email,
                role: newStaff.role
            }
        })
    } catch (error: any) {
        next(error)
    }
}

export const updateStaff = async (req: Request, res: Response,  next: NextFunction) => {
    try {
        const { id } = req.params;
        const {email, name} = req.body;
        console.log("DATA DARI FRONTEND:", req.body);
        const staff = await Staff.findOne({
            where:{
                staff_id: id,
            },
            attributes: {
                exclude: ['password']
            }
        })

        if (!staff) {
            return res.status(404).json({
                status: "fail",
                message: "Staff dengan ID tersebut tidak ditemukan"
            })
        }

        const result = await staff.update({ email, name });
        console.log("HASIL UPDATE DATABASE:", result.toJSON());
        return res.json({
            success: true,
            message: "Data Staff berhasil di update",
            data: result
        })

    } catch (error) {
        next(error)
    }
}

export const deleteStaff = async (req: Request, res: Response,  next: NextFunction) => {
    try {
        const { id } = req.params;
        const staff = await Staff.findOne({
            where: {
                staff_id:id
            },
            attributes: {
                exclude: ['password']
            }
        })

        if (!staff) {
            return res.status(404).json({
                status: "fail",
                message: "Staff dengan ID tersebut tidak ditemukan"
            })
        }

        await staff.destroy();

        return res.json({
            success: true,
            message: "Data Staff berhasil di delete",
            data: staff
        })

    } catch (error) {
        next(error)
    }
}