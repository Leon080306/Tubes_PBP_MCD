import { Box, Button, Typography } from "@mui/material";
import NumberSpinner from './../../../components/NumberSpinner';
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { useGetMenu } from "../../../hooks/useGetMenu";
import FormatPrice from "../../../utils/FormatPrice";
import { cartActions } from "../../../store/cartSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { FALLBACK_IMAGE } from "../../../constants";

type PackageSelectionProps = {
    onNext: (step: string) => void;
};

export default function SetQuantity({ onNext }: PackageSelectionProps) {
    const navigate = useNavigate();
    const { menu, reload } = useGetMenu();
    const { cartItemId } = useParams();
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.cart.cartItems);
    const [hasOptions, setHasOptions] = useState(false);
    const [hasVariants, setHasVariants] = useState(false);

    const cartItem = cartItems.find(item => item.cartItemId === cartItemId)

    useEffect(() => {
        if (!cartItemId || cartItems.find(item => item.cartItemId === cartItemId) === undefined) {
            navigate("/menu");
        }
    }, [cartItemId, cartItems, navigate]);

    useEffect(() => {
        if (cartItemId) {
            reload(cartItemId);
        }
    }, [cartItemId]);

    useEffect(() => {
        setHasOptions((menu?.mos?.length ?? 0) > 0);
        setHasVariants((menu?.mvs?.length ?? 0) > 0);
    }, [menu]);

    return <Box sx={{
        padding: "24px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    }}>
        <Box sx={{
            border: "1px solid rgba(0,0,0,0.2)",
            width: "100%",
            height: "80%",
            borderRadius: "4px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
        }}>
            <Box></Box>

            <Box sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "8px"
            }}>
                <img
                    src={menu?.gambarUrl ? `/api/${menu?.gambarUrl}` : FALLBACK_IMAGE}
                    onError={(e) => {
                        const img = e.currentTarget as HTMLImageElement;
                        if (img.src !== FALLBACK_IMAGE) {
                            img.src = FALLBACK_IMAGE;
                        }
                    }}
                    alt=""
                    style={{
                        width: "50%",
                        objectFit: "cover"
                    }}
                />
                <Typography component={"h1"} sx={{
                    fontWeight: "bold",
                    fontSize: "20px"
                }}>{menu?.nama}</Typography>
                <Typography sx={{
                    fontSize: "14px"
                }}>{FormatPrice(menu?.harga_awal ?? 0)}</Typography>
            </Box>

            <Box sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
            }}>
                {(hasOptions || hasVariants) && (
                    <Button variant="outlined" onClick={() => onNext("modification")} sx={{
                        color: "black",
                        borderColor: "black",
                        height: "50px"
                    }}>Modifikasi</Button>
                )}

                <NumberSpinner
                    min={1}
                    max={100}
                    value={cartItem?.quantity ?? 1}
                    onValueChange={(value) => {
                        dispatch(cartActions.setQuantity({
                            cartItemId: cartItemId ?? "",
                            quantity: value ?? 1
                        }));
                    }}
                />
            </Box>

            <Box sx={{
                width: '100%',
                display: "flex"
            }}>
                <Button variant="outlined" onClick={() => {
                    dispatch(cartActions.removeFromCart(cartItemId ?? ""));
                    navigate("/menu")
                }} sx={{
                    color: "black",
                    border: "1px solid rgba(0,0,0,0.2)",
                    height: "50px",
                    flex: 1,
                    borderRadius: "0px",
                    textTransform: "none"
                }}>Batal</Button>

                <Button variant="contained" onClick={() => onNext("recommendation")} disableElevation sx={{
                    color: "black",
                    backgroundColor: "#ffbc0d",
                    border: "1px solid rgba(0,0,0,0.2)",
                    height: "50px",
                    flex: 1,
                    borderRadius: "0px",
                    textTransform: "none"
                }}>Tambah pada Pesanan</Button>
            </Box>
        </Box>
    </Box>
}