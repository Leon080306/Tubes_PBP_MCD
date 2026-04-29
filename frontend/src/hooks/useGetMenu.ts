import { useCallback, useMemo, useState } from "react";
import type { FetchStatus, Menu } from "../type";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

export function useGetMenu() {
    const [menu, setMenu] = useState<Menu | null>(null);
    const [state, setState] = useState<FetchStatus>("idle");
    const cartItems = useSelector((state: RootState) => state.cart.cartItems)

    const reload = useCallback(async (cartItemId: string) => {
        setState("loading");
        try {
            const item = cartItems.find(item => item.cartItemId === cartItemId)
            if (!item) throw new Error("Cart Item not found");

            const menuId = item.menu.menu_id

            const response = await fetch(`http://localhost:3000/menu/${menuId}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                },
            });

            if (response.status !== 200) {
                throw new Error("Failed to fetch menu");
            }

            const data = await response.json();
            setMenu(data.record);
            setState("success");
        } catch {
            setState("error");
        }
    }, [cartItems]);

    return useMemo(() => {
        return { menu, state, reload };
    }, [menu, state, reload]);
}