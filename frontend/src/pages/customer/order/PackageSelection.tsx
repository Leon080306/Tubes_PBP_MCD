import { Box, Button, Paper, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { useGetMenu } from "../../../hooks/useGetMenu";
import { useEffect } from "react";
import FormatPrice from "../../../utils/FormatPrice";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";

type PackageSelectionProps = {
    onNext: (step: string) => void;
};

export default function PackageSelection({ onNext }: PackageSelectionProps) {
    const { menu, reload } = useGetMenu();
    const { cartItemId } = useParams();
    const cartItems = useSelector((state: RootState) => state.cart.cartItems)
    const navigate = useNavigate();

    useEffect(() => {
        if (!cartItemId || cartItems.find(item => item.cartItemId === cartItemId) === undefined) {
            navigate("/");
        }
    }, [cartItemId, cartItems, navigate]);

    useEffect(() => {
        if (cartItemId) {
            reload(cartItemId);
        }
    }, [cartItemId, reload]);

    const handleSelect = (type: string) => {
        if (type === "package") {
            onNext("package");
        } else {
            onNext("quantity");
        }
    };

    return <Box sx={{
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
                    <Typography sx={{

                    }}>{FormatPrice(menu?.harga_awal ?? 0)}</Typography>
                </Paper>
            </Box>
            <Button variant="outlined" onClick={() => navigate(-1)} sx={{
                color: "black",
                borderColor: "black"
            }}>Batal</Button>
        </Box>
        <Box />
    </Box>
}