import { configureStore } from "@reduxjs/toolkit";
import { menuReducer } from "../store/menuSlice";
import { authReducer } from "../store/authSlice";
import { cartReducer } from "../store/cartSlice";

export const store = configureStore({
        reducer: {
                auth: authReducer,
                menu: menuReducer,
                cart: cartReducer
        }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;