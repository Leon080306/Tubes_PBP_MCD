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

            <Typography sx={{
                fontWeight: "bold",
                mt: 1,
                fontSize: "14px",
            }}>
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

    const categories = ["All", ...new Set(menu.map((item) => item.kategori_menu))];

    return (
        <Box
            sx={{
                display: "flex",
                gap: 2,
                width: "100%",
                maxWidth: "900px",
                margin: "0 auto",
            }}
        >

            <Box
                sx={{
                    width: "140px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    pt: 2,
                }}
            >
                {categories.map((cat) => (
                    <Box
                        key={cat}
                        onClick={() => setCategory(cat)}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            cursor: "pointer",
                            px: 1,
                            py: 0.5,
                            borderLeft:
                                category === cat
                                    ? "4px solid #ffcc00"
                                    : "4px solid transparent",
                            fontWeight: category === cat ? "bold" : "normal",
                            color: category === cat ? "#000" : "#666",
                            transition: "0.2s",
                            "&:hover": {
                                color: "#000",
                            },
                        }}
                    >
                        <Box
                            component="img"
                            src={`/icons/${cat}.png`}
                            sx={{
                                width: 24,
                                height: 24,
                                objectFit: "contain",
                            }}
                            onError={(e) => {
                                e.currentTarget.style.display = "none";
                            }}
                        />

                        <Typography fontSize="14px">
                            {cat}
                        </Typography>
                    </Box>
                ))}
            </Box>

            <Box sx={{ flex: 1 }}>

                {category !== "All" && (
                    <Typography variant="h6" fontWeight="bold" mb={2}>
                        {category}
                    </Typography>
                )}

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
                                        <MenuCardItem
                                            key={item.menu_id}
                                            item={item}
                                            onClick={() => handleAdd(item)}
                                        />
                                    ))}
                                </Box>
                            </Box>
                        ))}
                    </Box>
                ) : (
                    <Typography mt={4} textAlign="center">
                        Menu tidak ditemukan
                    </Typography>
                )}

            </Box>
        </Box >
    );
}