import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { cartActions } from "../../../store/cartSlice";
import type { RootState } from "../../../redux/store";
import FormatPrice from "../../../utils/FormatPrice";
import { useCreateOrder } from "../../../hooks/useCreateOrder"; // ✅ adjust path

const BASE_URL = import.meta.env.VITE_API_URL;

type PackageSelectionProps = {
    onNext: (step: string) => void;
};

export default function Cart({ onNext }: PackageSelectionProps) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);

    // ✅ Hook untuk create order
    const { state: createOrderState, createOrder } = useCreateOrder();
    const isSubmitting = createOrderState === "loading";

    const handleIncrement = (cartItemId: string) =>
        dispatch(cartActions.increaseQuantity(cartItemId));

    const handleDecrement = (cartItemId: string) =>
        dispatch(cartActions.decreaseQuantity(cartItemId));

    const handleRemove = (cartItemId: string) =>
        dispatch(cartActions.removeFromCart(cartItemId));

    const handleClearCart = () =>
        dispatch(cartActions.clearCart());

    // ✅ Handler untuk edit cart item
    const handleEdit = (cartItemId: string) => {
        navigate(`/order/${cartItemId}`);
        onNext("modification");
    };

    const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const total = subtotal;

    // ✅ Handler untuk Selesaikan Pesanan
    const handleCheckout = async () => {
        if (cartItems.length === 0) return;

        const payload = {
            order_type: "Dine-in" as const, // TODO: ambil dari step sebelumnya kalau ada pilihan
            total_harga: total,
            items: cartItems.map((item) => ({
                menu_id: item.menu.menu_id,
                mv_id: item.selectedVariants[0]?.mv_id,
                harga_awal: item.price,
                quantity: item.quantity,
                selectedOptions: item.selectedOptions.map((o) => ({ mo_id: o.mo_id })),
            })),
        };

        const result = await createOrder(payload);

        if (result) {
            // Simpan order_id untuk step selanjutnya (checkout/payment)
            sessionStorage.setItem("current_order_id", result.order_id);

            dispatch(cartActions.clearCart());
            onNext("checkout");
        }
    };

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "32px",
            height: "100%",
            width: "100%",
            padding: "24px"
        }}>
            {/* Header */}
            <Box sx={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "flex-end", gap: "12px" }}>
                    <img src="/src/assets/logo_mcd.png" alt="" style={{ width: "32px", height: "32px" }} />
                    <Typography variant="h4" sx={{ fontSize: "24px", fontWeight: "bold" }}>
                        Pesanan Anda
                    </Typography>
                </Box>
                <Button
                    variant="outlined"
                    onClick={handleClearCart}
                    disabled={cartItems.length === 0}
                    sx={{
                        color: "#d32f2f",
                        borderColor: "#d32f2f",
                        textTransform: "none",
                        fontSize: "13px",
                        "&:hover": { borderColor: "#b71c1c", backgroundColor: "rgba(211,47,47,0.04)" },
                        "&.Mui-disabled": { borderColor: "rgba(0,0,0,0.15)" }
                    }}
                >
                    Hapus Semua
                </Button>
            </Box>

            {/* Cart Items */}
            <Box sx={{
                flex: 1,
                overflow: "auto",
                "&::-webkit-scrollbar": { display: "none" },
                scrollbarWidth: "none",
            }}>
                {cartItems.length === 0 ? (
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                        <Typography sx={{ color: "text.secondary", fontSize: "14px" }}>
                            Belum ada pesanan
                        </Typography>
                    </Box>
                ) : (
                    cartItems.map((item, index) => (
                        <Box key={item.cartItemId}>
                            <Box sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                py: "12px",
                            }}>
                                {/* Hapus Button */}
                                <Button
                                    variant="outlined"
                                    size="small"
                                    onClick={() => handleRemove(item.cartItemId)}
                                    sx={{
                                        color: "black",
                                        borderColor: "rgba(0,0,0,0.3)",
                                        textTransform: "none",
                                        fontSize: "12px",
                                        minWidth: "56px",
                                        px: "8px",
                                        py: "4px",
                                        flexShrink: 0,
                                    }}
                                >
                                    Hapus
                                </Button>

                                {/* ✅ Edit Button */}
                                <Button
                                    variant="outlined"
                                    size="small"
                                    onClick={() => handleEdit(item.cartItemId)}
                                    startIcon={<EditIcon sx={{ fontSize: "14px !important" }} />}
                                    sx={{
                                        color: "#ffbc0d",
                                        borderColor: "#ffbc0d",
                                        textTransform: "none",
                                        fontSize: "12px",
                                        minWidth: "56px",
                                        px: "8px",
                                        py: "4px",
                                        flexShrink: 0,
                                        "&:hover": {
                                            borderColor: "#e6a800",
                                            backgroundColor: "rgba(255, 188, 13, 0.04)",
                                        },
                                        "& .MuiButton-startIcon": {
                                            marginRight: "4px",
                                        },
                                    }}
                                >
                                    Edit
                                </Button>

                                {/* Image with red badge */}
                                <Box sx={{ position: "relative", flexShrink: 0 }}>
                                    <img
                                        src={`${BASE_URL}/uploads/${item.menu.gambarUrl}`}
                                        alt={item.menu.nama}
                                        onError={(e) => {
                                            e.currentTarget.src = "https://blocks.astratic.com/img/general-img-landscape.png";
                                        }}
                                        style={{ width: "56px", height: "56px", objectFit: "contain" }}
                                    />
                                    <Box sx={{
                                        position: "absolute",
                                        bottom: 0,
                                        left: 0,
                                        width: "18px",
                                        height: "18px",
                                        backgroundColor: "#d32f2f",
                                        borderRadius: "50%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}>
                                        <Typography sx={{ color: "white", fontSize: "10px", fontWeight: "bold" }}>
                                            {item.quantity}
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* Item Name + variant/options */}
                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                    <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
                                        {item.menu.nama}
                                    </Typography>
                                    {item.selectedVariants.length > 0 && (
                                        <Typography sx={{ fontSize: "11px", color: "text.secondary" }}>
                                            {item.selectedVariants.map(v => v.nama_varian).join(", ")}
                                        </Typography>
                                    )}
                                    {item.selectedOptions.length > 0 && (
                                        <Typography sx={{ fontSize: "11px", color: "text.secondary" }}>
                                            {item.selectedOptions.map(o => o.nama_option).join(", ")}
                                        </Typography>
                                    )}
                                </Box>

                                {/* Qty Stepper */}
                                <Box sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    border: "1px solid",
                                    borderColor: "divider",
                                    borderRadius: "4px",
                                    flexShrink: 0,
                                }}>
                                    <IconButton
                                        size="small"
                                        sx={{ borderRadius: 0, px: "8px" }}
                                        onClick={() => handleDecrement(item.cartItemId)}
                                    >
                                        <RemoveIcon sx={{ fontSize: "16px" }} />
                                    </IconButton>
                                    <Typography sx={{ fontSize: "16px", minWidth: "28px", textAlign: "center", userSelect: "none" }}>
                                        {item.quantity}
                                    </Typography>
                                    <IconButton
                                        size="small"
                                        sx={{ borderRadius: 0, px: "8px" }}
                                        onClick={() => handleIncrement(item.cartItemId)}
                                    >
                                        <AddIcon sx={{ fontSize: "16px" }} />
                                    </IconButton>
                                </Box>

                                {/* Price */}
                                <Typography sx={{ fontSize: "14px", fontWeight: "500", minWidth: "72px", textAlign: "right", flexShrink: 0 }}>
                                    {FormatPrice(item.price * item.quantity)}
                                </Typography>
                            </Box>

                            {index < cartItems.length - 1 && <Divider />}
                        </Box>
                    ))
                )}
            </Box>

            {/* Bottom: Totals + Buttons */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography sx={{ fontSize: "14px", color: "text.secondary" }}>Sub total</Typography>
                    <Typography sx={{ fontSize: "14px", color: "text.secondary" }}>
                        {FormatPrice(subtotal)}
                    </Typography>
                </Box>

                <Divider />

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography sx={{ fontSize: "22px", fontWeight: "bold" }}>Total</Typography>
                    <Typography sx={{ fontSize: "22px", fontWeight: "bold", color: "#ffbc0d" }}>
                        {FormatPrice(total)}
                    </Typography>
                </Box>

                {/* ✅ Error message */}
                {createOrderState === "error" && (
                    <Typography sx={{ color: "#d32f2f", fontSize: "13px", textAlign: "center" }}>
                        Gagal membuat pesanan. Silakan coba lagi.
                    </Typography>
                )}

                <Box sx={{ display: "flex", gap: "12px", mt: "8px" }}>
                    <Button
                        variant="outlined"
                        onClick={() => navigate("/")}
                        disabled={isSubmitting}
                        sx={{
                            flex: 1,
                            color: "black",
                            borderColor: "rgba(0,0,0,0.3)",
                            textTransform: "none",
                            fontSize: "16px",
                            fontWeight: "bold",
                            py: "14px",
                            borderRadius: "8px",
                            lineHeight: 1.3,
                        }}
                    >
                        Tambah Pesanan
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleCheckout}                                    // ✅ changed
                        disabled={cartItems.length === 0 || isSubmitting}           // ✅ changed
                        disableElevation
                        sx={{
                            flex: 2,
                            backgroundColor: "#ffbc0d",
                            color: "black",
                            textTransform: "none",
                            fontSize: "18px",
                            fontWeight: "bold",
                            py: "14px",
                            borderRadius: "8px",
                            "&:hover": { backgroundColor: "#e6a800" },
                            "&.Mui-disabled": { backgroundColor: "rgba(0,0,0,0.12)" }
                        }}
                    >
                        {isSubmitting ? "Memproses..." : "Selesaikan Pesanan"}     {/* ✅ */}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}