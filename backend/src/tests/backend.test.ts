import request from "supertest";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import express from "express";
import cors from "cors";
import sequelize from "../../config/database";
import { Category } from "../models/Category";
import { Menu } from "../models/Menu";
import globalStaffApi from "../routes/GlobalStaffApi";
import menuRouter from "../routes/menuRoutes";
import pakeRouter from "../routes/PaketRoutes";
import { errorHandlerMiddleware } from "../middlewares/errorMiddleware";
import { loggerMiddleware } from "../middlewares/loggerMiddleware";

jest.mock("uuid", () => ({
	v4: () => "00000000-0000-0000-0000-000000000000",
}));

type TokenPayload = {
	id: string;
	email: string;
	role?: string;
};

describe("Pengujian API Backend - Authentikasi & RBAC", () => {
	const app = express();
	const jwtSecret = "integration-test-secret";

	let adminToken = "";
	let cashierToken = "";
	let customerToken = "";
	let expiredToken = "";

	const categoryPrefix = "it-category-backend-test";
	const menuPrefix = "it-menu-backend-test";

	const makeToken = (payload: TokenPayload, expiresIn: "1h" | "-1s") => {
		return jwt.sign(payload, jwtSecret, { expiresIn });
	};

	const createMenuFixture = async () => {
		const category = await Category.create({
			name: `${categoryPrefix}-${Date.now()}-${Math.random()}`,
			sort_order: 1,
		});

		const menu = await Menu.create({
			category_id: category.category_id,
			nama: `${menuPrefix}-${Date.now()}-${Math.random()}`,
			harga_awal: 25000,
			tipe_menu: "Ala Carte",
			gambarUrl: "uploads/menus/test-image.jpg",
			isAvailable: "true",
		});

		return { category, menu };
	};

	beforeAll(async () => {
		app.use(cors());
		app.use(express.json({ limit: "50mb" }));
		app.use(express.urlencoded({ limit: "50mb", extended: true }));
		app.use(loggerMiddleware);
		app.use("/", globalStaffApi);
		app.use("/menu", menuRouter);
		app.use("/paket", pakeRouter);
		app.use(errorHandlerMiddleware);

		process.env.JWT_SECRET = jwtSecret;

		await sequelize.authenticate();

		adminToken = makeToken(
			{
				id: "admin-staff-id",
				email: "admin@test.local",
				role: "Admin",
			},
			"1h"
		);

		cashierToken = makeToken(
			{
				id: "cashier-staff-id",
				email: "cashier@test.local",
				role: "Cashier",
			},
			"1h"
		);

		// Customer simulated as authenticated user without allowed staff role.
		customerToken = makeToken(
			{
				id: "customer-id",
				email: "customer@test.local",
			},
			"1h"
		);

		expiredToken = makeToken(
			{
				id: "expired-user-id",
				email: "expired@test.local",
				role: "Admin",
			},
			"-1s"
		);
	});

	afterAll(async () => {
		await Menu.destroy({
			where: { nama: { [Op.like]: `${menuPrefix}%` } },
			force: true,
		});

		await Category.destroy({
			where: { name: { [Op.like]: `${categoryPrefix}%` } },
			force: true,
		});

		await sequelize.close();
	});

	it("TC-API-001 (Positif) - Admin Hit API Hapus Menu", async () => {
		const { menu } = await createMenuFixture();

		const response = await request(app)
			.delete(`/admin/menu/${menu.menu_id}`)
			.set("Authorization", `Bearer ${adminToken}`);

		expect([200, 204]).toContain(response.status);

		if (response.status === 200) {
			expect(response.body).toEqual(
				expect.objectContaining({
					message: "Menu deleted",
				})
			);
		}

		const activeMenu = await Menu.findByPk(menu.menu_id);
		expect(activeMenu).toBeNull();

		const deletedMenu = await Menu.findByPk(menu.menu_id, { paranoid: false });
		expect(deletedMenu).not.toBeNull();
		expect(deletedMenu?.deletedAt).toBeTruthy();

		const menuListResponse = await request(app).get("/menu");
		expect(menuListResponse.status).toBe(200);
		expect(menuListResponse.body).toEqual(
			expect.objectContaining({
				success: true,
				records: expect.any(Array),
			})
		);

		const stillVisible = (menuListResponse.body.records as Array<{ menu_id: string }>).some(
			(item) => item.menu_id === menu.menu_id
		);
		expect(stillVisible).toBe(false);
	});

	it("TC-API-002 (Negatif) - Kasir Mencoba Hit API Hapus Menu", async () => {
		const { menu } = await createMenuFixture();

		const response = await request(app)
			.delete(`/admin/menu/${menu.menu_id}`)
			.set("Authorization", `Bearer ${cashierToken}`);

		expect(response.status).toBe(403);
		expect(response.body).toEqual(
			expect.objectContaining({
				message: expect.stringContaining("Forbidden"),
			})
		);

		const activeMenu = await Menu.findByPk(menu.menu_id);
		expect(activeMenu).not.toBeNull();

		const menuWithParanoidFalse = await Menu.findByPk(menu.menu_id, { paranoid: false });
		expect(menuWithParanoidFalse).not.toBeNull();
		expect(menuWithParanoidFalse?.deletedAt).toBeNull();
	});

	it("TC-API-003 (Negatif) - Customer Mencoba Melihat Daftar Seluruh User/Staff", async () => {
		const response = await request(app)
			.get("/staff")
			.set("Authorization", `Bearer ${customerToken}`);

		expect(response.status).toBe(403);
		expect(response.body).toEqual(
			expect.objectContaining({
				message: expect.stringContaining("Forbidden"),
			})
		);

		expect(Array.isArray(response.body)).toBe(false);
		expect(response.body.success).not.toBe(true);
	});

	it("TC-API-004 (Negatif) - Akses API Tanpa Token (Unauthenticated)", async () => {
		const response = await request(app).get("/user/me");

		expect(response.status).toBe(401);
		expect(response.body).toEqual(
			expect.objectContaining({
				message: "Unauthorized",
			})
		);
	});

	it("TC-API-005 (Negatif) - Akses API dengan Token Kadaluarsa (Expired Token)", async () => {
		const response = await request(app)
			.get("/user/me")
			.set("Authorization", `Bearer ${expiredToken}`);

		expect(response.status).toBe(401);
		expect(response.body).toEqual(
			expect.objectContaining({
				message: "Unauthorized",
			})
		);
	});
});
