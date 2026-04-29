import { useState } from "react";
import { Container, Typography, TextField, Button, Paper, Stack, MenuItem, Box } from "@mui/material";
import { useNavigate } from "react-router";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NavBar from './NavBarAdmin';
import Cookies from 'js-cookie';

export default function CreateMenuPage() {
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>("");
    const navigate = useNavigate();
    const [form, setForm] = useState({
        nama: "",
        harga_awal: 0,
        kategori_menu: "",
        tipe_menu: "Ala Carte",
        gambarUrl: "",
        isAvailable: "true"
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setImage(file);
        setPreview(URL.createObjectURL(file));
        // if(!image) return;
        // const formData = new FormData();
        // formData.append("image", image);
    }

    const handleCreate = async () => {
        if (!form.nama || !form.harga_awal || !form.kategori_menu || !form.tipe_menu || !image) {
            console.log(form)
            alert("Tidak boleh kosong");
            return;
        }

        const formData = new FormData();
        formData.append("nama", form.nama);
        formData.append("harga_awal", form.harga_awal.toString());
        formData.append("kategori_menu", form.kategori_menu);
        formData.append("tipe_menu", form.tipe_menu);
        formData.append("isAvailable", form.isAvailable);
        formData.append("image", image);

        try {
            const response = await fetch('/api/menu/', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                alert("Menu berhasil dibuat!");
                navigate("/admin/");
            }
        } catch (error) {
            console.log("Error: ", error)
        }

    }

    return (
        <Box>
            <NavBar />
            <Container maxWidth="sm" sx={{ py: 10 }}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate("/admin/")}
                    sx={{ mb: 2, color: '#D52B1E', fontWeight: 'bold', textTransform: 'none' }}
                >
                    Back to List Menu
                </Button>
                <Paper sx={{ p: 4, borderRadius: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>Add New Menu</Typography>

                    {/* <form onSubmit={handleCreate}> */}
                    <Stack spacing={3}>
                        <TextField label="Menu Name" fullWidth required value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} />
                        <TextField label="Price" type="number" fullWidth required value={form.harga_awal} onChange={(e) => setForm({ ...form, harga_awal: Number(e.target.value) })} />
                        {/* <TextField label="Image URL" fullWidth required value={form.gambarUrl} onChange={(e) => setForm({ ...form, gambarUrl: e.target.value })} /> */}

                        <input type="file" accept="image/*" onChange={handleChange} />

                        <img src={preview} alt="" />
                        <Stack direction="row" spacing={2}>

                            <TextField
                                select
                                label="Select Category"
                                fullWidth
                                required
                                value={form.kategori_menu}
                                onChange={(e) => setForm({ ...form, kategori_menu: e.target.value })}
                            >
                                <MenuItem value="Burger">Burger</MenuItem>
                                <MenuItem value="Drinks">Drinks</MenuItem>
                                <MenuItem value="Dessert">Dessert</MenuItem>
                                <MenuItem value="Happy Meal">Happy Meal</MenuItem>
                                <MenuItem value="Camilan">Camilan</MenuItem>
                                <MenuItem value="Ayam">Ayam</MenuItem>
                            </TextField>
                            <TextField
                                select
                                label="Select Type"
                                fullWidth
                                required
                                value={form.tipe_menu}
                                onChange={(e) => setForm({ ...form, tipe_menu: e.target.value })}
                            >
                                <MenuItem value="Ala Carte">Ala Carte</MenuItem>
                                <MenuItem value="Paket">Paket</MenuItem>
                            </TextField>
                        </Stack>

                        <TextField
                            select
                            label="Is Available"
                            fullWidth
                            required
                            value={form.isAvailable}
                            onChange={(e) => setForm({ ...form, isAvailable: e.target.value })}
                        >
                            <MenuItem value="true">Available</MenuItem>
                            <MenuItem value="false">Unavailable</MenuItem>
                        </TextField>

                        <Button onClick={handleCreate} variant="contained" size="large" sx={{
                            bgcolor: '#D52B1E',
                            color: 'white',
                            fontWeight: 'bold',
                            py: 1.5,
                            borderRadius: 2,
                            '&:hover': {
                                bgcolor: '#b32419',
                                boxShadow: '0 6px 15px rgba(211, 47, 47, 0.3)'
                            }
                        }}>Add New Menu</Button>
                    </Stack>
                    {/* </form> */}
                </Paper>
            </Container>
        </Box>
    )
}