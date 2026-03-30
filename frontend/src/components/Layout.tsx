import { Box } from "@mui/material";
import { Outlet } from "react-router"; // important
export default function Layout() {
    return (
        <Box
            sx={{
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box sx={{
                border: "2px solid yellow",
                width: "40%",
                height: "100%",
                padding: "12px 24px",
                overflow: "auto",
                "&::-webkit-scrollbar": { display: "none" }, // Chrome/Safari
                scrollbarWidth: "none", // Firefox
            }}>
                <Outlet />
            </Box>
        </Box>
    );
}