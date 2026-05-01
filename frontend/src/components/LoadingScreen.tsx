import { Box, CircularProgress } from "@mui/material";

export function LoadingScreen() {
    return <Box sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    }}>
        <CircularProgress sx={{ color: "#ffbc0d" }} />
    </Box>
}