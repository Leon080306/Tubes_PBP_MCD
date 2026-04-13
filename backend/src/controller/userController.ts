import { Staff } from "../models/Staff";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getAllUser = async (req: Request, res: Response) => {
    try {
        const staff = await Staff.findAll();
        res.json(staff);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "data error" });
    }
}

export const getOneUser = async (req: Request, res:Response) => {
    try {
        const staffData = (req as any).user;
        if (!staffData) {
            return res.status(404).json({
                message: "Data tidak bisa di temukan"
            })
        }

        res.status(200).json({
            message:"succes",
            user:staffData
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "data tidak ditemukan" });
    }
}
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const staff = await Staff.findOne({
            where: { email }
        });

        if (!staff) {
            return res.status(404).json({
                message: "User dengan email tersebut tidak ditemukan"
            })
        }

        const isMatch = await bcrypt.compare(password, staff.getDataValue("password"));
        if (!isMatch) {
            return res.status(401).json({ message: "Password Salah" })
        }

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET not defined")
        }

        const token = jwt.sign(
            {
                id: staff.getDataValue("staff_id"),
                email: staff.getDataValue("email"),
                role: staff.getDataValue("role"),
            },
            process.env.JWT_SECRET, // nanti kita pindahin ke .env
            { expiresIn: "1d" }
        )

        res.json({
            message: "Login success",
            token
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Login error" });
    }
}

export const forgotPassword = async (req: Request, res:Response) => {
    try {
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Forgot Password error" });
    }
}