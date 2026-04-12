import { Box, Button, Checkbox, Divider, FormControlLabel, IconButton, Paper, Typography } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

type PackageSelectionProps = {
    onNext: (step: string) => void;
};

export default function Modification({ onNext }: PackageSelectionProps) {
    const [ingredients, setIngredients] = useState([
        { id: 1, name: "Beef Patty", qty: 1, image: "/public/camilan/chicken snack wrap.webp" },
        { id: 2, name: "Cheese Slice", qty: 1, image: "/public/camilan/chicken snack wrap.webp" },
        { id: 3, name: "Pickle", qty: 1, image: "/public/camilan/chicken snack wrap.webp" },
        { id: 4, name: "Bawang Bombay", qty: 1, image: "/public/camilan/chicken snack wrap.webp" },
    ]);

    const [specialRequests, setSpecialRequests] = useState([
        { id: 1, label: "Sayap", checked: false },
        { id: 2, label: "Paha Bawah", checked: false },
        { id: 3, label: "Dada Mentok", checked: false },
        { id: 4, label: "Dada Tulang", checked: false },
        { id: 5, label: "Paha Atas", checked: false },
    ]);

    const handleIncrement = (id: number) =>
        setIngredients(prev => prev.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i));

    const handleDecrement = (id: number) =>
        setIngredients(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(0, i.qty - 1) } : i));

    const handleCheckbox = (id: number) =>
        setSpecialRequests(prev => prev.map(r => r.id === id ? { ...r, checked: !r.checked } : r));

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "24px",
            alignItems: "center",
            height: "100%",
            width: "100%"
        }}>
            <Typography component={"h1"} sx={{ fontSize: "48px", fontWeight: "bold" }}>
                Modifikasi
            </Typography>

            <Paper elevation={3} sx={{ width: "100%", padding: "12px" }}>
                <Box sx={{ display: "flex", gap: "4px", width: "100%", height: "80px" }}>
                    <img
                        src="/public/ayam ala carte/ayam krispy.webp"
                        alt=""
                        style={{ height: "100%", objectFit: "cover" }}
                    />
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
                        <Typography component={"h1"} sx={{ fontSize: "14px", fontWeight: "bold" }}>
                            Ayam Krispy
                        </Typography>
                        <Typography component={"h1"} sx={{ fontWeight: "400", fontSize: "12px" }}>
                            Rp. {(10000).toLocaleString("de-DE")}
                        </Typography>
                    </Box>
                </Box>
                <Button
                    variant="outlined"
                    onClick={() => onNext("modification")}
                    sx={{ color: "black", borderColor: "black", height: "36px", textTransform: "none", width: "100%" }}
                >
                    Hapus Perubahan
                </Button>
            </Paper>

            {/* Ingredients list */}
            <Paper elevation={3} sx={{
                width: "100%",
                padding: "12px",
                flex: 1,
                overflow: "auto",
                "&::-webkit-scrollbar": { display: "none" },
                scrollbarWidth: "none",
            }}>
                <Typography sx={{ fontSize: "16px", fontWeight: "bold", mb: 1 }}>
                    Tersedia dengan
                </Typography>

                {ingredients.map((item, index) => (
                    <Box key={item.id}>
                        <Box sx={{
                            display: "grid",
                            gridTemplateColumns: "80px 1fr auto",
                            alignItems: "center",
                            gap: "8px",
                            py: "10px",
                        }}>
                            <img
                                src={item.image}
                                alt={item.name}
                                style={{ width: "80px", height: "64px", objectFit: "contain" }}
                            />
                            <Typography sx={{ fontSize: "16px" }}>{item.name}</Typography>
                            <Box sx={{
                                display: "flex",
                                alignItems: "center",
                                border: "1px solid",
                                borderColor: "divider",
                                borderRadius: "4px",
                            }}>
                                <IconButton size="medium" sx={{ borderRadius: 0, px: "10px" }} onClick={() => handleDecrement(item.id)}>
                                    <RemoveIcon sx={{ fontSize: "20px" }} />
                                </IconButton>
                                <Typography sx={{ fontSize: "18px", minWidth: "36px", textAlign: "center", userSelect: "none" }}>
                                    {item.qty}
                                </Typography>
                                <IconButton size="medium" sx={{ borderRadius: 0, px: "10px" }} onClick={() => handleIncrement(item.id)}>
                                    <AddIcon sx={{ fontSize: "20px" }} />
                                </IconButton>
                            </Box>
                        </Box>
                        {index < ingredients.length - 1 && <Divider />}
                    </Box>
                ))}
            </Paper>

            {/* ✅ Permintaan Khusus Block */}
            <Paper elevation={3} sx={{ width: "100%", padding: "12px" }}>
                <Typography sx={{ fontSize: "16px", fontWeight: "bold", mb: 1.5 }}>
                    Permintaan Khusus
                </Typography>
                <Box sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "8px",
                }}>
                    {specialRequests.map((request) => (
                        <FormControlLabel
                            key={request.id}
                            control={
                                <Checkbox
                                    checked={request.checked}
                                    onChange={() => handleCheckbox(request.id)}
                                    sx={{
                                        color: "rgba(0,0,0,0.4)",
                                        "&.Mui-checked": { color: "#ffbc0d" },
                                        p: "4px",
                                    }}
                                />
                            }
                            label={
                                <Typography sx={{ fontSize: "14px" }}>{request.label}</Typography>
                            }
                            sx={{
                                border: "1px solid rgba(0,0,0,0.15)",
                                borderRadius: "4px",
                                margin: 0,
                                padding: "6px 10px",
                                alignItems: "center",
                            }}
                        />
                    ))}
                </Box>
            </Paper>

            {/* Bottom action buttons */}
            <Paper elevation={3} sx={{ width: "100%", padding: "0", flex: 0.15, display: "flex" }}>
                <Button
                    variant="outlined"
                    onClick={() => onNext("quantity")}
                    sx={{ color: "black", border: "1px solid rgba(0,0,0,0.2)", flex: 1, borderRadius: "0px", textTransform: "none" }}
                >
                    Batalkan Perubahan
                </Button>
                <Button
                    variant="contained"
                    onClick={() => onNext("recommendation")}
                    disableElevation
                    sx={{ color: "black", backgroundColor: "#ffbc0d", border: "1px solid rgba(0,0,0,0.2)", flex: 1, borderRadius: "0px", textTransform: "none" }}
                >
                    Simpan Perubahan
                </Button>
            </Paper>
        </Box>
    );
}