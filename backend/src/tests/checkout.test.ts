import { Request, Response, NextFunction } from "express";

jest.mock("../models/Order", () => ({
	Order: {
		findOne: jest.fn(),
		create: jest.fn(),
	},
}));

jest.mock("../models/OrderMenu", () => ({
	OrderMenu: {
		create: jest.fn(),
	},
}));

jest.mock("../models/OrderMenuOption", () => ({
	OrderMenuOption: {
		create: jest.fn(),
	},
}));

jest.mock("../models/Menu", () => ({
	Menu: {},
}));

jest.mock("../models/MenuVarian", () => ({
	MenuVarian: {},
}));

jest.mock("../models/MenuOption", () => ({
	MenuOption: {},
}));

const { createOrder, updateOrder } = require("../controller/orderController");
const { Order } = require("../models/Order");
const { OrderMenu } = require("../models/OrderMenu");
const { OrderMenuOption } = require("../models/OrderMenuOption");

type CartOption = {
	mo_id: string;
	nama_option: string;
	tambahan_harga: number;
};

type CartItem = {
	menu_id: string;
	nama: string;
	harga_awal: number;
	quantity: number;
	selectedOptions: CartOption[];
};

const TAX_RATE = 0.11;

const buildReceiptTotals = (items: CartItem[]) => {
	const subtotal = items.reduce((sum, item) => {
		const optionTotal = item.selectedOptions.reduce((optionSum, option) => optionSum + option.tambahan_harga, 0);
		return sum + ((item.harga_awal + optionTotal) * item.quantity);
	}, 0);

	const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
	const total = Math.round((subtotal + tax) * 100) / 100;

	return { subtotal, tax, total };
};

const createMockResponse = () => ({
	status: jest.fn().mockReturnThis(),
	json: jest.fn(),
} as unknown as Response);

