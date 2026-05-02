import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { useGetMenu } from "../../../hooks/useGetMenu";
import { cartActions } from "../../../store/cartSlice";
import { useGetRecommendations } from "../../../hooks/useGetRecommendation";
import type { Menu } from "../../../type";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { FALLBACK_IMAGE } from "../../../constants";

type PackageSelectionProps = {
    onNext: (step: string) => void;
};

export default function Recomendation({ onNext }: PackageSelectionProps) {
    const { cartItemId } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { menu, reload: reloadMenu } = useGetMenu();
    const { recommendations, state: recState, reload: reloadRecommendations } = useGetRecommendations();

    // reload menu
    useEffect(() => {
        if (cartItemId) {
            reloadMenu(cartItemId);
        }
    }, [cartItemId, reloadMenu]);

    // reload recommendations
    useEffect(() => {
        if (menu?.menu_id) {
            reloadRecommendations(menu.menu_id, 5);
        }
    }, [menu?.menu_id, reloadRecommendations]);

    // redirect to cart if there is no recommendation
    useEffect(() => {
        if (recState === "success" && recommendations.length === 0) {
            navigate("/cart");
        }
    }, [recState, recommendations.length, onNext]);

    // handle select recommendation
    const handleSelectRecommendation = (recommendedMenu: Menu) => {
        const newCartItemId = uuidv4();
        dispatch(cartActions.addToCart({
            cartItemId: newCartItemId,
            menu: recommendedMenu,
            quantity: 1,
            selectedVariant: null,
            selectedOptions: [],
            price: recommendedMenu.harga_awal,
        }));

        navigate(`/order/${newCartItemId}`);
    };

    const loading = recState === "idle" || recState === "loading";

    if (loading) {
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

    if (recState === "success" && recommendations.length === 0) {
        return null;
    }

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "32px",
            alignItems: "center",
            height: "100%",
            width: "100%"
        }}>
            <Typography component={"h1"} sx={{
                fontSize: "24px",
                fontWeight: "600"
            }}>
                Boleh kami menyarankan
            </Typography>

            <Box sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                gap: "8px",
                flexWrap: "wrap"
            }}>
                {recommendations.map((item) => {
                    const recMenu = item.menus;

                    return (
                        <Box
                            key={item.menu_id}
                            sx={{
                                width: "150px",
                                height: "180px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                alignItems: "center",
                                border: "1px solid rgba(0, 0, 0, 0.5)",
                                borderRadius: "4px",
                                padding: "12px",
                                cursor: "pointer",
                                "&:hover": {
                                    borderColor: "#ffbc0d",
                                    boxShadow: "0 0 0 2px #ffbc0d",
                                },
                                transition: "all 0.15s ease",
                            }}
                            onClick={() => handleSelectRecommendation(recMenu)}
                        >
                            <img
                                src={recMenu?.gambarUrl ? `/api/${recMenu?.gambarUrl}` : FALLBACK_IMAGE}
                                onError={(e) => {
                                    const img = e.currentTarget as HTMLImageElement;
                                    if (img.src !== FALLBACK_IMAGE) {
                                        img.src = FALLBACK_IMAGE;
                                    }
                                }}
                                style={{ width: "100px", height: "100px", objectFit: "cover" }}
                            />
                            <Box sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                            }}>
                                <Typography component={"h1"} sx={{
                                    fontWeight: "600",
                                    fontSize: "12px",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                }}>
                                    {recMenu.nama}
                                </Typography>
                                <Typography component={"h1"} sx={{
                                    fontWeight: "400",
                                    fontSize: "12px"
                                }}>
                                    Rp. {recMenu.harga_awal.toLocaleString("de-DE")}
                                </Typography>
                            </Box>
                        </Box>
                    );
                })}
            </Box>

            <Button
                variant="outlined"
                onClick={() => navigate("/cart")}
                sx={{
                    color: "black",
                    border: "1px solid rgba(0,0,0,0.2)",
                    height: "40px",
                    borderRadius: "0px",
                    textTransform: "none",
                    width: "calc(100% - 24px)"
                }}
            >
                Tidak
            </Button>
        </Box >
    );
}