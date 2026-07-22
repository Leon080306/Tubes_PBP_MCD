import { Request, Response, NextFunction } from "express";
import { createOrder } from "../controller/orderController";
import { Order } from "../models/Order";
import { OrderMenu } from "../models/OrderMenu";
import { OrderMenuOption } from "../models/OrderMenuOption";
import { Menu } from "../models/Menu";
import { getMenuById, getMenus } from "../controller/menuCRUDController";
import { Category } from "../models/Category";
import { getPackageByMenuId } from "../controller/packageController";
import { PaketItem } from "../models/PaketItem";
import { menuController } from "../controller/menuController";

jest.mock("../models/Order", () => ({
    Order: {
        findOne: jest.fn(),
        create: jest.fn(),
    },
}));

jest.mock("../models/OrderMenu", () => ({
    OrderMenu: {
        create: jest.fn(),
        findAll: jest.fn()
    },
}));

jest.mock("../models/OrderMenuOption", () => ({
    OrderMenuOption: {
        create: jest.fn(),
    },
}));

jest.mock("../models/Menu", () => ({
    Menu: {
        findAll: jest.fn(),
        findByPk: jest.fn()
    }
}));

jest.mock("../models/PaketItem", () => ({
    PaketItem: {
        findAll: jest.fn(),
    }
}));

const mockOrderId = "order-1";
const mockOrderMenuId = "om-1";
const mockMenuId = "menu-1";
const mockVariantId = "variant-1";

