import { loginUser } from "../controller/userController";
import { Staff } from "../models/Staff";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";

describe("loginUser", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        process.env.JWT_SECRET = "test-secret";
    });

    it("should return 404 if user is not found", async () => {

        const req = {
            body: {
                email: "test@test.com",
                password: "123456"
            }
        } as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        const next = jest.fn();

        jest.spyOn(Staff, "findOne").mockResolvedValue(null);

        await loginUser(req, res, next);

        expect(res.status).toHaveBeenCalledWith(404);

        expect(res.json).toHaveBeenCalledWith({
            message: "User dengan email tersebut tidak ditemukan"
        });

    });

    it("should return 401 if password is incorrect", async () => {
        const req = {
            body: {
                email: "test@test.com",
                password: "wrongpassword"
            }
        } as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        const next = jest.fn();

        // mock user dari database
        const fakeUser = {
            email: "test@test.com",
            password: "hashedpassword"
        };

        jest.spyOn(Staff, "findOne").mockResolvedValue(fakeUser as any);

        // mock bcrypt.compare → return false (password salah)
        jest.spyOn(bcrypt, "compare").mockResolvedValue(false as never);

        await loginUser(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            message: "Password salah"
        });
    });
});