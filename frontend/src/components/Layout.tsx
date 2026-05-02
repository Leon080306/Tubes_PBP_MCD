import { Box, Fab, Badge, Typography, IconButton, Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Outlet, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import FormatPrice from "../utils/FormatPrice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { cartActions } from "../store/cartSlice";
import { sessionActions } from "../store/sessionSlice";
import type { order_type } from "../type";

export default function Layout() {
    const cartItems = useAppSelector(state => state.cart.cartItems);
    const orderType = useAppSelector(state => state.session.orderType);
    const [cartOpen, setCartOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!orderType) navigate("/");
    }, [orderType])

    const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => {
        const optionsTotal = item.selectedOptions.reduce(
            (s, option) => s + option.tambahan_harga,
            0
        );
        const variantPrice = item.selectedVariant?.harga_tambahan ?? 0;
        return sum + (item.price + variantPrice + optionsTotal) * item.quantity;
    }, 0);

    const handleOrderTypeChange = (_: React.MouseEvent<HTMLElement>, newType: order_type | null) => {
        if (newType !== null) {
            dispatch(sessionActions.setOrderType(newType));
        }
    };

    return (
        <Box
            sx={{
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("/src/assets/background.JPG")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}
        >
            <Box sx={{
                position: "relative",
                width: "640px",
                height: "100vh",
                backgroundColor: "white",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
            }}>
                <Box sx={{
                    flex: 1,
                    width: "100%",
                    padding: "12px 24px",
                    paddingBottom: "100px",
                    overflow: "auto",
                    boxSizing: "border-box",
                    "&::-webkit-scrollbar": { display: "none" },
                    scrollbarWidth: "none",
                }}>
                    <Outlet />
                </Box>

                {orderType && (
                    <ToggleButtonGroup
                        value={orderType}
                        exclusive
                        onChange={handleOrderTypeChange}
                        size="small"
                        sx={{
                            position: "absolute",
                            bottom: "32px",
                            left: "24px",
                            zIndex: 1000,
                            backgroundColor: "white",
                            borderRadius: "999px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                            padding: "4px",
                            "& .MuiToggleButton-root": {
                                border: "none",
                                borderRadius: "999px !important",
                                textTransform: "none",
                                fontWeight: 600,
                                fontSize: "12px",
                                padding: "6px 12px",
                                color: "#666",
                                gap: "6px",
                                "&.Mui-selected": {
                                    backgroundColor: "#DA291C",
                                    color: "white",
                                    "&:hover": { backgroundColor: "#B71C1C" },
                                },
                            },
                        }}
                    >
                        <ToggleButton value="Dine-in">
                            <RestaurantIcon sx={{ fontSize: "16px" }} />
                            Dine-in
                        </ToggleButton>
                        <ToggleButton value="Takeaway">
                            <ShoppingBagIcon sx={{ fontSize: "16px" }} />
                            Takeaway
                        </ToggleButton>
                    </ToggleButtonGroup>
                )}

                {cartOpen && cartItems.length > 0 && (
                    <Box sx={{
                        position: "absolute",
                        bottom: "92px",
                        left: "24px",
                        right: "24px",
                        maxHeight: "60%",
                        backgroundColor: "white",
                        borderRadius: "16px",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                        border: "1px solid white",
                        display: "flex",
                        flexDirection: "column",
                        zIndex: 999,
                        overflow: "hidden",
                    }}>
                        <Box sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "14px 18px",
                            borderBottom: "1px solid #eee",
                        }}>
                            <Typography sx={{
                                fontWeight: "bold",
                                fontSize: "16px"
                            }}>
                                Your Order ({totalQty})
                            </Typography>
                            <IconButton onClick={() => setCartOpen(false)} size="small">
                                <CloseIcon />
                            </IconButton>
                        </Box>

                        <Box sx={{
                            flex: 1,
                            overflowY: "auto",
                            padding: "12px 18px"
                        }}>
                            {cartItems.map((item) => {
                                const totalOptionsPrice = item.selectedOptions?.reduce((sum, option) => sum + option.tambahan_harga, 0);
                                const variantPrice = item.selectedVariant?.harga_tambahan ?? 0;
                                const totalPrice = (item.price + totalOptionsPrice + variantPrice) * item.quantity;

                                return <Box
                                    key={item.cartItemId}
                                    sx={{
                                        marginBottom: "12px",
                                        paddingBottom: "12px",
                                        borderBottom: "1px solid #f0f0f0",
                                    }}
                                >
                                    <Box sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginBottom: "4px"
                                    }}>
                                        <Typography sx={{
                                            fontWeight: 600,
                                            fontSize: "14px"
                                        }}>
                                            {item.quantity}x {item.menu.nama}
                                        </Typography>
                                        <Typography sx={{
                                            fontWeight: 600,
                                            fontSize: "14px"
                                        }}>
                                            {FormatPrice(totalPrice)}
                                        </Typography>
                                    </Box>

                                    {item.selectedVariant && (
                                        <Typography sx={{
                                            fontSize: "12px",
                                            color: "#666"
                                        }}>
                                            {item.selectedVariant.nama_varian}
                                        </Typography>
                                    )}

                                    {item.selectedOptions.length > 0 && (
                                        <Typography sx={{
                                            fontSize: "12px",
                                            color: "#666"
                                        }}>
                                            + {item.selectedOptions.map(o => o.nama_option).join(", ")}
                                        </Typography>
                                    )}
                                </Box>
                            })}
                        </Box>

                        <Box sx={{
                            padding: "12px 18px",
                            borderTop: "1px solid #eee",
                            display: "flex",
                            width: "100%",
                            gap: "12px"
                        }}>
                            <Button
                                variant="contained"
                                onClick={() => dispatch(cartActions.clearCart())}
                                sx={{
                                    flex: 1,
                                    backgroundColor: "white",
                                    color: "#DA291C",
                                    fontWeight: 600,
                                    textTransform: "none",
                                    fontSize: "15px",
                                    padding: "10px",
                                    "&:hover": { backgroundColor: "#eee" },
                                }}
                            >
                                Clear Cart
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    setCartOpen(false);
                                    navigate("/cart");
                                }}
                                sx={{
                                    flex: 1,
                                    backgroundColor: "#DA291C",
                                    color: "white",
                                    fontWeight: 600,
                                    textTransform: "none",
                                    fontSize: "15px",
                                    padding: "10px",
                                    "&:hover": { backgroundColor: "#B71C1C" },
                                }}
                            >
                                Checkout
                            </Button>
                        </Box>
                    </Box>
                )}

                {cartItems.length > 0 && (
                    <Fab
                        variant="extended"
                        onClick={() => setCartOpen(prev => !prev)}
                        sx={{
                            position: "absolute",
                            bottom: "24px",
                            right: "24px",
                            zIndex: 1000,
                            backgroundColor: "#DA291C",
                            color: "yellow",
                            textTransform: "none",
                            fontWeight: 600,
                            fontSize: "15px",
                            paddingX: "20px",
                            minWidth: "240px",
                            height: "52px",
                            boxShadow: "0 4px 12px rgba(218, 41, 28, 0.4)",
                            "&:hover": {
                                backgroundColor: "#B71C1C",
                                boxShadow: "0 6px 16px rgba(218, 41, 28, 0.5)",
                            },
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "12px",
                        }}
                    >
                        <Box sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px"
                        }}>
                            <Badge
                                badgeContent={totalQty}
                                sx={{
                                    "& .MuiBadge-badge": {
                                        backgroundColor: "#FFC72C",
                                        color: "#000",
                                        fontWeight: "bold",
                                    }
                                }}
                            >
                                <ShoppingCartIcon />
                            </Badge>
                            <span>{cartOpen ? "Hide Cart" : "View Cart"}</span>
                        </Box>
                        <span>Rp {totalPrice.toLocaleString("id-ID")}</span>
                    </Fab>
                )}
            </Box>
        </Box>
    );
}