describe("Sistem Checkout dan Cetak Struk", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("TC-CH-001: Checkout dan Cetak Struk Tagihan (Bill)", async () => {
		const cartItems: CartItem[] = [
			{
				menu_id: "menu-1",
				nama: "Big Mac",
				harga_awal: 40000,
				quantity: 2,
				selectedOptions: [
					{ mo_id: "opt-1", nama_option: "Extra Cheese", tambahan_harga: 5000 },
				],
			},
			{
				menu_id: "menu-2",
				nama: "French Fries",
				harga_awal: 18000,
				quantity: 1,
				selectedOptions: [],
			},
		];

		const receipt = buildReceiptTotals(cartItems);

		const req = {
			body: {
				order_type: "Dine-in",
				total_harga: receipt.total,
				items: cartItems.map((item) => ({
					menu_id: item.menu_id,
					mv_id: null,
					harga_awal: item.harga_awal,
					quantity: item.quantity,
					selectedOptions: item.selectedOptions.map((option) => ({ mo_id: option.mo_id })),
				})),
			},
		} as Request;

		const res = createMockResponse();
		const next = jest.fn() as NextFunction;

		const createdOrder = {
			order_id: "order-123",
			order_no: 13,
			order_type: "Dine-in",
			total_harga: receipt.total,
			status: "Process",
		};

		const orderMenus = [
			{ om_id: "om-1", order_id: createdOrder.order_id },
			{ om_id: "om-2", order_id: createdOrder.order_id },
		];

		jest.spyOn(Order, "findOne")
			.mockResolvedValueOnce({ order_no: 12 } as any)
			.mockResolvedValueOnce({
				...createdOrder,
				orderMenus,
			} as any);
		jest.spyOn(Order, "create").mockResolvedValue(createdOrder as any);
		jest.spyOn(OrderMenu, "create")
			.mockResolvedValueOnce(orderMenus[0] as any)
			.mockResolvedValueOnce(orderMenus[1] as any);
		jest.spyOn(OrderMenuOption, "create").mockResolvedValue({} as any);

		await createOrder(req, res, next);

		expect(Order.create).toHaveBeenCalledWith({
			waktu_pesanan: expect.any(Date),
			total_harga: receipt.total,
			order_type: "Dine-in",
			order_no: 13,
			status: "Process",
		});

		expect(OrderMenu.create).toHaveBeenNthCalledWith(1, {
			order_id: createdOrder.order_id,
			menu_id: "menu-1",
			mv_id: null,
			harga_awal: 40000,
			quantity: 2,
		});

		expect(OrderMenuOption.create).toHaveBeenCalledWith({
			om_id: "om-1",
			mo_id: "opt-1",
		});

		expect(res.status).toHaveBeenCalledWith(201);
		expect(res.json).toHaveBeenCalledWith({
			success: true,
			message: "Data Order berhasil dibuat",
			data: expect.objectContaining({
				order_id: "order-123",
				order_no: 13,
				total_harga: receipt.total,
				status: "Process",
			}),
		});
	});

	it("TC-CH-002: Validasi Kalkulasi Total Harga di Struk", async () => {
		const cartItems: CartItem[] = [
			{
				menu_id: "menu-10",
				nama: "Combo Meal",
				harga_awal: 37500.25,
				quantity: 2,
				selectedOptions: [
					{ mo_id: "opt-10", nama_option: "Large Drink", tambahan_harga: 2500.5 },
					{ mo_id: "opt-11", nama_option: "Extra Sauce", tambahan_harga: 1250.25 },
				],
			},
			{
				menu_id: "menu-11",
				nama: "Dessert",
				harga_awal: 14999.75,
				quantity: 1,
				selectedOptions: [],
			},
		];

		const receipt = buildReceiptTotals(cartItems);
		const manualSubtotal = ((37500.25 + 2500.5 + 1250.25) * 2) + 14999.75;
		const manualTax = Math.round(manualSubtotal * TAX_RATE * 100) / 100;
		const manualTotal = Math.round((manualSubtotal + manualTax) * 100) / 100;

		expect(receipt.subtotal).toBe(manualSubtotal);
		expect(receipt.tax).toBe(manualTax);
		expect(receipt.total).toBe(manualTotal);

		const req = {
			body: {
				order_type: "Takeaway",
				total_harga: receipt.total,
				items: cartItems.map((item) => ({
					menu_id: item.menu_id,
					mv_id: null,
					harga_awal: item.harga_awal,
					quantity: item.quantity,
					selectedOptions: item.selectedOptions.map((option) => ({ mo_id: option.mo_id })),
				})),
			},
		} as Request;

		const res = createMockResponse();
		const next = jest.fn() as NextFunction;

		jest.spyOn(Order, "findOne")
			.mockResolvedValueOnce(null as any)
			.mockResolvedValueOnce({
				order_id: "order-precision",
				order_no: 1,
				total_harga: receipt.total,
				order_type: "Takeaway",
				status: "Process",
			} as any);
		jest.spyOn(Order, "create").mockResolvedValue({
			order_id: "order-precision",
			order_no: 1,
			total_harga: receipt.total,
			order_type: "Takeaway",
			status: "Process",
		} as any);
		jest.spyOn(OrderMenu, "create")
			.mockResolvedValueOnce({ om_id: "om-10", order_id: "order-precision" } as any)
			.mockResolvedValueOnce({ om_id: "om-11", order_id: "order-precision" } as any);
		jest.spyOn(OrderMenuOption, "create").mockResolvedValue({} as any);

		await createOrder(req, res, next);

		expect(Order.create).toHaveBeenCalledWith(expect.objectContaining({
			total_harga: receipt.total,
			order_type: "Takeaway",
			status: "Process",
		}));

		expect(res.status).toHaveBeenCalledWith(201);
		expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
			success: true,
			message: "Data Order berhasil dibuat",
		}));
	});

	it("TC-CH-003N: Pembatalan Pesanan Sebelum Dibayar (Void)", async () => {
		const update = jest.fn().mockResolvedValue(undefined);
		const existingOrder = {
			order_id: "order-cancel-1",
			order_no: 15,
			status: "Process",
			update,
		};

		const req = {
			params: {
				order_id: "order-cancel-1",
			},
			body: {
				status: "Canceled",
			},
		} as unknown as Request;

		const res = createMockResponse();
		const next = jest.fn() as NextFunction;

		jest.spyOn(Order, "findOne").mockResolvedValue(existingOrder as any);

		await updateOrder(req, res, next);

		expect(Order.findOne).toHaveBeenCalledWith({
			where: { order_id: "order-cancel-1" },
		});

		expect(update).toHaveBeenCalledWith({
			order_type: undefined,
			order_no: undefined,
			status: "Canceled",
		});

		expect(res.json).toHaveBeenCalledWith({
			success: true,
			message: "Data Order berhasil di update",
			data: existingOrder,
		});

		const salesRows = [
			{ order_id: "order-active-1", status: "Process", total_harga: 50000 },
			{ order_id: "order-cancel-1", status: "Canceled", total_harga: 75000 },
		];

		const reportRows = salesRows.filter((row) => row.status !== "Canceled");

		expect(reportRows).toHaveLength(1);
		expect(reportRows[0]).toEqual({
			order_id: "order-active-1",
			status: "Process",
			total_harga: 50000,
		});
		expect(reportRows.some((row) => row.order_id === "order-cancel-1")).toBe(false);
	});
});
