import { Box, Typography, Button, Container, Stack, IconButton, Dialog, DialogTitle, TextField, DialogContent, FormControl, InputLabel, Select, MenuItem, DialogActions } from "@mui/material";
import { useEffect, useState } from "react";
import type { Menu } from "../../type"
import NavBar from "../admin/NavBarAdmin";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router";
import Cookies from 'js-cookie';

function MenuCardItem({ item, onEdit, onDelete }: {
    item: Menu;
    onEdit: (item: Menu) => void;
    onDelete: (id: string) => void;
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
                src={item.gambarUrl ? `/api/${item.gambarUrl}` : FALLBACK_IMAGE}
                onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    if (img.src !== FALLBACK_IMAGE) {
                        img.src = FALLBACK_IMAGE;
                    }
                }}
                sx={{
                    width: "100%",
                    height: "100px",
                    maxWidth: "140px",
                    objectFit: "contain",
                    // borderRadius: "12px",
                    mb: 1,
                }}
            />

            <Box sx={{ position: 'absolute', top: 10, right: 10, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <IconButton
                    onClick={() => onEdit(item)}
                    sx={{
                        bgcolor: '#ffcc00',
                        color: '#000',
                        '&:hover': {
                            bgcolor: '#e6b800'
                        }
                    }}
                >
                    <EditIcon fontSize="small" />
                </IconButton>

                <IconButton
                    onClick={() => onDelete(item.menu_id)}
                    sx={{
                        bgcolor: '#ffcc00',
                        color: '#000',
                        '&:hover': {
                            bgcolor: '#e6b800'
                        }
                    }}
                >
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Box>

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

export default function HomePageAdmin() {
    const navigate = useNavigate();
    const [menu, setMenu] = useState<Menu[]>([]);
    const [category, setCategory] = useState<string>("All");

    const [openEdit, setOpenEdit] = useState(false);
    const [menuId, setMenuId] = useState("");

    const [nama, setNama] = useState("");
    const [harga, setHarga] = useState<number>(0);

    const [categoryId, setCategoryId] = useState("");
    const [tipeMenu, setTipeMenu] = useState("");

    const [gambarUrl, setGambarUrl] = useState("");
    const [isAvailable, setAvailable] = useState(true);

    const [newImage, setNewImage] = useState<File | null>(null);
    const [newImagePreview, setNewImagePreview] = useState<string>("");

    const [categories, setCategories] = useState<any[]>([]);

    const fetchMenu = async () => {
        try {
            const token = Cookies.get('token');

            console.log(token);
            if (!token) {
                navigate("/admin/login");
                return;
            }
            const res = await fetch("/api/menu/", {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            setMenu(data.records || data || []);
        } catch (error) {
            console.error("Error: ", error)
        }
    }

    // useEffect(() => {
    //     fetchMenu();
    // }, []);

    const handleEdit = (data: Menu) => {
        setMenuId(data.menu_id);
        setNama(data.nama);
        setHarga(data.harga_awal);
        setCategoryId(data.category_id);
        setTipeMenu(data.tipe_menu);
        setGambarUrl(data.gambarUrl);
        setAvailable(data.isAvailable ?? true);
        setOpenEdit(true);
    }

    const handleOpenEdit = (menu: Menu) => {
        setNama(menu.nama);
        setHarga(menu.harga_awal);
        setGambarUrl(menu.gambarUrl);
        setCategoryId(menu.category_id);
        setTipeMenu(menu.tipe_menu);
        setAvailable(menu.isAvailable ?? true);
        setNewImage(null);
        setNewImagePreview("");
        setOpenEdit(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Yakin ingin menghapus menu ini?")) {
            try {
                const token = Cookies.get('token');
                const response = await fetch(`/api/menu/${id}`, {
                    method: "DELETE",
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (response.ok) {
                    alert("Menu Berhasil Dihapus");
                    setMenu((prev) => prev.filter((item) => item.menu_id !== id))
                }
            } catch (error) {
                console.error("Error hapus menu:", error);
            }
        }
    }

    const handleUpdate = async () => {
        const token = Cookies.get('token');
        const formData = new FormData();
        formData.append("nama", nama);
        formData.append("harga_awal", harga.toString());
        formData.append("category_id", categoryId);
        formData.append("tipe_menu", tipeMenu);
        formData.append("isAvailable", String(isAvailable));
        if (newImage) {
            formData.append("image", newImage);
        }

        try {
            const response = await fetch(`/api/menu/${menuId}`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData,
            });

            if (response.ok) {
                setOpenEdit(false);
                setNewImage(null);
                setNewImagePreview("");
                await fetchMenu();   // 👈 refresh list
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        const token = Cookies.get('token');
        fetch("/api/menu/", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(menu)
                const menuData = data.records || data || [];
                setMenu(menuData)
            })
            .catch((err) => {
                console.error("Fetch error:", err);
                setMenu([])
            })
    }, []);

    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) navigate("/admin/login");
        fetch("/api/category", {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => setCategories(data));
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

    const handleAdd = (item: Menu) => {
        console.log("Ditambah:", item);

        // code buat ke cart (leon)
    };

    return (
        <Box>
            <NavBar />
            <Container maxWidth="lg" sx={{ py: 5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                    <Button
                        variant="contained"
                        onClick={() => navigate("/admin/addMenu")}
                        sx={{
                            bgcolor: "#D52B1E",
                            fontWeight: "bold",
                            '&:hover': { bgcolor: '#b32419' }
                        }}
                    >
                        + Add Menu
                    </Button>
                </Box>
                {/* TITLE */}
                {category !== "All" && (
                    <Typography sx={{ variant: "h6", fontWeight: "bold", mb: 2 }}>
                        {category}
                    </Typography>
                )}
                {/* GRID */}

                {sortedMenu.length > 0 ? (
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
                                        <MenuCardItem key={item.menu_id} item={item} onEdit={handleEdit} onDelete={handleDelete} />
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

            <Dialog open={openEdit} onClose={() => setOpenEdit(false)} sx={{
                "& .MuiDialog-paper": {
                    borderRadius: 4,
                    p: 1
                }
            }}>
                <DialogTitle sx={{ fontWeight: 'bold' }}>Update Detail Menu</DialogTitle>
                <DialogContent sx={{ minWidth: 350, pt: 3, display: 'flex', flexDirection: 'column', gap: 3, overflow: 'visible' }}>
                    <TextField label="Nama Menu" fullWidth value={nama} onChange={(e) => setNama(e.target.value)} variant="outlined" sx={{ mt: 1 }} />
                    <TextField label="Harga" type="number" fullWidth value={harga} onChange={(e) => setHarga(Number(e.target.value))} />

                    {/* Image preview + upload */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Typography sx={{ fontSize: 14, fontWeight: 500 }}>Gambar Menu</Typography>
                        {(newImagePreview || gambarUrl) && (
                            <Box
                                component="img"
                                src={newImagePreview || `/api/${gambarUrl}`}
                                alt="preview"
                                onError={(e) => {
                                    (e.currentTarget as HTMLImageElement).src =
                                        "https://blocks.astratic.com/img/general-img-landscape.png";
                                }}
                                sx={{
                                    width: '100%',
                                    height: 160,
                                    objectFit: 'cover',
                                    borderRadius: 2,
                                    border: '1px solid #eee',
                                }}
                            />
                        )}
                        <Button
                            component="label"
                            variant="outlined"
                            sx={{ textTransform: 'none', borderColor: '#ccc', color: 'black' }}
                        >
                            {newImage ? `Change Image (${newImage.name})` : 'Upload New Image'}
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;
                                    setNewImage(file);
                                    setNewImagePreview(URL.createObjectURL(file));
                                }}
                            />
                        </Button>
                    </Box>

                    <Stack direction="row" spacing={2}>
                        <FormControl fullWidth>
                            <InputLabel>Kategori Menu</InputLabel>
                            <Select
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                                label="Kategori Menu"
                            >
                                {categories.map((cat) => (
                                    <MenuItem key={cat.category_id} value={cat.category_id}>
                                        {cat.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel>Tipe Menu</InputLabel>
                            <Select value={tipeMenu} label="Tipe Menu" onChange={(e) => setTipeMenu(e.target.value)}>
                                <MenuItem value="Ala Carte">Ala Carte</MenuItem>
                                <MenuItem value="Paket">Paket</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>

                    <FormControl fullWidth>
                        <InputLabel>is Available</InputLabel>
                        <Select value={isAvailable} label="Ketersediaan" onChange={(e) => setAvailable(e.target.value === 'true' || e.target.value === true)}>
                            <MenuItem value={true as any}>Available</MenuItem>
                            <MenuItem value={false as any}>Non Available</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={() => setOpenEdit(false)} color="inherit">Cancel</Button>
                    <Button onClick={handleUpdate} variant="contained" sx={{ bgcolor: '#D52B1E', borderRadius: 2, px: 4 }}>
                        Update Menu
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );

    return (
        <Box>
            <NavBar />
        </Box>
    )
}