import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import {
    Container, Typography, Box, Paper, Button, Stack,
    IconButton, CircularProgress, Divider
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ListIcon from '@mui/icons-material/List';
import "../../styles/StaffStyles.css";
import type { Category } from "../../type";
import NavBar from "./NavBarAdmin";
import Cookies from 'js-cookie';

export default function CategoryPage() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const token = Cookies.get('token');
            const response = await fetch("/api/category/", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (Array.isArray(data)) {
                setCategories(data);
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchCategories(); }, []);

    const handleDelete = async (category_id: string) => {
        if (window.confirm("Apakah akan menghapus category ini?")) {
            const token = Cookies.get('token');
            await fetch(`/api/category/${category_id}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}` 
                }
            });
            fetchCategories();
        }
    }

    return (
        <Box>
            <NavBar />

            <div className="staff-layout">
                <Container maxWidth="md">
                    <Box className="header-section">
                        <Typography variant="h4" className="title">Menu Categories</Typography>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            className="add-btn"
                            onClick={() => navigate("/category/create")}
                        >
                            Add Category
                        </Button>
                    </Box>

                    <Paper elevation={3} className="list-container">
                        <Typography variant="h6" className="list-header">All Categories</Typography>
                        <Divider />

                        <Box className="scrollable-list">
                            {loading ? (
                                <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>
                            ) : categories.length === 0 ? (
                                <Typography align="center" sx={{ py: 10, color: '#999' }}>No category registered yet.</Typography>
                            ) : (
                                categories.map((c) => (
                                    <Box key={c.category_id} className="staff-item">
                                        <Stack sx={{ direction: "row", spacing: 2, alignItems: "center" }} >
                                            <Box sx={{ textAlign: 'left' }}>
                                                <Typography sx={{ fontWeight: '900', fontSize: "1.4rem", color: '#D52B1E', lineHeight: 1.2 }}>{c.name}</Typography>
                                                <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mt: 0.5 }}>
                                                    <Typography variant="body2" sx={{ color: "#666", fontWeight: "500" }}>Sort Order : {c.sort_order}</Typography>
                                                </Stack>
                                            </Box>
                                        </Stack>
                                        <Box>
                                            <IconButton onClick={() => navigate(`/category/edit/${c.category_id}`)} className="action-btn edit">
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(c.category_id)} className="action-btn delete">
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