import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Menu, MenuOption, MenuVarian } from "../type";

export type CartItem = {
    cartItemId: string;
    menu: Menu;
    quantity: number;
    selectedVariant: MenuVarian | null;
    selectedOptions: MenuOption[];
    price: number;
}

export type CartState = {
    cartItems: CartItem[];
}

const initialState: CartState = {
    cartItems: []
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCartItems: (state, action: PayloadAction<CartItem[]>) => {
            state.cartItems = action.payload
        },

        addToCart: (state, action: PayloadAction<CartItem>) => {
            state.cartItems.push(action.payload)
        },

        removeFromCart: (state, action: PayloadAction<string>) => {
            state.cartItems = state.cartItems.filter(
                item => item.cartItemId !== action.payload
            )
        },

        setQuantity: (state, action: PayloadAction<{ cartItemId: string, quantity: number }>) => {
            const item = state.cartItems.find(
                item => item.cartItemId === action.payload.cartItemId
            )
            if (item) {
                item.quantity = action.payload.quantity
            }
        },

        increaseQuantity: (state, action: PayloadAction<string>) => {
            const item = state.cartItems.find(
                item => item.cartItemId === action.payload
            )
            if (item) {
                item.quantity += 1
            }
        },

        decreaseQuantity: (state, action: PayloadAction<string>) => {
            const item = state.cartItems.find(
                item => item.cartItemId === action.payload
            )
            if (item && item.quantity > 1) {
                item.quantity -= 1
            }
        },

        setSelectedVariant: (state, action: PayloadAction<{ cartItemId: string, variant: MenuVarian | null }>) => {
            const item = state.cartItems.find(
                item => item.cartItemId === action.payload.cartItemId
            )
            if (item) {
                item.selectedVariant = action.payload.variant
            }
        },

        setSelectedOptions: (state, action: PayloadAction<{ cartItemId: string, options: MenuOption[] }>) => {
            const item = state.cartItems.find(
                item => item.cartItemId === action.payload.cartItemId
            )
            if (item) {
                item.selectedOptions = action.payload.options
            }
        },

        clearCart: (state) => {
            state.cartItems = []
        }
    }
})

export const cartActions = cartSlice.actions;
export const cartReducer = cartSlice.reducer;