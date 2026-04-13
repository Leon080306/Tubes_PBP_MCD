export type UserInfo = {
    staff_id: string;
    password: string;
    role: string;
    email: string;
}

export type MenuItemType = {
    menu_id: string;
    nama: string;
    harga_awal: number;
    gambarUrl: string;
    kategori_menu: string;
};

export type OrderType = {
    order_id: string;
    order_no: number;
    waktu_pesanan: string;
    total_harga: number
    order_type: "Dine-in" | "Takeaway";
    status: "Cart" | "Paid" | "Process" | "Done" | "Canceled";
    createdAt?: string;
    deletedAt?: string;
    updatedAt?: string;
}

export type Post = {
    createdAt: string;
    deletedAt: string;
    id: string;
    updatedAt: string;
    content: string;
    status: string;
    title: string;
    user: {
        name: string;
    };
    userId: string;
}

export type AsyncDataState = 'pending' | 'loading' | 'fulfilled' | 'error';

export type CreatePostPayload = {
    title: string;
    content: string;
}

export type EditPostPayload = {
    title: string;
    postId?: string;
}