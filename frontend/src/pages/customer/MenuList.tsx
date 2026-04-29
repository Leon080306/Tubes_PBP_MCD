import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { cartActions } from "../../store/cartSlice";
import type { Menu, Category } from "../../type";

function MenuCardItem({
    item,
    onClick,
}: {
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
                cursor: "pointer",
                transition: "0.2s",
                "&:hover": { transform: "scale(1.03)" },
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

            <Typography sx={{ fontWeight: "bold", mt: 1, fontSize: "14px" }}>
                {item.nama}
            </Typography>

            <Typography sx={{ color: "#ff9800", fontWeight: "bold", fontSize: "13px" }}>
                Rp {item.harga_awal.toLocaleString()}
            </Typography>
        </Box>
    );
}

export default function MenuList() {
    const [menu, setMenu] = useState<Menu[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [category, setCategory] = useState<string>("All");

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    // 🔥 GET MENU
    useEffect(() => {
        fetch("http://localhost:3000/menu")
            .then((res) => res.json())
            .then((data) => setMenu(data.records))
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        fetch("http://localhost:3000/api/category")
            .then((res) => res.json())
            .then((data) => setCategories(data))
            .catch((err) => console.error(err));
    }, []);

    const filtered =
        category === "All"
            ? menu
            : menu.filter((item) => item.category.name === category);

    const sortedMenu = [...filtered].sort((a, b) =>
        a.category.name.localeCompare(b.category.name)
    );

    const groupedMenu = sortedMenu.reduce((acc, item) => {
        const cat = item.category.name;
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(item);
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
                <Box
                    onClick={() => setCategory("All")}
                    sx={{
                        cursor: "pointer",
                        borderLeft:
                            category === "All"
                                ? "4px solid #ffcc00"
                                : "4px solid transparent",
                        pl: 1,
                        fontWeight: category === "All" ? "bold" : "normal",
                    }}
                >
                    All
                </Box>

                {categories.map((cat) => (
                    <Box
                        key={cat.category_id}
                        onClick={() => setCategory(cat.name)}
                        sx={{
                            cursor: "pointer",
                            borderLeft:
                                category === cat.name
                                    ? "4px solid #ffcc00"
                                    : "4px solid transparent",
                            pl: 1,
                            fontWeight: category === cat.name ? "bold" : "normal",
                        }}
                    >
                        {cat.name}
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
                                        sx={{ borderLeft: "5px solid #ffcc00", pl: 1 }}
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
                                            onClick={() => handleMenuClick(item)}
                                        />
                                    ))}
                                </Box>
                            </Box>
                        ))}
                    </Box>
                ) : (
                    <Typography sx={{ mt: 4, textAlign: "center" }}>
                        Menu tidak ditemukan
                    </Typography>
                )}
            </Box>
        </Box>
    );
}