/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import VariantPopUp from "./VariantPopUp";
import type { Menu, Category } from "../../type";
import Cookies from 'js-cookie';
import { FALLBACK_IMAGE } from "../../constants";
import { useNavigate } from "react-router";

export default function CashierMenu() {
    const [menu, setMenu] = useState<Menu[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("All");

    const [openVariant, setOpenVariant] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const token = Cookies.get('token');

                if (!token) {
                    navigate("/admin/login");
                    return;
                }

                const res = await fetch("http://localhost:3000/menu", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (res.status === 401) {
                    navigate("/cashier/login");
                    return;
                }

                const data = await res.json();
                setMenu(Array.isArray(data.records) ? data.records : []);
            } catch (err) {
                console.error("Fetch menu error:", err);
                setMenu([]);
            }
        };
        fetchMenu();
    }, []);

    useEffect(() => {
        const token = Cookies.get('token');
        fetch("http://localhost:3000/category", {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => setCategories(Array.isArray(data) ? data : []))
            .catch(() => setCategories([]));
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
                selectedVariant: null,
                selectedOptions: [],
                price: item.harga_awal
            }));
        }
    };

    const handleConfirm = ({ selectedVariant, selectedOptions, price }: any) => {
        if (!selectedMenu) return;
        dispatch(cartActions.addToCart({
            cartItemId: crypto.randomUUID(),
            menu: selectedMenu,
            quantity: 1,
            selectedVariant,
            selectedOptions,
            price
        }));
    };

    return (
        <Box sx={{
            display: "flex",
            height: "100%",
            minHeight: 0,
            overflow: "hidden"
        }}>

            <Box sx={{
                width: 200,
                flexShrink: 0,
                p: 2,
                borderRight: "1px solid #eee",
                background: "#fff",
                overflowY: "auto"
            }}>

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

            <Box sx={{
                flex: 1,
                minWidth: 0,
                p: 3,
                background: "#f5f5f5",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden"
            }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }} >Menu</Typography>

                <Box sx={{
                    flex: 1,
                    overflowY: "auto",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                    gap: 2,
                    alignContent: "start",
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
                            <img src={item.gambarUrl ? `/api/${item.gambarUrl}` : FALLBACK_IMAGE}
                                onError={(e) => {
                                    const img = e.currentTarget as HTMLImageElement;
                                    if (img.src !== FALLBACK_IMAGE) {
                                        img.src = FALLBACK_IMAGE;
                                    }
                                }} style={{ width: "100%", height: 100, objectFit: "contain" }} />
                            <Typography sx={{ fontWeight: "bold", mt: 1 }}>{item.nama}</Typography>
                            <Typography sx={{ fontWeight: "bold", color: "3ff9800" }}>
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