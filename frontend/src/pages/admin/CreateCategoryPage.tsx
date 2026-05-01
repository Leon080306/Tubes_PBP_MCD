import { useState } from "react";
import { Container, Typography, TextField, Button, Paper, Stack, MenuItem, Box } from "@mui/material";
import { useNavigate } from "react-router";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NavBar from './NavBarAdmin';
import Cookies from 'js-cookie';

export default function CreateCategoryPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        sort_order: '' as any,
    });

    const handleCreate = async () => {
        if (!form.name || !form.sort_order) {
            alert("Tidak boleh kosong");
            return;
        }

        try {
            const token = Cookies.get('token');
            if (!token) {
                navigate("/admin/login");
                return;
            }
            
            const response = await fetch('/api/category/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                 },
                body: JSON.stringify(form)
            });

            if (response.ok) {
                alert("Category berhasil didaftarkan!");
                navigate("/category");
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
                    onClick={() => navigate("/category")}
                    sx={{ mb: 2, color: '#D52B1E', fontWeight: 'bold', textTransform: 'none' }}
                >
                    Back to Category List
                </Button>
                <Paper sx={{ p: 4, borderRadius: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>New Category</Typography>

                    {/* <form onSubmit={handleCreate}> */}
                        <Stack spacing={3}>
                            <TextField label="Name" fullWidth required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                            <TextField label="Sort Order" type="number" fullWidth required value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} />
                            
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
                            }}>Add Category</Button>
                        </Stack>
                    {/* </form> */}
                </Paper>
            </Container>
        </Box>
    )
}