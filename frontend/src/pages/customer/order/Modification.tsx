import { Box, Paper, Typography } from "@mui/material";

type PackageSelectionProps = {
    onNext: (step: string) => void;
};

export default function Modification({ onNext }: PackageSelectionProps) {
    return <Box sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "32px",
        alignItems: "center",
        height: "100%",
        width: "100%"
    }}>
        <Typography component={"h1"} sx={{
            fontSize: "48px",
            fontWeight: "bold"
        }}>Modifikasi</Typography>

        <Paper elevation={3} sx={{
            width: "100%",
            padding: "12px"
        }}>
            <Box sx={{
                display: "flex",
                gap: "4px",
                width: "100%",
                height: "80px"
            }}>
                <img
                    src="/src/assets/ayam ala carte/Ayam Krispy McD - A la Carte.webp"
                    alt=""
                    style={{
                        height: "100%",
                        objectFit: "cover"
                    }}
                />
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                    flex: 1
                }}>
                    <Typography component={"h1"} sx={{
                        fontSize: "14px",
                        fontWeight: "bold"
                    }}>Ayam Krispy</Typography>
                    <Typography component={"h1"} sx={{
                        fontWeight: "400",
                        fontSize: "12px"
                    }}>Rp. {(10000).toLocaleString("de-DE")}</Typography>
                </Box>
            </Box>
        </Paper>
    </Box>
}