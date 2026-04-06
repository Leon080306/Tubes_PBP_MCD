import { Box, Paper, Typography } from "@mui/material";

export default function OrderMenuPage() {
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
            gap: "24px"
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
                <Paper elevation={8} sx={{
                    flex: 1,
                    height: "300px",
                    border: "1px solid gray",
                    cursor: "pointer"
                }}>

                </Paper>

                <Paper elevation={8} sx={{
                    flex: 1,
                    height: "300px",
                    border: "1px solid gray",
                    cursor: "pointer"
                }}>

                </Paper>
            </Box>
        </Box>

        <Box />
    </Box>
}