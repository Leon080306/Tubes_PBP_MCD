import { useState, useEffect } from "react";
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
        harga_awal: '' as any,
        category_id: "",
        tipe_menu: "Ala Carte",
        gambarUrl: "",
        isAvailable: true
    });
    const [variants, setVariants] = useState([
        { name: "", price: '' as any }
    ]);

    const [options, setOptions] = useState([
        { name: "", price: '' as any }
    ]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setImage(file);
        setPreview(URL.createObjectURL(file));
        // if(!image) return;
        // const formData = new FormData();
        // formData.append("image", image);
    }

    const [categories, setCategories] = useState<any[]>([]);

    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            navigate("/admin/login");
            return;
        }
        fetch("/api/category", {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => setCategories(data));
    }, []);

    const handleCreate = async () => {
        if (!form.nama || !form.harga_awal || !form.category_id || !form.tipe_menu || !image) {
            console.log(form)
            alert("Tidak boleh kosong");
            return;
        }

        const token = Cookies.get('token');
        const formData = new FormData();
        formData.append("nama", form.nama);
        formData.append("harga_awal", form.harga_awal.toString());
        formData.append("category_id", form.category_id);
        formData.append("tipe_menu", form.tipe_menu);
        formData.append("isAvailable", String(form.isAvailable));
        formData.append("image", image);
        formData.append("variants", JSON.stringify(variants));
        formData.append("options", JSON.stringify(options));

        try {
            const response = await fetch('/api/menu/', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
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

    const addVariant = () => {
        setVariants([...variants, { name: "", price: '' as any }]);
    };

    const removeVariant = (index: number) => {
        setVariants(variants.filter((_, i) => i !== index));
    };

    const handleVariantChange = (index: number, field: string, value: any) => {
        const updated = [...variants];
        (updated[index] as any)[field] = value;
        setVariants(updated);
    };

    const addOption = () => {
        setOptions([...options, { name: "", price: '' as any }]);
    };

    const removeOption = (index: number) => {
        setOptions(options.filter((_, i) => i !== index));
    };

    const handleOptionChange = (index: number, field: string, value: any) => {
        const updated = [...options];
        (updated[index] as any)[field] = value;
        setOptions(updated);
    };

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

                        {preview && <img src={preview} alt="preview" />}

                        <Stack direction="row" spacing={2}>
                            <TextField
                                select
                                label="Select Category"
                                fullWidth
                                required
                                value={form.category_id}
                                onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                            >
                                {categories.map((cat) => (
                                    <MenuItem key={cat.category_id} value={cat.category_id}>
                                        {cat.name}
                                    </MenuItem>
                                ))}
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

                        <Button onClick={addVariant}>+ Add Variant</Button>

                        {variants.map((v, i) => (
                            <Paper key={i} sx={{ p: 0.5 }}>
                                <Stack direction="row" spacing={0.1}>
                                    <TextField
                                        label="Variant Name"
                                        value={v.name}
                                        onChange={(e) => handleVariantChange(i, "name", e.target.value)}
                                    />

                                    <TextField
                                        label="Price"
                                        type="number"
                                        value={v.price}
                                        onChange={(e) => handleVariantChange(i, "price", Number(e.target.value))}
                                    />

                                    <Button color="error" onClick={() => removeVariant(i)}>
                                        Remove
                                    </Button>
                                </Stack>
                            </Paper>
                        ))}


                        <Button onClick={addOption}>+ Add Option</Button>

                        {options.map((o, i) => (
                            <Paper key={i} sx={{ p: 0.5 }}>
                                <Stack direction="row" spacing={0.1}>
                                    <TextField
                                        label="Option Name"
                                        value={o.name}
                                        onChange={(e) => handleOptionChange(i, "name", e.target.value)}
                                    />

                                    <TextField
                                        label="Price"
                                        type="number"
                                        value={o.price}
                                        onChange={(e) => handleOptionChange(i, "price", Number(e.target.value))}
                                    />

                                    <Button color="error" onClick={() => removeOption(i)}>
                                        Remove
                                    </Button>
                                </Stack>
                            </Paper>
                        ))}

                        <TextField
                            select
                            label="Is Available"
                            fullWidth
                            required
                            value={form.isAvailable}
                            onChange={(e) => setForm({ ...form, isAvailable: e.target.value === 'true' || (e.target.value as any) === true })}
                        >
                            <MenuItem value={true as any}>Available</MenuItem>
                            <MenuItem value={false as any}>Unavailable</MenuItem>
                        </TextField>


                        <Button onClick={handleCreate} variant="contained" size="large" sx={{
                            bgcolor: '#D52B1E',
                            color: 'white',
                            fontWeight: 'bold',
                            py: 0.5,
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