import { useCallback, useMemo, useState } from "react";
import type { FetchStatus, Menu } from "../type";

// Tipe response dari endpoint /menu/:menu_id/recommendations
export type RecommendationItem = {
    menu_id: string;
    bought_together_count: string;
    menus: Menu;
};

export function useGetRecommendations() {
    const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);
    const [state, setState] = useState<FetchStatus>("idle");

    const reload = useCallback(async (menu_id: string, limit: number = 5) => {
        setState("loading");
        try {
            const url = `http://localhost:3000/menu/${menu_id}/recommendations?limit=${limit}`;
            console.log("🔵 Fetching:", url);  // ✅ DEBUG

            const response = await fetch(url, {
                method: "GET",
                headers: { "content-type": "application/json" },
            });

            console.log("🔵 Status:", response.status);

            if (response.status !== 200) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data: RecommendationItem[] = await response.json();
            setRecommendations(Array.isArray(data) ? data : []);
            setState("success");
        } catch (error) {
            console.error("useGetRecommendations error:", error);
            setState("error");
        }
    }, []);

    return useMemo(() => {
        return { recommendations, state, reload };
    }, [recommendations, state, reload]);
}