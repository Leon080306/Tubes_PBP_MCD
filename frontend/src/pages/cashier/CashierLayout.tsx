import { Box } from "@mui/material";
import CashierMenu from "./CashierMenu";
import CartCashier from "./CartCashier";
import NavBar from "../admin/NavBarAdmin";

export default function CashierLayout() {
    return (
        <>
            <NavBar />
            <Box sx={{ display: "flex", height: "100vh" }}>

                <Box sx={{ flex: 3 }}>
                    <CashierMenu />
                </Box>

                <Box
                    sx={{
                        flex: 1.5,
                        borderLeft: "1px solid #eee",
                        background: "#fff",
                        p: 2
                    }}
                >
                    <CartCashier />
                </Box>

            </Box>
        </>
    );
}