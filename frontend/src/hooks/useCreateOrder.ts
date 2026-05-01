import { useCallback, useMemo, useState } from "react";
import type { FetchStatus } from "../type";

export type CreateOrderItemPayload = {
    menu_id: string;
    mv_id?: string;
    harga_awal: number;
    quantity: number;
    selectedOptions: { mo_id: string }[];
};

export type CreateOrderPayload = {
    order_type: "Dine-in" | "Takeaway";
    total_harga: number;
    items: CreateOrderItemPayload[];
};

export type CreatedOrder = {
    order_id: string;
    order_no: number;
    total_harga: number;
    order_type: "Dine-in" | "Takeaway";
    status: string;
};

export function useCreateOrder() {
    const [order, setOrder] = useState<CreatedOrder | null>(null);
    const [state, setState] = useState<FetchStatus>("idle");

    const createOrder = useCallback(async (payload: CreateOrderPayload) => {
        setState("loading");
        try {
            const response = await fetch(`/api/api/order`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("Failed to create order");
            }

            const result = await response.json();
            const data: CreatedOrder = result.data;

            setOrder(data);
            setState("success");
            return data;
        } catch (error) {
            console.error("useCreateOrder error:", error);
            setState("error");
            return null;
        }
    }, []);

    return useMemo(() => ({ order, state, createOrder }), [order, state, createOrder]);
}