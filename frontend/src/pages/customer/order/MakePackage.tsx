import { Box, Button, CircularProgress, Paper, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { useGetMenu } from "../../../hooks/useGetMenu";
import { useEffect, useMemo } from "react";
import FormatPrice from "../../../utils/FormatPrice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../redux/store";
import { cartActions } from "../../../store/cartSlice";
import { useGetPakets } from "../../../hooks/useGetPakets";

type PackageSelectionProps = {
    onNext: (step: string) => void;
};

export default function MakePackage({ onNext }: PackageSelectionProps) {
    const { menu, reload } = useGetMenu();
    const { cartItemId } = useParams();
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { pakets, state: paketsState, reload: reloadPakets } = useGetPakets();

    // Load menu
    useEffect(() => {
        if (cartItemId) {
            reload(cartItemId);
        }
    }, [cartItemId, reload]);

    // Validate cart item exists
    useEffect(() => {
        if (!cartItemId || cartItems.find(item => item.cartItemId === cartItemId) === undefined) {
            navigate("/");
        }
    }, [cartItemId, cartItems, navigate]);

    // Load pakets that contain this menu
    useEffect(() => {
        if (menu?.menu_id) {
            reloadPakets(menu.menu_id);
        }
    }, [menu?.menu_id, reloadPakets]);

    // ✅ Filter paket yang available
    const availablePakets = useMemo(
        () => pakets.filter((item) => item.pakets && item.pakets.isAvailable !== false),
        [pakets]
    );

    // ✅ Auto skip ke "quantity" kalau tidak ada paket tersedia
    useEffect(() => {
        if (paketsState === "success" && availablePakets.length === 0) {
            onNext("quantity");
        }
    }, [paketsState, availablePakets.length, onNext]);

    const handleSelect = (type: string) => {
        if (type === "package") {
            onNext("package-list");
        } else {
            onNext("quantity");
        }
    };

    // ✅ Tampilkan loading saat masih cek paket atau loading menu
    const isCheckingPakets = paketsState === "idle" || paketsState === "loading";
    if (!menu || isCheckingPakets) {
        return (
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
            }}>
                <CircularProgress sx={{ color: "#ffbc0d" }} />
            </Box>
        );
    }

    // ✅ Kalau success tapi tidak ada paket, jangan render apapun (sedang transisi ke quantity)
    if (paketsState === "success" && availablePakets.length === 0) {
        return null;
    }

    return (
        <Box sx={{
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%"
        }}>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                gap: "24px",
            }}>
                <img src="/src/assets/logo_mcd.png" alt="" style={{
                    width: "32px",
                    height: "32px"
                }} />
                <Typography variant="h4" sx={{
                    fontSize: "14px",
                    fontWeight: "bold"
                }}>{menu?.nama}</Typography>
            </Box>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
            }}>
                <Typography variant="h1" sx={{
                    fontWeight: "bold",
                    fontSize: "32px"
                }}>
                    Mau tambah kentang atau minuman?
                </Typography>
                <Box sx={{
                    width: "100%",
                    display: "flex",
                    gap: "12px"
                }}>
                    <Paper
                        elevation={8}
                        sx={{
                            flex: 1,
                            height: "300px",
                            border: "1px solid gray",
                            cursor: "pointer",
                            overflow: "hidden",
                            paddingTop: "24px",
                            paddingInline: "12px",
                            boxSizing: "border-box"
                        }}
                        onClick={() => handleSelect("package")}
                    >
                        <img
                            src={menu?.gambarUrl}
                            alt=""
                            onError={(e) => {
                                e.currentTarget.src = "https://blocks.astratic.com/img/general-img-landscape.png";
                            }}
                            style={{
                                width: "100%",
                                objectFit: "cover"
                            }}
                        />
                        <Typography component={"h1"} sx={{
                            fontWeight: "bold",
                            fontSize: "20px"
                        }}>Iya, jadikan paket</Typography>
                    </Paper>

                    <Paper
                        elevation={8}
                        sx={{
                            flex: 1,
                            height: "300px",
                            border: "1px solid gray",
                            cursor: "pointer",
                            overflow: "hidden",
                            paddingTop: "24px",
                            paddingInline: "12px",
                            boxSizing: "border-box"
                        }}
                        onClick={() => handleSelect("a la carte")}
                    >
                        <img
                            src={menu?.gambarUrl ?? "https://blocks.astratic.com/img/general-img-landscape.png"}
                            alt=""
                            onError={(e) => {
                                e.currentTarget.src = "https://blocks.astratic.com/img/general-img-landscape.png";
                            }}
                            style={{
                                width: "100%",
                                objectFit: "cover"
                            }}
                        />
                        <Typography component={"h1"} sx={{
                            fontWeight: "bold",
                            fontSize: "20px"
                        }}>Tidak, satuan saja</Typography>
                        <Typography>{FormatPrice(menu?.harga_awal ?? 0)}</Typography>
                    </Paper>
                </Box>
                <Button variant="outlined" onClick={() => {
                    dispatch(cartActions.removeFromCart(cartItemId ?? ""));
                    navigate(-1);
                }} sx={{
                    color: "black",
                    borderColor: "black"
                }}>Batal</Button>
            </Box>
            <Box />
        </Box >
    );
}