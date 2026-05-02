import { useCallback, useMemo, useState } from "react";
import type { FetchStatus, Menu } from "../type";

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
            const url = `/api/menu/${menu_id}/recommendations?limit=${limit}`;

            const response = await fetch(url, {
                method: "GET",
                headers: { "content-type": "application/json" },
            });

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