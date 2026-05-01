import { Staff } from "../models/Staff";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getAllUser = async (req: Request, res: Response,  next: NextFunction) => {
    try {
        const staff = await Staff.findAll();
        res.json(staff);
    } catch (error) {
        next(error)
    }
}

export const getOneUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const staffData = (req as any).user;
        if (!staffData) {
            return res.status(404).json({
                message: "Data tidak bisa di temukan"
            })
        }

        res.status(200).json({
            message: "succes",
            user: staffData
        })
    } catch (error) {
        next(error)
    }
}
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
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
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        res.json({
            message: "Login success",
            token
        })

    } catch (error) {
        next(error)
    }
}

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (error) {
        next(error)
    }
}