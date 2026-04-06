import { Box, Button, Paper, Typography } from "@mui/material";

type PackageSelectionProps = {
    onNext: (step: string) => void;
};

export default function PackageSelection({ onNext }: PackageSelectionProps) {

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
            }}>1pc Ayam Krispy</Typography>
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
                        src="/src/assets/PaNas/PaNas 1.webp"
                        alt=""
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
                        src="/src/assets/ayam ala carte/Ayam Krispy McD - A la Carte.webp"
                        alt=""
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

                    }}>Rp23,000</Typography>
                </Paper>
            </Box>
            <Button variant="outlined" sx={{
                color: "black",
                borderColor: "black"
            }}>Batal</Button>
        </Box>
        <Box />
    </Box>
}