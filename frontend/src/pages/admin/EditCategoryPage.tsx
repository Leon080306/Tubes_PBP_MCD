import { useEffect, useState } from "react";
import {
    Container, Typography, TextField, Button,
    Paper, Stack, Box, CircularProgress
} from "@mui/material";
import { useNavigate, useParams } from "react-router";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import NavBar from "./NavBarAdmin";

export default function EditCategoryPage() {
    const navigate = useNavigate();
    const { category_id } = useParams();

    const [form, setForm] = useState({
        name: '',
        sort_order: '' as any
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategoryDetail = async () => {
            try {
                const response = await fetch(`/api/category/${category_id}`,{
                    method: "GET"
                });
                const result = await response.json();
                console.log("Isi Paket dari Backend:", result);

                if (result.status === "Success") {
                    setForm({
                        name: result.data.name,
                        sort_order: result.data.sort_order
                    })
                }
            } catch (error) {
                console.error("Gagal ambil detail category:", error);
                alert("Data category tidak ditemukan");
                navigate("/category");
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryDetail();
    }, [category_id, navigate]);

    const handleUpdate = async () => {
        if (!form.name || form.sort_order === '') {
            alert("Tidak Boleh Kosong");
            return;
        }
        try {
            
            const response = await fetch(`/api/category/${category_id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: form.name, sort_order: form.sort_order,  })
            });

            const result = await response.json();

            if (response.ok) {
                alert("Data Category berhasil di-update!");
                navigate("/category");
            } else {
                alert(result.message || "Gagal Update")
            }
        } catch (error) {
            console.error("Update error:", error);
            alert("Gagal mengupdate data");
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', bgcolor: '#f8f9fa' }}>
                <CircularProgress sx={{ color: '#FDC82F' }} />
            </Box>
        );
    }

    return (
        <Box>
            <NavBar />
            <Container maxWidth="sm" sx={{ py: 8 }}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate("/category")}
                    sx={{ mb: 2, color: '#D52B1E', fontWeight: 'bold', textTransform: 'none' }}
                >
                    Back to Category List
                </Button>

                <Paper elevation={4} sx={{ p: 4, borderRadius: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1, color: '#D52B1E' }}>
                        Edit Category
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 4, color: 'text.secondary' }}>
                        Update Category
                    </Typography>


                    <Stack spacing={3}>

                        <TextField
                            label="Category ID"
                            fullWidth
                            value={category_id}
                            disabled
                            slotProps={{ input: { readOnly: true } }}

                        />

                        <TextField
                            label="Name"
                            fullWidth
                            required
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />

                        <TextField
                            label="Sort Order"
                            fullWidth
                            value={form.sort_order}
                            type="number"
                            onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
                        />

                        <Box sx={{ mt: 2 }}>
                            <Button
                                onClick={handleUpdate}
                                variant="contained"
                                size="large"
                                fullWidth
                                startIcon={<SaveIcon />}
                                sx={{ 
                                    bgcolor: '#D52B1E', 
                                    py: 1.5,
                                    fontWeight: 'bold',
                                    borderRadius: 2,
                                    '&:hover': { bgcolor: '#b32419' }
                                }}
                            >
                                Save Changes
                            </Button>
                        </Box>
                    </Stack>

                </Paper>
            </Container>
        </Box>
    )
}