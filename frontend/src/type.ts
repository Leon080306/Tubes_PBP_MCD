export type Category = {
    category_id: string;
    name: string;
    sort_order: number;
}

export type Menu = {
    menu_id: string;
    nama: string;
    harga_awal: number;
    category_id: string;
    category: Category;
    tipe_menu: 'Ala Carte' | 'Paket';
    gambarUrl: string;
    isAvailable?: boolean;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
    mvs?: MenuVarian[];
    mos?: MenuOption[];
    pakets?: PaketItem[];
    orderMenus?: OrderMenu[];
};

export type MenuVarian = {
    mv_id: string;
    menu_id: string;
    nama_varian: string;
    harga_tambahan: number;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
    menus?: Menu;
};

export type MenuOption = {
    mo_id: string;
    menu_id: string;
    nama_option: string;
    tambahan_harga: number;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
    menus?: Menu;
};

export type PaketItem = {
    pi_id: string;
    paket_id: string;
    item_menu_id: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
    pakets?: Menu;
    items?: Menu;
};

export type Order = {
    order_id: string;
    waktu_pesanan: string;
    total_harga: number;
    order_type: order_type;
    order_no: number;
    status: 'Cart' | 'Paid' | 'Process' | 'Done' | 'Canceled';
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
    orderMenus?: OrderMenu[];
    payments?: Payment;
};

export type order_type = 'Dine-in' | 'Takeaway';

export type OrderMenu = {
    om_id: string;
    order_id: string;
    menu_id: string;
    mv_id: string;
    mo_id: string;
    harga_awal: number;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
    menus?: Menu;
    mvs?: MenuVarian;
    mod?: MenuOption;
    orders?: Order;
};

export type Payment = {
    payment_id: string;
    metode_pembayaran: 'Cash' | 'Card' | 'Qris';
    status: 'Completed' | 'Canceled';
    paid_at: string;
    order_id: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
    order?: Order;
};

export type UserInfo = {
    staff_id: string,
    name: string,
    email: string,
    password: string,
    role: "Admin" | "Cashier",
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
};

export type PaketMenu = Menu;

export type FetchStatus = "idle" | "loading" | "success" | "error";