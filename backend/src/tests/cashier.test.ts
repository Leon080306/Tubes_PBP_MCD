import { loginUser } from "../controller/userController";
import { createOrder, updateOrder } from "../controller/orderController";
import { Order } from "../models/Order";
import { OrderMenu } from "../models/OrderMenu";
import { OrderMenuOption } from "../models/OrderMenuOption";
import { Staff } from "../models/Staff";
import { authMiddleware } from "../middlewares/authMiddleware";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createMockResponse = () =>
    ({
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    }) as unknown as Response;

const fakeCashier = {
    getDataValue: jest.fn((field: string) => {
        switch (field) {
            case "staff_id":
                return "staff-001";
            case "email":
                return "cashier@test.com";
            case "role":
                return "Cashier";
            case "password":
                return "hashed-password";
            default:
                return null;
        }
    })
};

describe("Cashier Role", () => {

    beforeEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
        process.env.JWT_SECRET = "test-secret";
    });

    describe("TC-CA-001 Login berhasil", () => {

        it("should login successfully with valid cashier account", async () => {

            const req = {
                body: {
                    email: "cashier@test.com",
                    password: "123456"
                }
            } as Request;

            const res = createMockResponse();

            const next = jest.fn();

            jest.spyOn(Staff, "findOne")
                .mockResolvedValue(fakeCashier as any);

            jest.spyOn(bcrypt, "compare")
                .mockResolvedValue(true as never);

            jest.spyOn(jwt, "sign")
                .mockReturnValue("fake-jwt-token" as any);

            await loginUser(req, res, next);

            expect(Staff.findOne).toHaveBeenCalledWith({
                where: {
                    email: "cashier@test.com"
                }
            });

            expect(bcrypt.compare).toHaveBeenCalledWith(
                "123456",
                "hashed-password"
            );

            expect(jwt.sign).toHaveBeenCalledWith(
                {
                    id: "staff-001",
                    email: "cashier@test.com",
                    role: "Cashier"
                },
                "test-secret",
                {
                    expiresIn: "1d"
                }
            );

            expect(res.json).toHaveBeenCalledWith({
                message: "Login success",
                token: "fake-jwt-token"
            });

        });

    });

    describe("TC-CA-002 Login gagal", () => {

        it("should reject login when cashier enters wrong password", async () => {

            const req = {
                body: {
                    email: "cashier@test.com",
                    password: "wrongpassword"
                }
            } as Request;

            const res = createMockResponse();

            const next = jest.fn();

            jest.spyOn(Staff, "findOne")
                .mockResolvedValue(fakeCashier as any);

            jest.spyOn(bcrypt, "compare")
                .mockResolvedValue(false as never);

            const jwtSpy = jest.spyOn(jwt, "sign");

            await loginUser(req, res, next);

            expect(Staff.findOne).toHaveBeenCalledWith({
                where: {
                    email: "cashier@test.com"
                }
            });

            expect(bcrypt.compare).toHaveBeenCalledWith(
                "wrongpassword",
                "hashed-password"
            );

            expect(jwtSpy).not.toHaveBeenCalled();

            expect(res.status).toHaveBeenCalledWith(401);

            expect(res.json).toHaveBeenCalledWith({
                message: "Password Salah"
            });

        });

    });

    describe("TC-CA-003 Membuat pesanan", () => {

        it("should create order successfully", async () => {

            const req = {
                body: {
                    total_harga: 50000,
                    order_type: "Dine-in",
                    items: [
                        {
                            menu_id: "menu-001",
                            mv_id: null,
                            harga_awal: 50000,
                            quantity: 1,
                            selectedOptions: []
                        }
                    ]
                }
            } as Request;

            const res = createMockResponse();

            const next = jest.fn();

            jest.spyOn(Order, "findOne")
                .mockResolvedValueOnce({
                    order_no: 10
                } as any)
                .mockResolvedValueOnce({
                    order_id: "order-001"
                } as any);

            jest.spyOn(Order, "create")
                .mockResolvedValue({
                    order_id: "order-001"
                } as any);

            jest.spyOn(OrderMenu, "create")
                .mockResolvedValue({
                    om_id: "om-001"
                } as any);

            const optionSpy = jest.spyOn(OrderMenuOption, "create");

            await createOrder(req, res, next);

            expect(Order.create).toHaveBeenCalledWith({
                waktu_pesanan: expect.any(Date),
                total_harga: 50000,
                order_type: "Dine-in",
                order_no: 11,
                status: "Process"
            });

            expect(OrderMenu.create).toHaveBeenCalledWith({
                order_id: "order-001",
                menu_id: "menu-001",
                mv_id: null,
                harga_awal: 50000,
                quantity: 1
            });

            expect(optionSpy).not.toHaveBeenCalled();

            expect(res.status).toHaveBeenCalledWith(201);

            expect(res.json).toHaveBeenCalledWith({
                success: true,
                message: "Data Order berhasil dibuat",
                data: {
                    order_id: "order-001"
                }
            });

        });

    });

    describe("TC-CA-004 Quantity 0", () => {

        it("should reject order when quantity is zero", async () => {

            const req = {
                body: {
                    total_harga: 50000,
                    order_type: "Dine-in",
                    items: [
                        {
                            menu_id: "menu-001",
                            harga_awal: 50000,
                            quantity: 0,
                            selectedOptions: []
                        }
                    ]
                }
            } as Request;

            const res = createMockResponse();

            const next = jest.fn();

            const orderSpy = jest.spyOn(Order, "create");
            const orderMenuSpy = jest.spyOn(OrderMenu, "create");

            await createOrder(req, res, next);

            expect(orderSpy).not.toHaveBeenCalled();

            expect(orderMenuSpy).not.toHaveBeenCalled();

            expect(res.status).toHaveBeenCalledWith(400);

            expect(res.json).toHaveBeenCalledWith({
                status: "Fail",
                message: "Item ke-1: quantity tidak valid"
            });

        });

    });

    describe("TC-CA-005 Memilih Varian Menu", () => {

        it("should create order with selected menu options", async () => {

            const req = {
                body: {
                    total_harga: 65000,
                    order_type: "Dine-in",
                    items: [
                        {
                            menu_id: "menu-001",
                            mv_id: "variant-001",
                            harga_awal: 65000,
                            quantity: 1,
                            selectedOptions: [
                                {
                                    mo_id: "option-001"
                                },
                                {
                                    mo_id: "option-002"
                                }
                            ]
                        }
                    ]
                }
            } as Request;

            const res = createMockResponse();

            const next = jest.fn();

            jest.spyOn(Order, "findOne")
                .mockResolvedValueOnce({
                    order_no: 20
                } as any)
                .mockResolvedValueOnce({
                    order_id: "order-002"
                } as any);

            jest.spyOn(Order, "create")
                .mockResolvedValue({
                    order_id: "order-002"
                } as any);

            jest.spyOn(OrderMenu, "create")
                .mockResolvedValue({
                    om_id: "om-002"
                } as any);

            const optionSpy = jest.spyOn(OrderMenuOption, "create")
                .mockResolvedValue({} as any);

            await createOrder(req, res, next);

            expect(OrderMenu.create).toHaveBeenCalledWith({
                order_id: "order-002",
                menu_id: "menu-001",
                mv_id: "variant-001",
                harga_awal: 65000,
                quantity: 1
            });

            expect(optionSpy).toHaveBeenCalledTimes(2);

            expect(optionSpy).toHaveBeenNthCalledWith(1, {
                om_id: "om-002",
                mo_id: "option-001"
            });

            expect(optionSpy).toHaveBeenNthCalledWith(2, {
                om_id: "om-002",
                mo_id: "option-002"
            });

            expect(res.status).toHaveBeenCalledWith(201);

        });

    });

    describe("TC-CA-006 Checkout", () => {

        it("should update order status to Paid", async () => {

            const req = {
                params: {
                    order_id: "order-001"
                },
                body: {
                    order_type: "Dine-in",
                    order_no: 11,
                    status: "Paid"
                }
            } as unknown as Request;

            const res = createMockResponse();

            const next = jest.fn();

            const updateMock = jest.fn();

            const fakeOrder = {
                order_id: "order-001",
                update: updateMock
            };

            jest.spyOn(Order, "findOne")
                .mockResolvedValue(fakeOrder as any);

            await updateOrder(req, res, next);

            expect(Order.findOne).toHaveBeenCalledWith({
                where: {
                    order_id: "order-001"
                }
            });

            expect(updateMock).toHaveBeenCalledWith({
                order_type: "Dine-in",
                order_no: 11,
                status: "Paid"
            });

            expect(res.json).toHaveBeenCalledWith({
                success: true,
                message: "Data Order berhasil di update",
                data: fakeOrder
            });

        });

    });

    describe("TC-CA-007 Checkout dengan cart kosong", () => {

        it("should reject order when cart is empty", async () => {

            const req = {
                body: {
                    total_harga: 0,
                    order_type: "Dine-in",
                    items: []
                }
            } as Request;

            const res = createMockResponse();

            const next = jest.fn();

            const findSpy = jest.spyOn(Order, "findOne");
            const createSpy = jest.spyOn(Order, "create");

            await createOrder(req, res, next);

            expect(findSpy).not.toHaveBeenCalled();

            expect(createSpy).not.toHaveBeenCalled();

            expect(res.status).toHaveBeenCalledWith(400);

            expect(res.json).toHaveBeenCalledWith({
                status: "Fail",
                message: "Items pesanan kosong"
            });

        });

    });
});

