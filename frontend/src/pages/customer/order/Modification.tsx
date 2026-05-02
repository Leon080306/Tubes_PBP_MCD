import { Box, Button, Checkbox, FormControlLabel, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useGetMenu } from "../../../hooks/useGetMenu";
import { useNavigate, useParams } from "react-router";
import FormatPrice from "../../../utils/FormatPrice";
import type { RootState } from "../../../redux/store";
import { cartActions } from "../../../store/cartSlice";
import type { MenuVarian, MenuOption } from "../../../type";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { FALLBACK_IMAGE } from "../../../constants";
type PackageSelectionProps = {
    onNext: (step: string) => void;
};

export default function Modification({ onNext }: PackageSelectionProps) {
    const { menu, reload } = useGetMenu();
    const { cartItemId } = useParams();
    const cartItems = useAppSelector((state: RootState) => state.cart.cartItems)
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const cartItem = cartItems.find(item => item.cartItemId === cartItemId);

    const [selectedVariant, setSelectedVariant] = useState<MenuVarian | null>(
        cartItem?.selectedVariant ?? null
    );
    const [selectedOptions, setSelectedOptions] = useState<MenuOption[]>(
        cartItem?.selectedOptions ?? []
    );

    // check if cart items exist
    useEffect(() => {
        if (!cartItemId || cartItem === undefined) {
            navigate("/menu");
        }
    }, [cartItemId, cartItem, navigate]);

    // reload menu item
    useEffect(() => {
        if (cartItemId) {
            reload(cartItemId);
        }
    }, [cartItemId, reload]);

    // set selectedVariant
    const handleVariantToggle = (varian: MenuVarian) => {
        const next = selectedVariant?.mv_id === varian.mv_id ? null : varian;
        setSelectedVariant(next);
        dispatch(cartActions.setSelectedVariant({
            cartItemId: cartItemId!,
            variant: next,
        }));
    };

    // set selectedOptions
    const handleOptionToggle = (option: MenuOption) => {
        const exists = selectedOptions.some(o => o.mo_id === option.mo_id);
        const next = exists
            ? selectedOptions.filter(o => o.mo_id !== option.mo_id)
            : [...selectedOptions, option];
        setSelectedOptions(next);
        dispatch(cartActions.setSelectedOptions({
            cartItemId: cartItemId!,
            options: next
        }));
    };

    // reset selectedVariant and selectedOptions
    const handleHapusPerubahan = () => {
        setSelectedVariant(null);
        setSelectedOptions([]);
        dispatch(cartActions.setSelectedVariant({ cartItemId: cartItemId!, variant: null }));
        dispatch(cartActions.setSelectedOptions({ cartItemId: cartItemId!, options: [] }));
    };

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            alignItems: "center",
            height: "100%",
            width: "100%"
        }}>
            <Typography component={"h1"} sx={{ fontSize: "48px", fontWeight: "bold" }}>
                Modifikasi
            </Typography>

            <Paper elevation={3} sx={{ width: "100%", padding: "12px" }}>
                <Box sx={{ display: "flex", gap: "4px", width: "100%", height: "80px", mb: "12px" }}>
                    <img
                        src={menu?.gambarUrl ? `/api/${menu?.gambarUrl}` : FALLBACK_IMAGE}
                        onError={(e) => {
                            const img = e.currentTarget as HTMLImageElement;
                            if (img.src !== FALLBACK_IMAGE) {
                                img.src = FALLBACK_IMAGE;
                            }
                        }}
                        alt=""
                        style={{ height: "100%", objectFit: "cover" }}
                    />
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
                        <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
                            {menu?.nama}
                        </Typography>
                        <Typography sx={{ fontWeight: "400", fontSize: "12px" }}>
                            {FormatPrice(menu?.harga_awal ?? 0)}
                        </Typography>
                    </Box>
                </Box>
                <Button
                    variant="outlined"
                    onClick={() => {
                        handleHapusPerubahan();
                    }}
                    sx={{ color: "black", border: "1px solid rgba(0,0,0,0.2)", flex: 1, borderRadius: "0px", textTransform: "none", width: "100%" }}
                >
                    Batalkan Perubahan
                </Button>
            </Paper>

            {menu?.mvs && menu.mvs.length > 0 && (
                <Paper elevation={3} sx={{ width: "100%", padding: "12px" }}>
                    <Typography sx={{ fontSize: "16px", fontWeight: "bold", mb: 1.5 }}>
                        Pilih Varian
                    </Typography>
                    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
                        {menu.mvs.map((varian: MenuVarian) => (
                            <FormControlLabel
                                key={varian.mv_id}
                                control={
                                    <Checkbox
                                        checked={selectedVariant?.mv_id === varian.mv_id}
                                        onChange={() => handleVariantToggle(varian)}
                                        sx={{
                                            color: "rgba(0,0,0,0.4)",
                                            "&.Mui-checked": { color: "#ffbc0d" },
                                            p: "4px",
                                        }}
                                    />
                                }
                                label={
                                    <Box>
                                        <Typography sx={{ fontSize: "14px" }}>{varian.nama_varian}</Typography>
                                        {varian.harga_tambahan > 0 && (
                                            <Typography sx={{ fontSize: "11px", color: "text.secondary" }}>
                                                +{FormatPrice(varian.harga_tambahan)}
                                            </Typography>
                                        )}
                                    </Box>
                                }
                                sx={{
                                    border: "1px solid",
                                    borderColor: selectedVariant?.mv_id === varian.mv_id ? "#ffbc0d" : "rgba(0,0,0,0.15)",
                                    borderRadius: "4px",
                                    margin: 0,
                                    padding: "6px 10px",
                                    alignItems: "center",
                                }}
                            />
                        ))}
                    </Box>
                </Paper>
            )}

            {menu?.mos && menu.mos.length > 0 && (
                <Paper elevation={3} sx={{ width: "100%", padding: "12px" }}>
                    <Typography sx={{ fontSize: "16px", fontWeight: "bold", mb: 1.5 }}>
                        Permintaan Khusus
                    </Typography>
                    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
                        {menu.mos.map((option: MenuOption) => (
                            <FormControlLabel
                                key={option.mo_id}
                                control={
                                    <Checkbox
                                        checked={selectedOptions.some(o => o.mo_id === option.mo_id)}
                                        onChange={() => handleOptionToggle(option)}
                                        sx={{
                                            color: "rgba(0,0,0,0.4)",
                                            "&.Mui-checked": { color: "#ffbc0d" },
                                            p: "4px",
                                        }}
                                    />
                                }
                                label={
                                    <Box>
                                        <Typography sx={{ fontSize: "14px" }}>{option.nama_option}</Typography>
                                        {option.tambahan_harga > 0 && (
                                            <Typography sx={{ fontSize: "11px", color: "text.secondary" }}>
                                                +{FormatPrice(option.tambahan_harga)}
                                            </Typography>
                                        )}
                                    </Box>
                                }
                                sx={{
                                    border: "1px solid",
                                    borderColor: selectedOptions.some(o => o.mo_id === option.mo_id) ? "#ffbc0d" : "rgba(0,0,0,0.15)",
                                    borderRadius: "4px",
                                    margin: 0,
                                    padding: "6px 10px",
                                    alignItems: "center",
                                }}
                            />
                        ))}
                    </Box>
                </Paper>
            )}

            <Paper elevation={3} sx={{ width: "100%", padding: "0", flex: 0.15, display: "flex" }}>
                <Button
                    variant="outlined"
                    onClick={() => {
                        handleHapusPerubahan();
                        onNext("quantity");
                    }}
                    sx={{ color: "black", border: "1px solid rgba(0,0,0,0.2)", flex: 1, borderRadius: "0px", textTransform: "none" }}
                >
                    Batalkan Perubahan
                </Button>
                <Button
                    variant="contained"
                    onClick={() => onNext("recommendation")}
                    disableElevation
                    sx={{ color: "black", backgroundColor: "#ffbc0d", border: "1px solid rgba(0,0,0,0.2)", flex: 1, borderRadius: "0px", textTransform: "none" }}
                >
                    Simpan Perubahan
                </Button>
            </Paper>
        </Box>
    );
}