import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt";
import { Staff } from "../models/Staff";

export const getAllStaff = async (req: Request, res: Response) => {
    try {
        const staff = await Staff.findAll({
            attributes: {
                exclude: ['password'] //ini passwordnya ga dimunculin
            }
        })
        res.json(staff);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Get All Staff error" });
    }
}

export const getStaffById = async (req: Request, res: Response) => {
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
        console.error("DEBUG ERROR GET BY ID:", error.message);
        res.status(500).json({ message: "Get staff by ID error", detail: error.message });
    }
}

export const createStaff = async (req: Request, res: Response) => {
    try {
        const payload = req.body;
        payload.staff_id = uuidv4();

        const { email, password, role} = payload;
        const hashedPassword = await bcrypt.hash(password, 10);
        payload.password = hashedPassword;

        if (!email || !password || !role) {
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
            email,
            password: hashedPassword,
            role: role
        });

        return res.status(201).json({
            success: true,
            message: "Staff berhasil di daftarkan",
            data: {
                staff_id: newStaff.staff_id,
                email: newStaff.email,
                role: newStaff.role
            }
        })
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: "Gagal Create Staff", detail: error.message })
    }
}

export const updateStaff = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const {email} = req.body;
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

        await staff.update({email});
        return res.json({
            success: true,
            message: "Data Staff berhasil di update",
            data: staff
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Get Staff by ID error" })
    }
}

export const deleteStaff = async (req: Request, res: Response) => {
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
        console.error(error);
        res.status(500).json({ message: "Get Staff by ID error" })
    }
}