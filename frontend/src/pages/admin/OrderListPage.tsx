import { useEffect, useState } from "react";
import NavBar from "../admin/NavBarAdmin";
import type { Order, MenuVarian, MenuOption } from "../../type";
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router";

export default function OrderListPage() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState<Record<string, Order[]>>({});
    const [loading, setLoading] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    const [detailOrderId, setDetailOrderId] = useState<string | null>(null);
    const [selectedOrderId, setSelectedOrderId] = useState('');
    const [orderNo, setOrderNo] = useState<number | string>('');
    const [orderType, setOrderType] = useState('');
    const [totalHarga, setTotalHarga] = useState<number>(0);
    const [status, setStatus] = useState('');

    const fetchOrders = async () => {
        try {
            const token = Cookies.get('token');
            if (!token) {
                navigate("/admin/login");
                return;
            }
            const response = await fetch("/api/order/", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const dataOrder = await response.json();

            if (response.status === 200) {
                const grouped = dataOrder.reduce((acc: any, current: Order) => {
                    const date = current.waktu_pesanan.substring(0, 10);
                    if (!acc[date]) {
                        acc[date] = [];
                    }
                    acc[date].push(current);
                    return acc;
                }, {} as Record<string, Order[]>);
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

    const handleDetailClick = (id: string) => {
        setDetailOrderId(detailOrderId === id ? null : id);
    }

    const handleEdit = (order: Order) => {
        setSelectedOrderId(order.order_id);
        setOrderNo(order.order_no);
        setOrderType(order.order_type);
        setTotalHarga(order.total_harga);
        setStatus(order.status);
        setOpenEdit(true);
    }

    const handleSave = async () => {
        try {
            const token = Cookies.get('token');
            console.log("ID yang mau diupdate:", selectedOrderId);
            const response = await fetch(`/api/order/${selectedOrderId}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    order_no: orderNo,
                    order_type: orderType,
                    status: status
                })
            });

            const dataOrder = await response.json();
            if (response.status != 200) {
                alert("Gagal Update: " + (dataOrder.message || "Terjadi Kesalahan"));
                return;
            }

            alert("Data Order berhasil di upadate!");
            setOpenEdit(false);
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
                                        sx={{
                                            borderLeft: `8px solid ${statusColor(order.status)}`,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'stretch',
                                            width: '100%',
                                            overflow: 'hidden',
                                            mb: 2,
                                            borderRadius: '16px',
                                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                                            transition: 'transform 0.2s',
                                            '&:hover': { transform: 'translateX(8px)' }
                                        }}>

                                        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

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

                                                <IconButton onClick={() => handleDetailClick(order.order_id)} sx={{ bgcolor: '#f5f5f5', ml: 1 }}>
                                                    {detailOrderId === order.order_id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                                </IconButton>
                                            </Stack>
                                        </Box>

                                        {detailOrderId === order.order_id && (
                                            <Box>
                                                <Divider />
                                                <Box sx={{ p: 3, bgcolor: '#fafafa' }}>
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2, color: '#666' }}>
                                                        Menu Details:
                                                    </Typography>

                                                    <Stack spacing={1.5}>
                                                        {order.orderMenus?.map((item: any, id) => {
                                                            const menuData = item.menus;
                                                            const variantData = item.mvs;

                                                            let totalHargaAllOptions = 0;
                                                            item.options?.forEach((opts: any) => {
                                                                totalHargaAllOptions += (opts.menuOption?.tambahan_harga || 0);
                                                            });

                                                            const hargaVariantMenu = variantData?.harga_tambahan || 0;
                                                            const totalHargaSatuan = item.harga_awal + hargaVariantMenu + totalHargaAllOptions;

                                                            const quantity = item.quantity || 1;
                                                            const totalHarga = totalHargaSatuan * quantity;

                                                            return (

                                                                <Box key={id} sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', mb: 0.5 }}>
                                                                        <Typography sx={{ fontWeight: 'bold', fontSize: '14px' }}>
                                                                            {menuData?.nama} {quantity > 1 ? `(x${quantity})` : ''}
                                                                        </Typography>

                                                                        <Typography sx={{ fontWeight: 'bold', color: '#D52B1E' }}>
                                                                            Rp {totalHarga.toLocaleString()}
                                                                        </Typography>
                                                                    </Box>

                                                                    <Box sx={{ pl: 1, mt: 0.5, borderLeft: '2px solid #e0e0e0', display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                            <Typography variant="caption" color="textSecondary">Harga Awal</Typography>
                                                                            <Typography variant="caption" color="textSecondary">Rp {item.harga_awal.toLocaleString()}</Typography>
                                                                        </Box>


                                                                        {variantData && (
                                                                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                                <Typography variant="caption" color="textSecondary">+ {variantData?.nama_varian}</Typography>
                                                                                <Typography variant="caption" color="textSecondary">Rp {hargaVariantMenu.toLocaleString()}</Typography>
                                                                            </Box>
                                                                        )}

                                                                        {item.options?.map((opt: any, index: number) => (
                                                                            <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                                <Typography variant="caption" color="textSecondary">
                                                                                    {/* PASTIKAN INI opt.menuOption (Sesuai as di backend) */}
                                                                                    + {opt.menuOption?.nama_option}
                                                                                </Typography>
                                                                                <Typography variant="caption">
                                                                                    {/* PASTIKAN INI tambahan_harga (Pakai 'an') */}
                                                                                    Rp {opt.menuOption?.tambahan_harga?.toLocaleString()}
                                                                                </Typography>
                                                                            </Box>
                                                                        ))}
                                                                        {/* {item.mod && (
                                                                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                                <Typography variant="caption" color="textSecondary">+ {optionData?.nama_option}</Typography>
                                                                                <Typography variant="caption" color="textSecondary">Rp {hargaOptionMenu.toLocaleString()}</Typography>
                                                                            </Box>
                                                                        )} */}
                                                                    </Box>

                                                                </Box>
                                                            )
                                                        })}
                                                    </Stack>
                                                </Box>
                                            </Box>
                                        )}
                                    </Paper>
                                ))}
                            </Stack>
                        </Box>
                    ))
                )}

                <Dialog open={openEdit} onClose={() => setOpenEdit(false)} sx={{
                    "& .MuiDialog-paper": {
                        borderRadius: 4,
                        p: 1
                    }
                }}>
                    <DialogTitle sx={{ fontWeight: 'bold' }}>Update Order Status</DialogTitle>
                    <DialogContent sx={{ minWidth: 350, pt: 3, display: 'flex', flexDirection: 'column', gap: 3, overflow: 'visible' }}>
                        <TextField label="Order Number" fullWidth value={orderNo} onChange={(e) => setOrderNo(e.target.value)} sx={{ mt: 1 }} />

                        <FormControl fullWidth>
                            <InputLabel>Order Type</InputLabel>
                            <Select value={orderType} label="Order Type" onChange={(e) => setOrderType(e.target.value)}>
                                <MenuItem value="Dine-in">Dine-in</MenuItem>
                                <MenuItem value="Takeaway">Takeaway</MenuItem>
                            </Select>
                        </FormControl>

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
                        <Button onClick={() => setOpenEdit(false)} color="inherit">Cancel</Button>
                        <Button onClick={handleSave} variant="contained" sx={{ bgcolor: '#D52B1E', borderRadius: 2, px: 4 }}>
                            Update
                        </Button>
                    </DialogActions>
                </Dialog>

            </Container>
        </Box>
    )
}