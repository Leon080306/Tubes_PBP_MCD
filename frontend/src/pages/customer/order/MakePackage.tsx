import { Box, Button, Paper, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { useGetMenu } from "../../../hooks/useGetMenu";
import { useEffect, useMemo } from "react";
import FormatPrice from "../../../utils/FormatPrice";
import type { RootState } from "../../../redux/store";
import { cartActions } from "../../../store/cartSlice";
import { useGetPakets } from "../../../hooks/useGetPakets";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { FALLBACK_IMAGE } from "../../../constants";

type PackageSelectionProps = {
    onNext: (step: string) => void;
};

export default function MakePackage({ onNext }: PackageSelectionProps) {
    const { menu, reload } = useGetMenu();
    const { cartItemId } = useParams();
    const { pakets, state: paketsState, reload: reloadPakets } = useGetPakets();
    const cartItems = useAppSelector((state: RootState) => state.cart.cartItems);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // reload menu item
    useEffect(() => {
        if (cartItemId) {
            reload(cartItemId);
        }
    }, [cartItemId, reload]);

    // check if cart items exist
    useEffect(() => {
        if (!cartItemId || cartItems.find(item => item.cartItemId === cartItemId) === undefined) {
            navigate("/menu");
        }
    }, [cartItemId, cartItems, navigate]);

    // get pakets that contains this menu
    useEffect(() => {
        if (menu?.menu_id) {
            reloadPakets(menu.menu_id);
        }
    }, [menu?.menu_id, reloadPakets]);

    // filter isAvailable
    const availablePakets = useMemo(
        () => pakets.filter((item) => item.pakets && item.pakets.isAvailable !== false),
        [pakets]
    );

    // if there is no pakets with this menu, skip step to set quantity
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

    const isCheckingPakets = paketsState === "idle" || paketsState === "loading";
    if (!menu || isCheckingPakets) {
        return (
            <LoadingScreen />
        );
    }

    if (paketsState === "success" && availablePakets.length === 0) return <LoadingScreen />;

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
                            src={pakets[0].pakets?.gambarUrl ? `/api/${pakets[0].pakets?.gambarUrl}` : FALLBACK_IMAGE}
                            alt=""
                            onError={(e) => {
                                const img = e.currentTarget as HTMLImageElement;
                                if (img.src !== FALLBACK_IMAGE) {
                                    img.src = FALLBACK_IMAGE;
                                }
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
                            src={menu?.gambarUrl ? `/api/${menu?.gambarUrl}` : FALLBACK_IMAGE}
                            onError={(e) => {
                                const img = e.currentTarget as HTMLImageElement;
                                if (img.src !== FALLBACK_IMAGE) {
                                    img.src = FALLBACK_IMAGE;
                                }
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