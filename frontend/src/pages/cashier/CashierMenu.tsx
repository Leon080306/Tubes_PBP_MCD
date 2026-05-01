import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import VariantPopUp from "./VariantPopUp";
import type { Menu, Category } from "../../type";

export default function CashierMenu() {
    const [menu, setMenu] = useState<Menu[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("All");

    const [openVariant, setOpenVariant] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);

    const dispatch = useDispatch();

    useEffect(() => {
        fetch("http://localhost:3000/menu")
            .then(res => res.json())
            .then(data => setMenu(data.records));
    }, []);

    useEffect(() => {
        fetch("/api/category")
            .then(res => res.json())
            .then(setCategories);
    }, []);

    const filtered =
        selectedCategory === "All"
            ? menu
            : menu.filter(m => m.category.name === selectedCategory);

    const handleClick = (item: Menu) => {
        const hasVariant = item.mvs && item.mvs.length > 0;
        const hasOption = item.mos && item.mos.length > 0;

        if (hasVariant || hasOption) {
            setSelectedMenu(item);
            setOpenVariant(true);
        } else {
            dispatch(cartActions.addToCart({
                cartItemId: crypto.randomUUID(),
                menu: item,
                quantity: 1,
                selectedVariants: [],
                selectedOptions: [],
                price: item.harga_awal
            }));
        }
    };

    const handleConfirm = ({ selectedVariants, selectedOptions, price }: any) => {
        if (!selectedMenu) return;
        dispatch(cartActions.addToCart({
            cartItemId: crypto.randomUUID(),
            menu: selectedMenu,
            quantity: 1,
            selectedVariants,
            selectedOptions,
            price
        }));
    };

    return (
        <Box sx={{ display: "flex", height: "100%" }}>

            <Box sx={{ width: 200, p: 2, borderRight: "1px solid #eee", background: "#fff" }}>

                {["All", ...categories.map(c => c.name)].map((cat) => (
                    <Box
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        sx={{
                            p: 1.5,
                            mb: 1,
                            borderRadius: 2,
                            cursor: "pointer",
                            background: selectedCategory === cat ? "#ffbc0d" : "transparent",
                            fontWeight: selectedCategory === cat ? "bold" : "normal",
                            "&:hover": { background: "#ffe082" }
                        }}
                    >
                        {cat}
                    </Box>
                ))}
            </Box>

            <Box sx={{ flex: 1, p: 3, background: "#f5f5f5" }}>
                <Typography variant="h5" fontWeight="bold" mb={2}>Menu</Typography>

                <Box sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                    gap: 2
                }}>
                    {filtered.map(item => (
                        <Box
                            key={item.menu_id}
                            onClick={() => handleClick(item)}
                            sx={{
                                p: 2, borderRadius: 3, background: "#fff", textAlign: "center",
                                cursor: "pointer", boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                                "&:hover": { transform: "scale(1.05)" }
                            }}
                        >
                            <img src={`/${item.gambarUrl}`} style={{ width: "100%", height: 100, objectFit: "contain" }} />
                            <Typography fontWeight="bold" mt={1}>{item.nama}</Typography>
                            <Typography color="#ff9800" fontWeight="bold">
                                Rp {item.harga_awal.toLocaleString()}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>

            <VariantPopUp
                open={openVariant}
                onClose={() => setOpenVariant(false)}
                menu={selectedMenu}
                onConfirm={handleConfirm}
            />
        </Box>
    );
}