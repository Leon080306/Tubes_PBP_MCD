import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import type { Menu } from "../../type";
import { cartActions } from "../../store/cartSlice";

function MenuCardItem({ item, onClick }: {
    item: Menu;
    onClick: () => void;
}) {
    return (
        <Box
            onClick={onClick}
            sx={{
                backgroundColor: "#fff",
                borderRadius: 3,
                p: 1.5,
                textAlign: "center",
                boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                transition: "0.2s",
                cursor: "pointer",
                "&:hover": {
                    transform: "scale(1.03)",
                },
            }}
        >
            <Box
                component="img"
                src={`/${item.gambarUrl}`}
                alt={item.nama}
                sx={{
                    width: "50%",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "12px",
                }}
            />

            <Typography fontWeight="bold" mt={1} fontSize="14px">
                {item.nama}
            </Typography>

            <Typography
                sx={{
                    color: "#ff9800",
                    fontWeight: "bold",
                    fontSize: "13px",
                }}
            >
                Rp {item.harga_awal.toLocaleString()}
            </Typography>

        </Box>
    );
}

export default function MenuList() {
    const [menu, setMenu] = useState<Menu[]>([]);
    const [category, setCategory] = useState<string>("All");
    const dispatch = useDispatch<AppDispatch>()

    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3000/menu")
            .then((res) => res.json())
            .then((data) => {
                setMenu(data.records);
                console.log(data.records)
            })
            .catch((err) => console.error("Fetch error:", err));
    }, []);

    let filtered: Menu[];

    if (category === "All") {
        filtered = menu;
    } else {
        filtered = menu.filter((item) => item.kategori_menu === category);
    }

    const sortedMenu = [...filtered].sort((a, b) =>
        a.kategori_menu.localeCompare(b.kategori_menu)
    );

    const groupedMenu = sortedMenu.reduce((acc, item) => {
        if (!acc[item.kategori_menu]) {
            acc[item.kategori_menu] = [];
        }
        acc[item.kategori_menu].push(item);
        return acc;
    }, {} as Record<string, Menu[]>);

    const handleMenuClick = (menu: Menu) => {
        const cartItemId = crypto.randomUUID();
        dispatch(cartActions.addToCart({
            cartItemId: cartItemId,
            menu: menu,
            quantity: 1,
            selectedVariants: [],
            selectedOptions: [],
            price: menu.harga_awal
        }))
        navigate("/order/" + cartItemId)
    };

    return (
        <Box>
            {/* TITLE */}
            {category !== "All" && (
                <Typography variant="h6" fontWeight="bold" mb={2}>
                    {category}
                </Typography>
            )}
            {/* GRID */}
            {sortedMenu.length > 0 ? (
                <Box>
                    {Object.entries(groupedMenu).map(([kategori, items], index) => (
                        <Box key={kategori} mb={4}>
                            <Box
                                sx={{
                                    borderTop: index === 0 ? "none" : "2px solid #eee",
                                    pt: 2,
                                    mb: 2,
                                }}
                            >
                                <Typography
                                    fontWeight="bold"
                                    sx={{
                                        borderLeft: "5px solid #ffcc00",
                                        pl: 1,
                                    }}
                                >
                                    {kategori}
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(2, 1fr)",
                                    gap: 2,
                                }}
                            >
                                {items.map((item) => (
                                    <MenuCardItem key={item.menu_id} item={item} onClick={() => handleMenuClick(item)} />
                                ))}
                            </Box>
                        </Box>
                    ))}
                </Box>
            ) : (
                <Typography mt={4} sx={{
                    textAlign: "center"
                }}>
                    Menu tidak ditemukan
                </Typography>
            )}
        </Box>
    );
}
