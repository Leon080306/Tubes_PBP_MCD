import { Box, Button, Card, CardContent, CardMedia, CircularProgress, Typography } from "@mui/material";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router";
import FormatPrice from "../../../utils/FormatPrice";
import { cartActions } from "../../../store/cartSlice";
import type { Menu } from "../../../type";
import { useGetMenu } from "../../../hooks/useGetMenu";
import { useGetPakets } from "../../../hooks/useGetPakets";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { FALLBACK_IMAGE } from "../../../constants";

type PackageSelectionProps = {
    onNext: (step: string) => void;
};

export default function PackageList({ onNext }: PackageSelectionProps) {
    const { cartItemId } = useParams();
    const dispatch = useAppDispatch();

    const { menu, reload: reloadMenu } = useGetMenu();
    const { pakets, state: paketsState, reload: reloadPakets } = useGetPakets();

    // reload menu item
    useEffect(() => {
        if (cartItemId) {
            reloadMenu(cartItemId);
        }
    }, [cartItemId, reloadMenu]);

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

    // when paket is selected, remove original item from cart and replace with the paket menu selected
    const handleSelectPaket = (paketMenu: Menu) => {
        if (!cartItemId) return;

        dispatch(cartActions.removeFromCart(cartItemId));
        dispatch(cartActions.addToCart({
            cartItemId: cartItemId,
            menu: paketMenu,
            quantity: 1,
            selectedVariant: null,
            selectedOptions: [],
            price: paketMenu.harga_awal,
        }));

        onNext("quantity");
    };

    const handleBatal = () => {
        onNext("package");
    };

    const loading = paketsState === "idle" || paketsState === "loading";

    return (
        <Box sx={{
            minHeight: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            paddingY: "12px",
        }}>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                backgroundColor: "white",
                zIndex: 2,
                paddingY: "8px",
            }}>
                <img src="/src/assets/logo_mcd.png" alt="" style={{
                    width: "32px",
                    height: "32px"
                }} />
                <Typography sx={{
                    fontSize: "24px",
                    fontWeight: "bold"
                }}>
                    Pilih Paket
                </Typography>
            </Box>

            {menu?.nama && (
                <Typography sx={{
                    fontSize: "14px",
                    color: "text.secondary"
                }}>
                    Paket yang mengandung <strong>{menu.nama}</strong>
                </Typography>
            )}

            <Box sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                minHeight: "300px"
            }}>
                {loading ? (
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flex: 1
                    }}>
                        <CircularProgress sx={{ color: "#ffbc0d" }} />
                    </Box>
                ) : paketsState === "error" ? (
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flex: 1
                    }}>
                        <Typography sx={{ color: "error.main" }}>Gagal memuat paket</Typography>
                    </Box>
                ) : availablePakets.length === 0 ? (
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flex: 1
                    }}>
                        <Typography sx={{ color: "text.secondary" }}>
                            Tidak ada paket tersedia untuk menu ini
                        </Typography>
                    </Box>
                ) : (
                    <Box sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: "16px",
                    }}>
                        {availablePakets.map((item) => {
                            const paketMenu = item.pakets!;

                            return (
                                <Card
                                    key={item.pi_id}
                                    elevation={3}
                                    onClick={() => handleSelectPaket(paketMenu)}
                                    sx={{
                                        cursor: "pointer",
                                        border: "1px solid rgba(0,0,0,0.1)",
                                        "&:hover": { borderColor: "#ffbc0d", boxShadow: "0 0 0 2px #ffbc0d" },
                                        transition: "all 0.15s ease",
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={item.pakets?.gambarUrl ? `/api/${item.pakets?.gambarUrl}` : FALLBACK_IMAGE}
                                        onError={(e) => {
                                            const img = e.currentTarget as HTMLImageElement;
                                            if (img.src !== FALLBACK_IMAGE) {
                                                img.src = FALLBACK_IMAGE;
                                            }
                                        }}
                                        sx={{ objectFit: "cover" }}
                                    />
                                    <CardContent sx={{ p: "12px" }}>
                                        <Typography sx={{
                                            fontSize: "14px",
                                            fontWeight: "bold"
                                        }}>
                                            {paketMenu.nama}
                                        </Typography>
                                        <Typography sx={{
                                            fontSize: "13px",
                                            color: "#ffbc0d",
                                            fontWeight: "bold"
                                        }}>
                                            {FormatPrice(paketMenu.harga_awal ?? 0)}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </Box>
                )}
            </Box>

            <Box sx={{
                position: "sticky",
                bottom: 0,
                backgroundColor: "white",
                paddingY: "12px",
                zIndex: 2,
            }}>
                <Button
                    fullWidth
                    variant="outlined"
                    onClick={handleBatal}
                    sx={{
                        color: "black",
                        borderColor: "black",
                        textTransform: "none",
                    }}
                >
                    Batal
                </Button>
            </Box>
        </Box>
    );
}