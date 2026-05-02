import { Staff } from "../models/Staff";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { createTransporter } from "../utils/mailer";
import nodemailer from "nodemailer";

export const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
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
        const { email } = req.body;

        const staff = await Staff.findOne({ where: { email } });
        if (!staff) {
            return res.json({ message: "If that email exists, a reset link has been sent." });
        }

        const token = crypto.randomBytes(32).toString("hex");
        const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

        staff.reset_token = tokenHash;
        staff.reset_token_expiry = new Date(Date.now() + 1000 * 60 * 30);
        await staff.save();

        const resetLink = `http://localhost:5173/admin/reset-password?token=${token}`;

        const { transporter } = await createTransporter();

        const info = await transporter.sendMail({
            from: '"Support" <support@yourapp.com>',
            to: staff.email,
            subject: "Password Reset Request",
            html: `
                    <p>Hi ${staff.name},</p>
                    <p>Click the link below to reset your password. This link expires in 30 minutes.</p>
                    <a href="${resetLink}">${resetLink}</a>
                    <p>If you didn't request this, ignore this email.</p>
                `,
        });

        console.log("Preview URL:", nodemailer.getTestMessageUrl(info));

        res.json({ message: "If that email exists, a reset link has been sent." });
    } catch (error) {
        res.status(500).json({ message: error });
        throw error;
    }
}

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { token, newPassword } = req.body;
        const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

        const staff = await Staff.findOne({ where: { reset_token: tokenHash } });

        if (!staff || !staff.reset_token_expiry || staff.reset_token_expiry < new Date()) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        staff.password = await bcrypt.hash(newPassword, 10);
        staff.reset_token = null!;
        staff.reset_token_expiry = null!;
        await staff.save();

        res.json({ message: "Password reset successfully" });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const verifyResetToken = async (req: Request, res: Response) => {
    try {
        const { token } = req.query;
        if (!token || typeof token !== "string") {
            return res.status(400).json({ valid: false, message: "Token required" });
        }

        const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
        const staff = await Staff.findOne({ where: { reset_token: tokenHash } });

        if (!staff || !staff.reset_token_expiry || staff.reset_token_expiry < new Date()) {
            return res.status(400).json({ valid: false, message: "Invalid or expired token" });
        }

        return res.json({ valid: true });
    } catch (error) {
        next(error)
    }
};