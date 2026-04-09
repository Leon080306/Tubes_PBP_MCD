import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
export type MenuState = {
    isLoading: boolean
}

const initialState: MenuState = {
    isLoading: false
}

export const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        }
    }
})

export const menuActions = menuSlice.actions;
export const menuReducer = menuSlice.reducer;