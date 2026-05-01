import { useEffect, useState } from "react";
import {
    Container, Typography, TextField, Button,
    Paper, Stack, Box, CircularProgress
} from "@mui/material";
import { useNavigate, useParams } from "react-router";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import NavBar from "./NavBarAdmin";
import Cookies from 'js-cookie';

export default function EditStaffPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [form, setForm] = useState({
        name: '',
        email: '',
        role: ''
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStaffDetail = async () => {
            try {
                const token = Cookies.get('token');
                if (!token) {
                    navigate("/admin/login");
                    return;
                }
                const response = await fetch(`/api/staff/${id}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                const result = await response.json();
                console.log("Isi Paket dari Backend:", result);

                if (result.status === "Success") {
                    setForm({
                        name: result.data.name,
                        email: result.data.email,
                        role: result.data.role
                    })
                }
            } catch (error) {
                console.error("Gagal ambil detail staff:", error);
                alert("Data staff tidak ditemukan");
                navigate("/admin/staffList");
            } finally {
                setLoading(false);
            }
        };

        fetchStaffDetail();
    }, [id, navigate]);

    const handleUpdate = async () => {
        if (!form.name || !form.email) {
            alert("Tidak Boleh Kosong");
            return;
        }
        try {
            const token = Cookies.get('token');
            const response = await fetch(`/api/staff/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ email: form.email, name: form.name })
            });

            if (response.ok) {
                alert("Data staff berhasil di-update!");
                navigate("/admin/staffList");
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
                    onClick={() => navigate("/admin/staffList")}
                    sx={{ mb: 2, color: '#D52B1E', fontWeight: 'bold', textTransform: 'none' }}
                >
                    Back to Staff List
                </Button>

                <Paper elevation={4} sx={{ p: 4, borderRadius: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1, color: '#D52B1E' }}>
                        Edit Staff Profile
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 4, color: 'text.secondary' }}>
                        Update informasi email staff
                    </Typography>


                    <Stack spacing={3}>

                        <TextField
                            label="Staff ID"
                            fullWidth
                            value={id}
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
                            label="Role"
                            fullWidth
                            value={form.role}
                            disabled
                            slotProps={{ input: { readOnly: true } }}
                        />

                        <TextField
                            label="Email Address"
                            type="email"
                            fullWidth
                            required
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
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