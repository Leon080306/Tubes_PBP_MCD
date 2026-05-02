import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { order_type } from "../type"
export type SessionState = {
    selectedCategory: string,
    orderType: order_type | null;
}

const initialState: SessionState = {
    selectedCategory: "All",
    orderType: null
}

export const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        setSelectedCategory: (state, action: PayloadAction<string>) => {
            state.selectedCategory = action.payload;
        },

        setOrderType: (state, action: PayloadAction<order_type>) => {
            state.orderType = action.payload;
        },

        resetSession: () => initialState,
    }
})

export const sessionActions = sessionSlice.actions;
export const sessionReducer = sessionSlice.reducer;