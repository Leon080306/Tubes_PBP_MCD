import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useNavigate } from "react-router";

type CartItem = {
    id: number;
    name: string;
    price: number;
    qty: number;
    image: string;
};

type PackageSelectionProps = {
    onNext: (step: string) => void;
};

export default function Cart({ onNext }: PackageSelectionProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>([
        {
            id: 1,
            name: "Small Ice Cream Cone",
            price: 11000,
            qty: 2,
            image: "/public/camilan/chicken snack wrap.webp",
        },
    ]);

    const navigate = useNavigate();

    const handleIncrement = (id: number) =>
        setCartItems(prev => prev.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i));

    const handleDecrement = (id: number) =>
        setCartItems(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(0, i.qty - 1) } : i));

    const handleRemove = (id: number) =>
        setCartItems(prev => prev.filter(i => i.id !== id));

    const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
    const total = subtotal;

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
            <Box sx={{ display: "flex", alignItems: "flex-end", gap: "12px" }}>
                <img src="/src/assets/logo_mcd.png" alt="" style={{ width: "32px", height: "32px" }} />
                <Typography variant="h4" sx={{ fontSize: "24px", fontWeight: "bold" }}>
                    Pesanan Anda
                </Typography>
            </Box>

            {/* ✅ Cart Items */}
            <Box sx={{
                flex: 1,
                overflow: "auto",
                "&::-webkit-scrollbar": { display: "none" },
                scrollbarWidth: "none",
            }}>
                {cartItems.map((item, index) => (
                    <Box key={item.id}>
                        <Box sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            py: "12px",
                        }}>
                            {/* Hapus Button */}
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={() => handleRemove(item.id)}
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

                            {/* Image with red badge */}
                            <Box sx={{ position: "relative", flexShrink: 0 }}>
                                <img
                                    src={item.image}
                                    alt={item.name}
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
                                        {item.qty}
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Item Name */}
                            <Typography sx={{ fontSize: "14px", fontWeight: "bold", flex: 1 }}>
                                {item.name}
                            </Typography>

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
                                    onClick={() => handleDecrement(item.id)}
                                >
                                    <RemoveIcon sx={{ fontSize: "16px" }} />
                                </IconButton>
                                <Typography sx={{ fontSize: "16px", minWidth: "28px", textAlign: "center", userSelect: "none" }}>
                                    {item.qty}
                                </Typography>
                                <IconButton
                                    size="small"
                                    sx={{ borderRadius: 0, px: "8px" }}
                                    onClick={() => handleIncrement(item.id)}
                                >
                                    <AddIcon sx={{ fontSize: "16px" }} />
                                </IconButton>
                            </Box>

                            {/* Price */}
                            <Typography sx={{ fontSize: "14px", fontWeight: "500", minWidth: "72px", textAlign: "right", flexShrink: 0 }}>
                                Rp{(item.price * item.qty).toLocaleString("de-DE")}
                            </Typography>
                        </Box>

                        {index < cartItems.length - 1 && <Divider />}
                    </Box>
                ))}
            </Box>

            {/* Bottom: Totals + Buttons */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography sx={{ fontSize: "14px", color: "text.secondary" }}>Sub total</Typography>
                    <Typography sx={{ fontSize: "14px", color: "text.secondary" }}>
                        Rp{subtotal.toLocaleString("de-DE")}
                    </Typography>
                </Box>

                <Divider />

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography sx={{ fontSize: "22px", fontWeight: "bold" }}>Total</Typography>
                    <Typography sx={{ fontSize: "22px", fontWeight: "bold", color: "#ffbc0d" }}>
                        Rp{total.toLocaleString("de-DE")}
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: "12px", mt: "8px" }}>
                    <Button
                        variant="outlined"
                        onClick={() => navigate("/")}
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
                        onClick={() => onNext("checkout")}
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
                        }}
                    >
                        Selesaikan Pesanan
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}