describe("customer tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("TC-CU-001: Memilih Dine In", async () => {
        const req = {
            body: {
                order_type: "Dine-in",
                total_harga: 17000,
                items: [
                    {
                        menu_id: mockMenuId,
                        mv_id: mockVariantId,
                        quantity: 1,
                        harga_awal: 17000,
                        selectedOptions: []
                    }
                ]
            }
        } as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        const next = jest.fn() as NextFunction;

        (Order.findOne as jest.Mock)
            .mockResolvedValueOnce({
                order_no: 15
            })
            .mockResolvedValueOnce({
                order_id: mockOrderId,
                order_type: "Dine-in",
                total_harga: 17000
            });

        (Order.create as jest.Mock).mockResolvedValue({
            order_id: mockOrderId
        });

        (OrderMenu.create as jest.Mock).mockResolvedValue({
            om_id: mockOrderMenuId
        });

        await createOrder(req, res, next);

        expect(Order.create).toHaveBeenCalledWith(
            expect.objectContaining({
                order_type: "Dine-in",
                total_harga: 17000,
                order_no: 16,
                status: "Process"
            })
        );

        expect(OrderMenu.create).toHaveBeenCalledTimes(1);

        expect(OrderMenu.create).toHaveBeenCalledWith(
            expect.objectContaining({
                order_id: mockOrderId,
                menu_id: mockMenuId,
                mv_id: mockVariantId,
                quantity: 1,
                harga_awal: 17000
            })
        );

        expect(res.status).toHaveBeenCalledWith(201);

        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                success: true,
                message: "Data Order berhasil dibuat",
                data: expect.any(Object)
            })
        );

        expect(next).not.toHaveBeenCalled();
    });

    it("TC-CU-002: Memilih Take Away", async () => {
        const req = {
            body: {
                order_type: "Takeaway",
                total_harga: 17000,
                items: [
                    {
                        menu_id: mockMenuId,
                        mv_id: mockVariantId,
                        quantity: 1,
                        harga_awal: 17000,
                        selectedOptions: []
                    }
                ]
            }
        } as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        const next = jest.fn() as NextFunction;

        (Order.findOne as jest.Mock)
            .mockResolvedValueOnce({
                order_no: 15
            })
            .mockResolvedValueOnce({
                order_id: mockOrderId,
                order_type: "Takeaway",
                total_harga: 17000
            });

        (Order.create as jest.Mock).mockResolvedValue({
            order_id: mockOrderId
        });

        (OrderMenu.create as jest.Mock).mockResolvedValue({
            om_id: mockOrderMenuId
        });

        await createOrder(req, res, next);

        expect(Order.create).toHaveBeenCalledWith(
            expect.objectContaining({
                order_type: "Takeaway",
                total_harga: 17000,
                order_no: 16,
                status: "Process"
            })
        );

        expect(OrderMenu.create).toHaveBeenCalledTimes(1);

        expect(OrderMenu.create).toHaveBeenCalledWith(
            expect.objectContaining({
                order_id: mockOrderId,
                menu_id: mockMenuId,
                mv_id: mockVariantId,
                quantity: 1,
                harga_awal: 17000
            })
        );

        expect(res.status).toHaveBeenCalledWith(201);

        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                success: true,
                message: "Data Order berhasil dibuat",
                data: expect.any(Object)
            })
        );

        expect(next).not.toHaveBeenCalled();
    });

    it("TC-CU-003: Melihat Daftar Menu", async () => {
        const req = {} as Request;

        const res = {
            json: jest.fn()
        } as unknown as Response;

        const next = jest.fn() as NextFunction;

        const mockMenus = [
            {
                menu_id: "menu-1",
                nama_menu: "Nasi Goreng",
                harga_awal: 17000,
                foto: "nasi-goreng.jpg"
            },
            {
                menu_id: "menu-2",
                nama_menu: "Mie Ayam",
                harga_awal: 15000,
                foto: "mie-ayam.jpg"
            }
        ];

        (Menu.findAll as jest.Mock).mockResolvedValue(mockMenus);

        await getMenus(req, res, next);

        expect(Menu.findAll).toHaveBeenCalledTimes(1);

        expect(Menu.findAll).toHaveBeenCalledWith({
            include: [
                {
                    model: Category
                }
            ]
        });

        expect(res.json).toHaveBeenCalledWith({
            records: mockMenus
        });

        expect(next).not.toHaveBeenCalled();
    });

    it("TC-CU-004N: Backend gagal mengirim daftar menu", async () => {
        const req = {} as Request;

        const res = {
            json: jest.fn()
        } as unknown as Response;

        const next = jest.fn() as NextFunction;

        const mockError = new Error("Database Error");

        (Menu.findAll as jest.Mock)
            .mockRejectedValue(mockError);

        await getMenus(req, res, next);

        expect(Menu.findAll).toHaveBeenCalledTimes(1);

        expect(res.json).not.toHaveBeenCalled();

        expect(next).toHaveBeenCalledWith(mockError);
    });

    it("TC-CU-005: Melihat Detail Menu", async () => {
        const req = {
            params: {
                id: mockMenuId
            }
        } as unknown as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        const next = jest.fn() as NextFunction;

        const mockMenu = {
            menu_id: mockMenuId,
            nama: "Nasi Goreng",
            harga_awal: 17000,
            gambarUrl: "nasi-goreng.jpg"
        };

        (Menu.findByPk as jest.Mock)
            .mockResolvedValue(mockMenu);

        await getMenuById(req, res, next);

        expect(Menu.findByPk)
            .toHaveBeenCalledTimes(1);

        expect(Menu.findByPk)
            .toHaveBeenCalledWith(mockMenuId);

        expect(res.json)
            .toHaveBeenCalledWith(mockMenu);

        expect(next)
            .not.toHaveBeenCalled();
    });

    it("TC-CU-006: Memilih Paket yang Tersedia", async () => {
        const req = {
            params: {
                menu_id: mockMenuId
            }
        } as unknown as Request;

        const res = {
            json: jest.fn()
        } as unknown as Response;

        const next = jest.fn() as NextFunction;

        const mockPackages = [
            {
                paket_id: "paket-1",
                item_menu_id: mockMenuId,
                pakets: {
                    menu_id: "menu-2",
                    nama: "Es Teh"
                }
            },
            {
                paket_id: "paket-2",
                item_menu_id: mockMenuId,
                pakets: {
                    menu_id: "menu-3",
                    nama: "Kentang Goreng"
                }
            }
        ];

        (PaketItem.findAll as jest.Mock)
            .mockResolvedValue(mockPackages);

        await getPackageByMenuId(req, res, next);

        expect(PaketItem.findAll)
            .toHaveBeenCalledTimes(1);

        expect(PaketItem.findAll)
            .toHaveBeenCalledWith({
                where: {
                    item_menu_id: mockMenuId
                },
                include: [
                    {
                        model: Menu,
                        as: "pakets"
                    }
                ]
            });

        expect(res.json)
            .toHaveBeenCalledWith(mockPackages);

        expect(next)
            .not.toHaveBeenCalled();
    });

    it("TC-CU-011: Melihat Rekomendasi Menu", async () => {
        const req = {
            params: {
                menu_id: mockMenuId
            },
            query: {}
        } as unknown as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        const next = jest.fn() as NextFunction;

        (OrderMenu.findAll as jest.Mock)
            .mockResolvedValueOnce([
                {
                    order_id: "order-1"
                }
            ])
            .mockResolvedValueOnce([
                {
                    menu_id: "menu-2",
                    bought_together_count: 5
                }
            ]);

        await menuController.getRecommendation(
            req,
            res,
            next
        );

        expect(OrderMenu.findAll)
            .toHaveBeenCalledTimes(2);

        expect(res.status)
            .toHaveBeenCalledWith(200);

        expect(res.json)
            .toHaveBeenCalledWith(
                expect.any(Array)
            );

        expect(next)
            .not.toHaveBeenCalled();
    });

    it("TC-CU-014: Checkout Pesanan", async () => {
        const req = {
            body: {
                order_type: "Takeaway",
                total_harga: 17000,
                items: [
                    {
                        menu_id: mockMenuId,
                        mv_id: mockVariantId,
                        quantity: 1,
                        harga_awal: 17000,
                        selectedOptions: []
                    }
                ]
            }
        } as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        const next = jest.fn() as NextFunction;

        (Order.findOne as jest.Mock)
            .mockResolvedValueOnce({
                order_no: 15
            })
            .mockResolvedValueOnce({
                order_id: mockOrderId,
                order_type: "Takeaway",
                total_harga: 17000
            });

        (Order.create as jest.Mock).mockResolvedValue({
            order_id: mockOrderId
        });

        (OrderMenu.create as jest.Mock).mockResolvedValue({
            om_id: mockOrderMenuId
        });

        await createOrder(req, res, next);

        expect(Order.create).toHaveBeenCalledWith(
            expect.objectContaining({
                order_type: "Takeaway",
                total_harga: 17000,
                order_no: 16,
                status: "Process"
            })
        );

        expect(OrderMenu.create).toHaveBeenCalledTimes(1);

        expect(OrderMenu.create).toHaveBeenCalledWith(
            expect.objectContaining({
                order_id: mockOrderId,
                menu_id: mockMenuId,
                mv_id: mockVariantId,
                quantity: 1,
                harga_awal: 17000
            })
        );

        expect(res.status).toHaveBeenCalledWith(201);

        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                success: true,
                message: "Data Order berhasil dibuat",
                data: expect.any(Object)
            })
        );

        expect(next).not.toHaveBeenCalled();
    });


    it("TC-CU-015: Verifikasi Nomor Pesanan Otomatis", async () => {
        const req = {
            body: {
                order_type: "Dine-in",
                total_harga: 17000,
                items: [
                    {
                        menu_id: mockMenuId,
                        quantity: 1,
                        harga_awal: 17000,
                        selectedOptions: []
                    }
                ]
            }
        } as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        const next = jest.fn() as NextFunction;

        (Order.findOne as jest.Mock)
            .mockResolvedValueOnce({
                order_no: 25
            })
            .mockResolvedValueOnce({
                order_id: mockOrderId,
                order_no: 26
            });

        (Order.create as jest.Mock)
            .mockResolvedValue({
                order_id: mockOrderId
            });

        (OrderMenu.create as jest.Mock)
            .mockResolvedValue({
                om_id: mockOrderMenuId
            });

        await createOrder(req, res, next);

        expect(Order.create)
            .toHaveBeenCalledWith(
                expect.objectContaining({
                    order_no: 26
                })
            );

        expect(next)
            .not.toHaveBeenCalled();
    });




});