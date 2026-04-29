import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import {
    Container, Typography, Box, Paper, Button, Stack,
    IconButton, CircularProgress, Divider,
    Avatar
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// import PersonIcon from '@mui/icons-material/Person';
import "../../styles/StaffStyles.css";
import type { UserInfo } from "../../type";
import NavBar from "./NavBarAdmin";
import Cookies from 'js-cookie';

export default function StaffPage() {
    const navigate = useNavigate();
    const [staffs, setStaffs] = useState<UserInfo[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchStaff = async () => {
        setLoading(true);
        try {
            const token = Cookies.get('token');
            const response = await fetch("/api/staff/", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },

            });
            const data = await response.json();
            if (Array.isArray(data)) {
                setStaffs(data);
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchStaff(); }, []);

    const handleDelete = async (id: string) => {
        const token = Cookies.get('token');
        if (window.confirm("Apakah akan menghapus staff ini?")) {
            await fetch(`/api/staff/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            fetchStaff();
        }
    }

    return (
        <Box>
            <NavBar />

            <div className="staff-layout">
                <Container maxWidth="md">
                    <Box className="header-section">
                        <Typography variant="h4" className="title">Staff Management</Typography>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            className="add-btn"
                            onClick={() => navigate("/staff/create")}
                        >
                            Register New Staff
                        </Button>
                    </Box>

                    <Paper elevation={3} className="list-container">
                        <Typography variant="h6" className="list-header">All Active Staff</Typography>
                        <Divider />

                        <Box className="scrollable-list">
                            {loading ? (
                                <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>
                            ) : staffs.length === 0 ? (
                                <Typography align="center" sx={{ py: 10, color: '#999' }}>No staff registered yet.</Typography>
                            ) : (
                                staffs.map((s) => (
                                    <Box key={s.staff_id} className="staff-item">
                                        <Stack sx={{ direction: "row", spacing: 2, alignItems: "center" }} >
                                            <Box sx={{ textAlign: 'left' }}>
                                                <Typography sx={{ fontWeight: '900', fontSize: "1.4rem", color: '#D52B1E', lineHeight: 1.2 }}>{s.name}</Typography>
                                                <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mt: 0.5 }}>
                                                    <Typography variant="body2" sx={{ color: "#666", fontWeight: "500" }}>{s.email}</Typography>
                                                    <Typography sx={{ color: "#999", fontWeight: "0.8rem" }}> | </Typography>
                                                    <Typography sx={{ fontSize: "0.85rem", fontWeight: '700', color: '#D52B1E', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.role}</Typography>
                                                </Stack>
                                            </Box>
                                        </Stack>
                                        <Box>
                                            <IconButton onClick={() => navigate(`/staff/edit/${s.staff_id}`)} className="action-btn edit">
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(s.staff_id)} className="action-btn delete">
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                ))
                            )}
                        </Box>
                    </Paper>

                </Container>
            </div>
        </Box>
    )
}