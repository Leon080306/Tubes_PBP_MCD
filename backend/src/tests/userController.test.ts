import { loginUser } from "../controller/userController";
import { Staff } from "../models/Staff";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    }),

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
            getDataValue: (field: string) => {
                if (field === "password") return "hashedpassword";
                if (field === "staff_id") return 1;
                if (field === "email") return "test@test.com";
                if (field === "role") return "admin";
                return null;
            }
        };

        jest.spyOn(Staff, "findOne").mockResolvedValue(fakeUser as any);

        // mock bcrypt.compare → return false (password salah)
        jest.spyOn(bcrypt, "compare").mockResolvedValue(false as never);

        await loginUser(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            message: "Password Salah"
        });
    });

    it("should login successfully and return JWT token", async () => {

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

        const fakeStaff = {
            getDataValue: jest.fn((field: string) => {
                switch (field) {
                    case "staff_id":
                        return "staff-123";
                    case "email":
                        return "test@test.com";
                    case "role":
                        return "Admin";
                    case "password":
                        return "hashed-password";
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

});