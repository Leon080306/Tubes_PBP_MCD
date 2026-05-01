import { useState } from "react";
import { Container, Typography, TextField, Button, Paper, Stack, MenuItem, Box } from "@mui/material";
import { useNavigate } from "react-router";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NavBar from './NavBarAdmin';
import Cookies from 'js-cookie';

export default function CreateStaffPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        role: ''
    });

    const handleCreate = async () => {
        if (!form.name || !form.email || !form.password || !form.role) {
            alert("Tidak boleh kosong");
            return;
        }

        try {
            const token = Cookies.get('token');
            if (!token) {
                navigate("/admin/login");
                return;
            }
            const response = await fetch('/api/staff/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                 },
                body: JSON.stringify(form)
            });

            if (response.ok) {
                alert("Staff berhasil didaftarkan!");
                navigate("/admin/staffList");
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
                    onClick={() => navigate("/admin/staffList")}
                    sx={{ mb: 2, color: '#D52B1E', fontWeight: 'bold', textTransform: 'none' }}
                >
                    Back to Staff List
                </Button>
                <Paper sx={{ p: 4, borderRadius: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>Register New Staff</Typography>

                    {/* <form onSubmit={handleCreate}> */}
                        <Stack spacing={3}>
                            <TextField label="Name" fullWidth required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                            <TextField label="Email Address" type="email" fullWidth required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                            <TextField label="Password" type="password" fullWidth required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                            <TextField
                                select
                                label="Select Role"
                                fullWidth
                                required
                                value={form.role}
                                onChange={(e) => setForm({ ...form, role: e.target.value })}
                            >
                                <MenuItem value="Admin">Admin</MenuItem>
                                <MenuItem value="Cashier">Cashier</MenuItem>
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
                            }}>Register Staff</Button>
                        </Stack>
                    {/* </form> */}
                </Paper>
            </Container>
        </Box>
    )
}