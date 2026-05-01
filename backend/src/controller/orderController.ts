import { NextFunction, Request, Response } from "express";
import { Order } from "../models/Order";
import { OrderMenu } from "../models/OrderMenu";
import { OrderMenuOption } from "../models/OrderMenuOption";
import { Menu } from "../models/Menu";
import { MenuVarian } from "../models/MenuVarian";
import { MenuOption } from "../models/MenuOption";

export const getAllOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order = await Order.findAll({
            order: [['order_no', 'ASC']],
            include: [
                {
                    model: OrderMenu,
                    as: 'orderMenus',
                    attributes: ['om_id', 'order_id', 'menu_id', 'mv_id', 'harga_awal', 'quantity'],
                    include: [
                        {
                            model: Menu,
                            as: 'menus',
                        },
                        {
                            model: MenuVarian,
                            as: 'mvs',
                        },
                        {
                            model: OrderMenuOption,
                            as: 'options',
                            include: [
                                {
                                    model: MenuOption,
                                    as: 'menuOption',
                                },
                            ],
                        },
                    ]
                }
            ],
        });
        res.json(order);
    } catch (error) {
        next(error)
    }
}

export const getTOrderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { order_id } = req.params;
        const order = await Order.findOne({
            where: { order_id },
            include: [
                {
                    model: OrderMenu,
                    as: 'orderMenus',
                    attributes: ['om_id', 'order_id', 'menu_id', 'mv_id', 'harga_awal', 'quantity'],
                    include: [
                        {
                            model: Menu,
                            as: 'menus',
                        },
                        {
                            model: MenuVarian,
                            as: 'mvs',
                        },
                        {
                            model: OrderMenuOption,
                            as: 'options',
                            include: [
                                {
                                    model: MenuOption,
                                    as: 'menuOption',
                                },
                            ],
                        },
                    ]
                }
            ],
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
        next(error)
    }
}

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { total_harga, order_type, items } = req.body;

        if (!order_type || !['Dine-in', 'Takeaway'].includes(order_type)) {
            return res.status(400).json({
                status: "Fail",
                message: "order_type tidak valid"
            })
        }

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                status: "Fail",
                message: "Items pesanan kosong"
            })
        }

        // Validate each item
        for (const [idx, item] of items.entries()) {
            if (!item.menu_id) {
                return res.status(400).json({
                    status: "Fail",
                    message: `Item ke-${idx + 1}: menu_id wajib diisi`
                })
            }
            if (typeof item.harga_awal !== 'number') {
                return res.status(400).json({
                    status: "Fail",
                    message: `Item ke-${idx + 1}: harga_awal tidak valid`
                })
            }
            if (typeof item.quantity !== 'number' || item.quantity < 1) {
                return res.status(400).json({
                    status: "Fail",
                    message: `Item ke-${idx + 1}: quantity tidak valid`
                })
            }
        }

        // Generate order_no (auto increment)
        const lastOrder = await Order.findOne({
            order: [['order_no', 'DESC']]
        });
        const nextOrderNo = (lastOrder?.order_no ?? 0) + 1;

        // Create Order
        const order = await Order.create({
            waktu_pesanan: new Date(),
            total_harga,
            order_type,
            order_no: nextOrderNo,
            status: 'Cart',
        });

        // Create OrderMenu (1 row per cart item) + OrderMenuOption
        for (const item of items) {
            const orderMenu = await OrderMenu.create({
                order_id: order.order_id,
                menu_id: item.menu_id,
                mv_id: item.mv_id ?? null,
                harga_awal: item.harga_awal,
                quantity: item.quantity,
            });

            if (Array.isArray(item.selectedOptions) && item.selectedOptions.length > 0) {
                for (const opt of item.selectedOptions) {
                    if (!opt.mo_id) continue;
                    await OrderMenuOption.create({
                        om_id: orderMenu.om_id,
                        mo_id: opt.mo_id,
                    });
                }
            }
        }

        // Get full order with relations
        const newOrder = await Order.findOne({
            where: { order_id: order.order_id },
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

        return res.status(201).json({
            success: true,
            message: "Data Order berhasil dibuat",
            data: newOrder
        })

    } catch (error) {
        next(error)
    }
}

export const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { order_id } = req.params;

        const { order_type, order_no, status } = req.body;

        const order = await Order.findOne({
            where: { order_id }
        });

        if (!order) {
            return res.status(404).json({
                status: "Fail",
                message: "Order dengan ID tersebut tidak ditemukan"
            })
        }

        await order.update({ order_type, order_no, status });
        return res.json({
            success: true,
            message: "Data Order berhasil di update",
            data: order
        })

    } catch (error) {
        next(error);
    }
}