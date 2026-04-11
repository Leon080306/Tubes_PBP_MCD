import { Request, Response } from "express";
import { Order } from "../models/Order";

export const getAllOrder = async (req: Request, res: Response) => {
    try {
        const order = await Order.findAll();
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Get All Order error" });
    }
}

export const getTOrderById = async (req: Request, res: Response) => {
    try {
        const { order_id } = req.params;
        const order = await Order.findByPk(order_id as string);

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

        const order = await Order.findByPk(order_id as string);

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