import { useEffect, useState } from "react";
import NavBar from "../admin/NavBarAdmin";
import type { OrderType } from "../../type";
import {
    Container, Typography, Box, Paper, Stack, Button,
    Chip, IconButton, Dialog, DialogTitle,
    DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem,
    CircularProgress, Divider, Avatar, TextField
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import PaidIcon from '@mui/icons-material/Paid';
import "../../styles/OrderListStyles.css";

export default function OrderListPage() {
    const [orders, setOrders] = useState<Record<string, OrderType[]>>({});
    const [loading, setLoading] = useState(false);
    const [openPopUp, setOpenPopUp] = useState(false);

    const [selectedOrderId, setSelectedOrderId] = useState('');
    const [orderNo, setOrderNo] = useState<number | string>('');
    const [orderType, setOrderType] = useState('');
    const [totalHarga, setTotalHarga] = useState<number>(0);
    const [status, setStatus] = useState('');

    const fetchOrders = async () => {
        try {
            const response = await fetch("/api/order/", {
                method: "GET"
            });
            const dataOrder = await response.json();

            if (response.status === 200) {
                const grouped = dataOrder.reduce((acc: any, current: OrderType) => {
                    const date = current.waktu_pesanan.substring(0, 10);
                    if (!acc[date]) {
                        acc[date] = [];
                    }
                    acc[date].push(current);
                    return acc;
                }, {} as Record<string, OrderType[]>);
                setOrders(grouped);
            } else {
                console.error("Gagal memuat orderan")
            }
        } catch (error) {
            console.error("Fetch error: ", error)
        }
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleEdit = (order: OrderType) => {
        setSelectedOrderId(order.order_id);
        setOrderNo(order.order_no);
        setOrderType(order.order_type);
        setTotalHarga(order.total_harga);
        setStatus(order.status);
        setOpenPopUp(true);
    }

    const handleClose = () => {
        setOpenPopUp(false);
    }

    const handleSave = async () => {
        try {
            const response = await fetch(`/api/order/${selectedOrderId}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    order_no: orderNo,
                    orderType: orderType,
                    total_harga: totalHarga,
                    status: status
                })
            });

            const dataOrder = await response.json();
            if (response.status != 200) {
                alert("Gagal Update: " + (dataOrder.message || "Terjadi Kesalahan"));
                return;
            }

            alert("Data Order berhasil di upadate!");
            setOpenPopUp(false);
            fetchOrders();
        } catch (error) {
            console.error("Update order error: ", error);
        }
    };

    const statusColor = (status: string) => {
        switch (status) {
            case "Done":
                return '#4caf50';
            case "Paid":
                return '#2196f3';
            case "Process":
                return '#ff9800';
            case "Canceled":
                return '#d32f2f';
            default:
                return '#9e9e9e';
        }
    }

    return (
        <Box className="order-container">
            <NavBar />

            <Container maxWidth="md">
                <Stack direction="row" spacing={2} sx={{ mb: 5, mt: 2, alignItems: "center" }}>
                    <Box sx={{
                        bgcolor: '#D52B1E',
                        p: 1.5,
                        borderRadius: 3,
                        display: 'flex'
                    }}>
                        <ReceiptLongIcon sx={{ color: 'white', fontSize: 30 }} />
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#D52B1E' }}>
                        List Order
                    </Typography>
                </Stack>

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                        <CircularProgress sx={{ color: '#FDC82F' }} />
                    </Box>
                ) : (
                    Object.keys(orders).sort().reverse().map((date) => (
                        <Box key={date} sx={{ mb: 6 }}>
                            <Divider textAlign="left" sx={{ mb: 3 }}>
                                <Chip
                                    label={`Date: ${date}`}
                                    sx={{ bgcolor: '#FDC82F', color: 'black', fontWeight: 'bold' }} />
                            </Divider>

                            <Stack spacing={2.5}>
                                {orders[date].map((order) => (
                                    <Paper
                                        key={order.order_id}
                                        className="order-card"
                                        sx={{ borderLeft: `8px solid ${statusColor(order.status)}` }}>

                                        <Stack direction="row" spacing={3} sx={{ alignItems: "center" }}>
                                            <Avatar sx={{ bgcolor: '#fff0f0', width: 56, height: 56 }}>
                                                <FastfoodIcon sx={{ color: '#D52B1E' }} />
                                            </Avatar>

                                            <Box>
                                                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                                    Order #{order.order_no}
                                                </Typography>

                                                <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
                                                    <Typography variant="body2" color="text.secondary">
                                                        <strong>{order.order_type}</strong>
                                                    </Typography>

                                                    <Stack direction="row" sx={{ alignItems: "center" }} spacing={0.5}>
                                                        <PaidIcon sx={{ fontSize: 16, color: '#4caf50' }} />
                                                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                                            Rp {order.total_harga.toLocaleString()}
                                                        </Typography>
                                                    </Stack>
                                                </Stack>
                                            </Box>
                                        </Stack>

                                        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                                            <Chip
                                                label={order.status.toUpperCase()}
                                                className="status-chip"
                                                sx={{ bgcolor: statusColor(order.status) }} />

                                            <IconButton onClick={() => handleEdit(order)} sx={{ bgcolor: '#f5f5f5' }}>
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                        </Stack>
                                    </Paper>
                                ))}
                            </Stack>
                        </Box>
                    ))
                )}

                <Dialog open={openPopUp} onClose={() => setOpenPopUp(false)} sx={{
                    "& .MuiDialog-paper": {
                        borderRadius: 4,
                        p: 1
                    }
                }}>
                    <DialogTitle sx={{ fontWeight: 'bold' }}>Update Order Status</DialogTitle>
                    <DialogContent sx={{ minWidth: 350, mt: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <TextField label="Order Number" fullWidth value={orderNo} onChange={(e) => setOrderNo(e.target.value)} />

                        <FormControl fullWidth>
                            <InputLabel>Order Type</InputLabel>
                            <Select value={orderType} label="Order Type" onChange={(e) => setOrderType(e.target.value)}>
                                <MenuItem value="Dine-in">Dine-in</MenuItem>
                                <MenuItem value="Takeaway">Takeaway</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField label="Total Harga" type="number" fullWidth value={totalHarga} onChange={(e) => setTotalHarga(Number(e.target.value))} />

                        <FormControl fullWidth>
                            <InputLabel>Status</InputLabel>
                            <Select value={status} label="Status" onChange={(e) => setStatus(e.target.value)}>
                                <MenuItem value="Cart">Cart</MenuItem>
                                <MenuItem value="Paid">Paid</MenuItem>
                                <MenuItem value="Process">Process</MenuItem>
                                <MenuItem value="Done">Done</MenuItem>
                                <MenuItem value="Canceled">Canceled</MenuItem>
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions sx={{ p: 3 }}>
                        <Button onClick={() => setOpenPopUp(false)} color="inherit">Cancel</Button>
                        <Button onClick={handleSave} variant="contained" sx={{ bgcolor: '#D52B1E', borderRadius: 2, px: 4 }}>
                            Update
                        </Button>
                    </DialogActions>
                </Dialog>

            </Container>
        </Box>
    )
}