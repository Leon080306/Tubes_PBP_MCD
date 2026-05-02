import { Box, Typography, ButtonBase } from "@mui/material";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { sessionActions } from "../../store/sessionSlice";
import type { order_type } from "../../type";

export default function HomePage() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleSelect = (type: order_type) => {
        dispatch(sessionActions.setOrderType(type));
        navigate("/menu");
    };

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
            padding: "32px",
            gap: "48px",
        }}>
            <Typography sx={{
                fontSize: "36px",
                fontWeight: "bold",
                textAlign: "center",
                color: "#333",
                lineHeight: 1.2,
            }}>
                Makan di Sini atau<br />bawa pulang?
            </Typography>

            <Box sx={{
                display: "flex",
                gap: "24px",
                width: "100%",
                justifyContent: "center",
            }}>
                <ButtonBase
                    onClick={() => handleSelect("Dine-in")}
                    sx={{
                        flex: 1,
                        maxWidth: "240px",
                        aspectRatio: "3 / 4",
                        border: "1px solid",
                        borderColor: "rgba(0,0,0,0.15)",
                        borderRadius: "12px",
                        backgroundColor: "white",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        transition: "all 0.2s",
                        paddingTop: "24px",
                        "&:hover": {
                            borderColor: "#ffbc0d",
                            boxShadow: "0 4px 12px rgba(255, 188, 13, 0.25)",
                            transform: "translateY(-2px)",
                        },
                    }}
                >
                    <Typography sx={{
                        fontSize: "20px",
                        fontWeight: 500,
                        color: "#333",
                        textAlign: "center",
                    }}>
                        Makan di sini
                    </Typography>

                    <Box
                        component="img"
                        src={"/src/assets/dine-in-logo.png"}
                        sx={{
                            width: "100%",
                            height: "60%",
                            objectFit: "cover",
                            alignSelf: "center",
                        }}
                    />
                </ButtonBase>

                <ButtonBase
                    onClick={() => handleSelect("Takeaway")}
                    sx={{
                        flex: 1,
                        maxWidth: "240px",
                        aspectRatio: "3 / 4",
                        border: "1px solid",
                        borderColor: "rgba(0,0,0,0.15)",
                        borderRadius: "12px",
                        backgroundColor: "white",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        transition: "all 0.2s",
                        paddingTop: "24px",
                        "&:hover": {
                            borderColor: "#ffbc0d",
                            boxShadow: "0 4px 12px rgba(255, 188, 13, 0.25)",
                            transform: "translateY(-2px)",
                        },
                    }}
                >
                    <Typography sx={{
                        fontSize: "20px",
                        fontWeight: 500,
                        color: "#333",
                        textAlign: "center",
                    }}>
                        Bawa Pulang
                    </Typography>

                    <Box
                        component="img"
                        src={"/src/assets/bawa-pulang-logo.png"}
                        sx={{
                            width: "100%",
                            height: "60%",
                            objectFit: "cover",
                            alignSelf: "center",
                        }}
                    />
                </ButtonBase>
            </Box>
        </Box>
    );
}