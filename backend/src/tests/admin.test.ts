import { getMenus, getMenuById, createMenu, updateMenu, deleteMenu } from "../controller/menuCRUDController";
import { getAllCategory, getCategoryById, createCategory, updateCategory, deleteCategory } from "../controller/categoryController";
import { getAllStaff, getStaffById, createStaff, updateStaff, deleteStaff } from "../controller/staffController";
import { Order } from "../models/Order";
import { getAllOrder, getTOrderById, updateOrder } from "../controller/orderController";
import { forgotPassword, loginUser } from "../controller/userController";
import { roleMiddleware } from "../middlewares/roleMiddleware";
import { Menu } from "../models/Menu";
import { MenuVarian } from "../models/MenuVarian";
import { MenuOption } from "../models/MenuOption";
import { Category } from "../models/Category";
import { Staff } from "../models/Staff";
import { Request, Response, NextFunction } from "express";
import * as mailer from "../utils/mailer";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Mock untuk UUID dan bcrypt
jest.mock("uuid", () => ({
    v4: jest.fn().mockReturnValue("mocked-uuid-1234")
}));

describe("Admin - Dashboard & Management", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        process.env.JWT_SECRET = "test-secret";

        // Tambahan agar fungsi bcrypt.hash di createStaff tidak error saat ditest
        jest.spyOn(bcrypt, "hash").mockImplementation(async () => "hashed-password");
    });


    // TC-AD-001 : login
    it("should login successfully and return JWT token", async () => {
        const req = {
            body: { email: "test@test.com", password: "123456" }
        } as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;
        const next = jest.fn();

        const fakeStaff = {
            getDataValue: jest.fn((field: string) => {
                switch (field) {
                    case "staff_id": return "staff-123";
                    case "email": return "test@test.com";
                    case "role": return "Admin";
                    case "password": return "hashed-password";
                }
            })
        };

        jest.spyOn(Staff, "findOne").mockResolvedValue(fakeStaff as any);
        jest.spyOn(bcrypt, "compare").mockImplementation(async () => true);
        jest.spyOn(jwt, "sign").mockReturnValue("fake-jwt-token" as any);

        await loginUser(req, res, next);

        expect(res.json).toHaveBeenCalledWith({
            message: "Login success",
            token: "fake-jwt-token"
        });
    });

    it("TC-AD-002: Forgot Password berhasil mengirim email", async () => {
        const req = {
            body: {
                email: "test@test.com"
            }
        } as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        const next = jest.fn();

        const mockStaff = {
            email: "test@test.com",
            name: "Leon",
            reset_token: null,
            reset_token_expiry: null,
            save: jest.fn().mockResolvedValue(true)
        };

        const mockSendMail = jest.fn().mockResolvedValue({
            messageId: "message-id"
        });

        jest
            .spyOn(Staff, "findOne")
            .mockResolvedValue(mockStaff as any);

        jest
            .spyOn(mailer, "createTransporter")
            .mockResolvedValue({
                transporter: {
                    sendMail: mockSendMail
                } as any,
                previewUser: "ethereal-user"
            });

        jest
            .spyOn(nodemailer, "getTestMessageUrl")
            .mockReturnValue("http://preview-url");

        await forgotPassword(req, res, next);

        expect(Staff.findOne).toHaveBeenCalledWith({
            where: {
                email: "test@test.com"
            }
        });

        expect(mockStaff.save).toHaveBeenCalled();

        expect(mockSendMail).toHaveBeenCalled();

        expect(res.json).toHaveBeenCalledWith({
            message: "If that email exists, a reset link has been sent.",
            previewUrl: "http://preview-url"
        });

        expect(next).not.toHaveBeenCalled();
    });

    it("TC-AD-003: should successfully add a new menu and return 201", async () => {
        const req = {
            body: {
                nama: "Nasi Goreng",
                harga_awal: 25000,
                tipe_menu: "Makanan",
                category_id: "cat-1",
                isAvailable: true,
                variants: "[]",
                options: "[]"
            }
        } as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;
        const next = jest.fn();

        const mockMenu = { menu_id: "menu-123", ...req.body };
        jest.spyOn(Menu, "create").mockResolvedValue(mockMenu as any);
        jest.spyOn(MenuVarian, "create").mockResolvedValue({} as any);
        jest.spyOn(MenuOption, "create").mockResolvedValue({} as any);

        await createMenu(req, res, next);

        expect(Menu.create).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: "Menu + variants + options berhasil dibuat",
            data: mockMenu
        });
    });

    it("TC-AD-003N: should call next(error) if create menu fails (e.g., invalid JSON variants)", async () => {
        const req = {
            body: {
                nama: "Nasi Goreng",
                variants: "invalid-json" // Sengaja dibikin error parsing JSON
            }
        } as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;
        const next = jest.fn();

        jest.spyOn(Menu, "create").mockResolvedValue({ menu_id: "1" } as any);

        await createMenu(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.any(SyntaxError));
    });

    it("TC-AD-004: should successfully update menu", async () => {
        const req = {
            params: { id: "menu-1" },
            body: { nama: "Nasi Goreng Spesial" }
        } as unknown as Request;
        const res = {
            json: jest.fn()
        } as unknown as Response;
        const next = jest.fn();

        const mockMenu = {
            menu_id: "menu-1",
            nama: "Nasi Goreng",
            update: jest.fn().mockResolvedValue(true)
        };
        jest.spyOn(Menu, "findByPk").mockResolvedValue(mockMenu as any);

        await updateMenu(req, res, next);

        expect(mockMenu.update).toHaveBeenCalledWith(expect.objectContaining({ nama: "Nasi Goreng Spesial" }));
        expect(res.json).toHaveBeenCalledWith({ success: true, data: mockMenu });
    });

    it("TC-AD-005: should delete menu successfully", async () => {
        const req = {
            params: { id: "menu-123" }
        } as unknown as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;
        const next = jest.fn();

        const mockMenu = {
            id: "menu-123",
            nama: "Nasi Goreng",
            destroy: jest.fn().mockResolvedValue(true)
        };

        jest.spyOn(Menu, "findByPk").mockResolvedValue(mockMenu as any);

        await deleteMenu(req, res, next);

        expect(mockMenu.destroy).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith({ message: "Menu deleted" });
    });



    it("TC-AD-006: should successfully add a new category", async () => {
        const req = {
            body: { name: "Minuman Dingin", sort_order: 1 }
        } as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;
        const next = jest.fn();

        jest.spyOn(Category, "findOne").mockResolvedValue(null);
        const mockNewCat = { category_id: "mocked-uuid", name: "Minuman Dingin", sort_order: 1 };
        jest.spyOn(Category, "create").mockResolvedValue(mockNewCat as any);

        await createCategory(req, res, next);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
    });

    it("-: should successfully get all categories", async () => {
        const req = {} as Request;
        const res = {
            json: jest.fn()
        } as unknown as Response;
        const next = jest.fn();

        const mockCategories = [{ category_id: "cat-1", name: "Makanan" }];
        jest.spyOn(Category, "findAll").mockResolvedValue(mockCategories as any);

        await getAllCategory(req, res, next);

        expect(res.json).toHaveBeenCalledWith(mockCategories);
    });

    it("TC-AD-007: should successfully update category", async () => {
        const req = {
            params: { category_id: "cat-1" },
            body: { name: "Makanan Berat", sort_order: 2 }
        } as unknown as Request;
        const res = {
            json: jest.fn()
        } as unknown as Response;
        const next = jest.fn();

        const mockCategory = {
            category_id: "cat-1",
            update: jest.fn().mockResolvedValue(true)
        };

        jest.spyOn(Category, "findOne")
            .mockResolvedValueOnce(mockCategory as any)
            .mockResolvedValueOnce(null);

        await updateCategory(req, res, next);

        expect(mockCategory.update).toHaveBeenCalledWith({ name: "Makanan Berat", sort_order: 2 });
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
    });

    it("TC-AD-008: should successfully delete category", async () => {
        const req = {
            params: { category_id: "cat-1" }
        } as unknown as Request;
        const res = {
            json: jest.fn()
        } as unknown as Response;
        const next = jest.fn();

        const mockCategory = {
            category_id: "cat-1",
            destroy: jest.fn().mockResolvedValue(true)
        };
        jest.spyOn(Category, "findOne").mockResolvedValue(mockCategory as any);

        await deleteCategory(req, res, next);

        expect(mockCategory.destroy).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: true, message: "Data Category berhasil di delete" }));
    });

    it("TC-AD-008N: should return 400 if sort_order is already used by another category", async () => {
        const req = {
            params: { category_id: "cat-1" },
            body: { name: "Makanan Berat", sort_order: 2 }
        } as unknown as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;
        const next = jest.fn();

        const mockCategory = { category_id: "cat-1", name: "Makanan" };
        const mockClashCategory = { category_id: "cat-2", name: "Snack" };

        jest.spyOn(Category, "findOne")
            .mockResolvedValueOnce(mockCategory as any)
            .mockResolvedValueOnce(mockClashCategory as any);

        await updateCategory(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            status: "Fail",
            message: 'Nomor Sort Order 2 sudah gunakan oleh "Snack"'
        });
    });

    it("TC-AD-009: add staff", async () => {
        const req = {
            body: {
                name: "Staff Baru",
                email: "staff@test.com",
                password: "password123",
                role: "Admin"
            }
        } as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;
        const next = jest.fn();

        jest.spyOn(Staff, "create").mockResolvedValue(req.body as any);

        await createStaff(req, res, next);

        expect(Staff.create).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                success: true,
                message: expect.any(String)
            })
        );
    });


    it("TC-AD-009N: should return 400 if staff data is incomplete", async () => {
        const req = {
            body: {
                name: "",
                email: "test@staff.com",
                password: "password123",
                role: "Cashier"
            }
        } as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;
        const next = jest.fn();

        const spyCreate = jest.spyOn(Staff, "create").mockResolvedValue({} as any);

        await createStaff(req, res, next);

        expect(spyCreate).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            status: "Fail",
            message: "Data tidak boleh kosong"
        });
    });

    it("TC-AD-010: should successfully update staff", async () => {
        const req = {
            params: { id: "staff-1" },
            body: { name: "Jennie Update", email: "jennie.update@test.com" }
        } as unknown as Request;
        const res = {
            json: jest.fn()
        } as unknown as Response;
        const next = jest.fn();

        const mockResult = { toJSON: jest.fn().mockReturnValue({ name: "Jennie Update" }) };
        const mockStaff = {
            staff_id: "staff-1",
            update: jest.fn().mockResolvedValue(mockResult)
        };
        jest.spyOn(Staff, "findOne").mockResolvedValue(mockStaff as any);

        await updateStaff(req, res, next);

        expect(mockStaff.update).toHaveBeenCalledWith({ name: "Jennie Update", email: "jennie.update@test.com" });
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: true, message: "Data Staff berhasil di update" }));
    });

    it("TC-AD-011: should successfully delete staff", async () => {
        const req = {
            params: { id: "staff-1" }
        } as unknown as Request;
        const res = {
            json: jest.fn()
        } as unknown as Response;
        const next = jest.fn();

        const mockStaff = {
            staff_id: "staff-1",
            destroy: jest.fn().mockResolvedValue(true)
        };
        jest.spyOn(Staff, "findOne").mockResolvedValue(mockStaff as any);

        await deleteStaff(req, res, next);

        expect(mockStaff.destroy).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
    });

    it("TC-AD-012: should return 403 Forbidden if Cashier accesses Admin route", async () => {
        const req = {
            user: { role: "Cashier" }
        } as unknown as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;
        const next = jest.fn();

        const requireAdmin = roleMiddleware("Admin");
        await requireAdmin(req, res, next);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({
            message: "Forbidden: requires one of [Admin]"
        });
        expect(next).not.toHaveBeenCalled();
    });


    it("TC-AD-013: melihat daftar order", async () => {
        const req = {} as Request;
        const res = {
            json: jest.fn()
        } as unknown as Response;
        const next = jest.fn();

        const mockOrders = [
            { order_id: "ord-1", order_no: 1, total_harga: 100000, status: "Process" }
        ];

        jest.spyOn(Order, "findAll").mockResolvedValue(mockOrders as any);

        await getAllOrder(req, res, next);

        expect(Order.findAll).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(mockOrders);
    });

    it("TC-AD-014: melihat detail order", async () => {
        const req = {
            params: { order_id: "ord-1" }
        } as unknown as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;
        const next = jest.fn();

        const mockOrder = { order_id: "ord-1", order_no: 1, total_harga: 100000 };
        jest.spyOn(Order, "findOne").mockResolvedValue(mockOrder as any);

        await getTOrderById(req, res, next);

        expect(Order.findOne).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: "Success",
            data: mockOrder
        });
    });

    it("TC-AD-015: update status order", async () => {
        const req = {
            params: { order_id: "ord-1" },
            body: {
                status: "Done",
                order_type: "Dine-in",
                order_no: 1
            }
        } as unknown as Request;
        const res = {
            json: jest.fn()
        } as unknown as Response;
        const next = jest.fn();

        const mockOrder = {
            order_id: "ord-1",
            status: "Process",
            update: jest.fn().mockResolvedValue(true)
        };

        jest.spyOn(Order, "findOne").mockResolvedValue(mockOrder as any);

        await updateOrder(req, res, next);

        expect(mockOrder.update).toHaveBeenCalledWith({
            order_type: "Dine-in",
            order_no: 1,
            status: "Done"
        });

        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: "Data Order berhasil di update",
            data: mockOrder
        });
    });
});