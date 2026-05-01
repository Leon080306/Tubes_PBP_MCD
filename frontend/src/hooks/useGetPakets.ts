import { useCallback, useMemo, useState } from "react";
import type { FetchStatus, PaketItem } from "../type";

export function useGetPakets() {
    const [pakets, setPakets] = useState<PaketItem[]>([]);
    const [state, setState] = useState<FetchStatus>("idle");

    const reload = useCallback(async (menu_id: string) => {
        setState("loading");
        try {
            const response = await fetch(`/api/paket/${menu_id}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch pakets");
            }

            const data: PaketItem[] = await response.json();
            setPakets(Array.isArray(data) ? data : []);
            setState("success");
        } catch (error) {
            console.error("useGetPakets error:", error);
            setState("error");
        }
    }, []);

    return useMemo(() => ({ pakets, state, reload }), [pakets, state, reload]);
}