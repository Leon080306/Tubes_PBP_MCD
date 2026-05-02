/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Box,
    Typography,
    Button,
    Snackbar,
    Alert
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { cartActions } from "../../store/cartSlice";
import { useCreateOrder } from "../../hooks/useCreateOrder";

export default function CartCashier() {
    const items = useSelector((state: any) => state.cart.cartItems);
    const dispatch = useDispatch();

    const { createOrder } = useCreateOrder();

    const [orderNo, setOrderNo] = useState<number | null>(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const total = items.reduce(
        (sum: number, item: any) => sum + item.price * item.quantity, 0
    );

    const handleCheckout = async () => {
        const payload = {
            order_type: "Dine-in" as const,
            total_harga: total,
            items: items.map((item: any) => ({
                menu_id: item.menu.menu_id,
                mv_id: item.selectedVariants?.[0]?.mv_id || null,
                harga_awal: item.price,
                quantity: item.quantity,
                selectedOptions: item.selectedOptions.map((opt: any) => ({
                    mo_id: opt.mo_id
                }))
            }))
        };

        const result = await createOrder(payload);

        if (result) {
            dispatch(cartActions.clearCart());
            setOrderNo(result.order_no);
            setOpenSnackbar(true);
        }
    };

    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>

                <Box sx={{ flex: 1, overflow: "auto" }}>
                    {items.map((item: any) => (
                        <Box key={item.cartItemId} sx={{ mb: 2 }}>

                            <Typography sx={{ fontWeight: "bold" }}>
                                {item.menu.nama}
                            </Typography>

                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    mt: 1
                                }}
                            >
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        onClick={() =>
                                            dispatch(cartActions.decreaseQuantity(item.cartItemId))
                                        }
                                    >
                                        -
                                    </Button>

                                    <Typography sx={{ fontWeight: "bold" }}>
                                        {item.quantity}
                                    </Typography>

                                    <Button
                                        size="small"
                                        variant="outlined"
                                        onClick={() =>
                                            dispatch(cartActions.increaseQuantity(item.cartItemId))
                                        }
                                    >
                                        +
                                    </Button>
                                </Box>

                                <Typography sx={{ fontWeight: "bold" }}>
                                    Rp {(item.price * item.quantity).toLocaleString()}
                                </Typography>
                            </Box>

                        </Box>
                    ))}
                </Box>

                <Box sx={{ borderTop: "1px solid #eee", pt: 2 }}>
                    <Typography sx={{ fontWeight: "bold" }}>
                        Total: Rp {total.toLocaleString()}
                    </Typography>

                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleCheckout}
                        sx={{ mt: 2, background: "#ffbc0d", color: "#000" }}
                    >
                        Checkout
                    </Button>
                </Box>
            </Box>

            {/* buat popup diatas */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert severity="success" variant="filled">
                    Pesanan #{orderNo} berhasil masuk!
                </Alert>
            </Snackbar>
        </>
    );
}