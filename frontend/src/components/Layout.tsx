import { Box } from "@mui/material";
import { Outlet } from "react-router"; // important
import type { RootState } from "../redux/store";
import { useSelector } from "react-redux";
export default function Layout() {
    const cartItems = useSelector((state: RootState) => state.cart.cartItems)
    // const check = () => {
    //     console.table(cartItems.map(item => ({
    //         cartItemId: item.cartItemId,
    //         menu: item.menu.nama,
    //         quantity: item.quantity,
    //         price: item.price,
    //         selectedVariants: item.selectedVariants.map(v => v.nama_varian).join(", ") || "-",
    //         selectedOptions: item.selectedOptions.map(o => o.nama_option).join(", ") || "-",
    //     })))
    // }

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
                position: "absolute",
                top: "24px",
                left: "24px",
                backgroundColor: "rgba(255,255,255,0.9)",
                padding: "12px",
                borderRadius: "8px",
                maxWidth: "320px",
                fontSize: "12px"
            }}>
                {cartItems.map((item) => (
                    <Box
                        key={item.cartItemId}
                        sx={{
                            marginBottom: "8px",
                            paddingBottom: "8px",
                            borderBottom: "1px solid #ddd"
                        }}
                    >
                        <div><strong>{item.menu.nama}</strong></div>
                        <div>Qty: {item.quantity}</div>
                        <div>Price: {item.price}</div>

                        <div>
                            Variants:{" "}
                            {item.selectedVariants.length > 0
                                ? item.selectedVariants.map(v => v.nama_varian).join(", ")
                                : "-"}
                        </div>

                        <div>
                            Options:{" "}
                            {item.selectedOptions.length > 0
                                ? item.selectedOptions.map(o => o.nama_option).join(", ")
                                : "-"}
                        </div>
                    </Box>
                ))}
            </Box>

            <Box sx={{
                width: "640px",
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