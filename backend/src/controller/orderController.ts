import { Request, Response } from "express";
import { Order } from "../models/Order";
import { OrderMenu } from "../models/OrderMenu";
import { OrderMenuOption } from "../models/OrderMenuOption";
import { Menu } from "../models/Menu";
import { MenuVarian } from "../models/MenuVarian";
import { MenuOption } from "../models/MenuOption";

export const getAllOrder = async (req: Request, res: Response) => {
    try {
        const order = await Order.findAll({
            order: [['order_no', 'ASC']],
            include: [{
                model: OrderMenu,
                include: [
                    { model: Menu },
                    { model: MenuVarian },
                    {
                        model: OrderMenuOption,
                        include: [{ model: MenuOption }]
                    },
                ]
            }]
        });
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Get All Order error" });
    }
}

export const getTOrderById = async (req: Request, res: Response) => {
    try {
        const { order_id } = req.params;
        const order = await Order.findOne({
            where: { order_id },
            include: [{
                model: OrderMenu,
                include: [
                    { model: Menu },
                    { model: MenuVarian },
                    {
                        model: OrderMenuOption,
                        include: [{ model: MenuOption }]
                    },
                ]
            }]
        });

        if (!order) {
            return res.status(404).json({
                status: "Fail",
                message: "Order dengan ID tersebut tidak ditemukan"
            })
        }

        return res.status(200).json({
            status: "Success",
            data: order
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Get Order by ID error" })
    }
}

export const updateOrder = async (req: Request, res: Response) => {
    try {
        const { order_id } = req.params;

        const { total_harga, order_type, order_no, status } = req.body;

        const order = await Order.findOne({
            where: { order_id }
        });

        if (!order) {
            return res.status(404).json({
                status: "Fail",
                message: "Order dengan ID tersebut tidak ditemukan"
            })
        }

        await order.update({ total_harga, order_type, order_no, status });
        return res.json({
            success: true,
            message: "Data Order berhasil di update",
            data: order
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Get Order by ID error" })
    }
}