import { Box, Typography, Button, Container, Stack, IconButton, Dialog, DialogTitle, TextField, DialogContent, FormControl, InputLabel, Select, MenuItem, DialogActions } from "@mui/material";
import { useEffect, useState } from "react";
import type { MenuItemType } from "../../type"
import NavBar from "../admin/NavBarAdmin";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router";

function MenuCardItem({ item }: {
    item: MenuItemType;
    // onClick: () => void;
}) {
    return (
        <Box
            // onClick={onClick}
            sx={{
                backgroundColor: "#fff",
                borderRadius: "16px",
                p: 2,
                textAlign: "center",
                boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                transition: "all 0.3s eas",
                cursor: "pointer",
                border: "1px solid #f0f0f0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                height: "100%",
                "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 12px 25px rgba(0,0,0,0.1)",
                    borderColor: "#ffbc0d",
                },
            }}
        >
            <Box
                component="img"
                src={`/${item.gambarUrl}`}
                alt={item.nama}
                sx={{
                    width: "100%",
                    height: "100px",
                    maxWidth: "140px",
                    objectFit: "contain",
                    // borderRadius: "12px",
                    mb: 1,
                }}
            />

            <Typography sx={{ fontWeight: "bold", mt: 1, fontSize: "14px" }}>
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

export default function CashierPage() {
    const navigate = useNavigate();
    const [menu, setMenu] = useState<MenuItemType[]>([]);
    const [category, setCategory] = useState<string>("All");

    const fetchMenu = async () => {
        try {
            const res = await fetch("/api/menu/");
            const data = await res.json();
            setMenu(data.records || data || []);
        } catch (error) {
            console.error("Error: ", error)
        }
    }

    useEffect(() => { 
        fetchMenu();
    }, []);

    const groupedMenu = menu.reduce((acc, item) => {
        if (!acc[item.kategori_menu]) {
            acc[item.kategori_menu] = [];
        }
        acc[item.kategori_menu].push(item);
        return acc;
    }, {} as Record<string, MenuItemType[]>);

    return (
        <Box>
            <NavBar />

            <Container maxWidth="lg" sx={{ py: 5 }}>
                {/* TITLE */}
                {category !== "All" && (
                    <Typography sx={{ variant: "h6", fontWeight: "bold", mb: 2 }}>
                        {category}
                    </Typography>
                )}
                {/* GRID */}

                {menu.length > 0 ? (
                    <Box>
                        {Object.entries(groupedMenu).map(([kategori, items], index) => (
                            <Box key={kategori} sx={{ mb: 6 }}>

                                <Box
                                    sx={{
                                        borderTop: index === 0 ? "none" : "2px solid #eee",
                                        pt: 2,
                                        mb: 2,
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: "900",
                                            fontSize: "18px",
                                            borderLeft: "6px solid #ffcc00",
                                            pl: 1.5,
                                            textTransform: "uppercase",
                                            letterSpacing: "0.5px"
                                        }}
                                    >
                                        {kategori}
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        display: "grid",
                                        gridTemplateColumns: {
                                            md: "repeat(4, 1fr)",
                                            sm: "repeat(3, 1fr)",
                                            xs: "repeat(2, 1fr)",
                                        },
                                        gap: 3,
                                    }}
                                >
                                    {items.map((item) => (
                                        <MenuCardItem key={item.menu_id} item={item} />
                                    ))}
                                </Box>
                            </Box>
                        ))}
                    </Box>
                ) : (
                    <Typography sx={{
                        mt: 4,
                        textAlign: "center"
                    }}>
                        Menu tidak ditemukan
                    </Typography>
                )}
            </Container>
        </Box>
    );
}