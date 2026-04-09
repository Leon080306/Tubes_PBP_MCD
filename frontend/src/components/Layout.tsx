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
                backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("/src/assets/background.JPG")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}
        >
            <Box sx={{
                width: "550px",
                height: "100%",
                padding: "12px 24px",
                overflow: "auto",
                backgroundColor: "white",
                "&::-webkit-scrollbar": { display: "none" },
                scrollbarWidth: "none",
            }}>
                <Outlet />
            </Box>
        </Box>
    );
}