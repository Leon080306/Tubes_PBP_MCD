import { Box, Button, Typography } from "@mui/material";
import NumberSpinner from './../../../components/NumberSpinner';
import { useNavigate } from "react-router";

type PackageSelectionProps = {
    onNext: (step: string) => void;
};

export default function SetQuantity({ onNext }: PackageSelectionProps) {
    const navigate = useNavigate();

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
                    src="/src/assets/ayam ala carte/Ayam Krispy McD - A la Carte.webp"
                    alt=""
                    style={{
                        width: "50%",
                        objectFit: "cover"
                    }}
                />
                <Typography component={"h1"} sx={{
                    fontWeight: "bold",
                    fontSize: "20px"
                }}>1pc Ayam Krispy</Typography>
                <Typography sx={{
                    fontSize: "14px"
                }}>Rp23,000</Typography>
            </Box>

            <Box sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
            }}>
                <Button variant="outlined" onClick={() => onNext("modification")} sx={{
                    color: "black",
                    borderColor: "black",
                    height: "50px"
                }}>Modifikasi</Button>

                <NumberSpinner min={1} max={100} defaultValue={1} />
            </Box>

            <Box sx={{
                width: '100%',
                display: "flex"
            }}>
                <Button variant="outlined" onClick={() => navigate("/")} sx={{
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