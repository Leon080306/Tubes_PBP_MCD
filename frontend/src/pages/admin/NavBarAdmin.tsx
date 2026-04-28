import { useNavigate } from "react-router";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { authActions } from "../../store/authSlice";
import logoMcD from '../../assets/logo_mcd.png';
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import Cookies from "js-cookie";
import { useEffect } from "react";

export default function NavBar() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const userInfo = useAppSelector(state => state.auth.userInfo);

    const token = Cookies.get('token');

    useEffect(() => {
        const getProfile = async () => {
            if (token && !userInfo) {
                try {
                    const response = await fetch('/api/user/me', {
                        method: 'GET',
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "content-type": "application/json"
                        }
                    });

                    const userData = await response.json();

                    if (response.status === 200 && userData.user) {
                        dispatch(authActions.setUserInfo(userData.user));
                    }

                } catch (error) {
                    console.log("error: ", error)
                }
            }
        };
        getProfile();
    }, [token, userInfo, dispatch])

    const handleLogout = () => {
        dispatch(authActions.logout());
        Cookies.remove('token')
        alert("Berhasil logout");
        navigate('/admin/login');
    }

    return (
        <AppBar position="static" sx={{ mb: 0, backgroundColor: "#D52B1E", boxShadow: 0 }}>
            <Toolbar>
                <Box
                    component='img'
                    src={logoMcD}
                    alt="McD Logo"
                    sx={{
                        height: 40,
                        cursor: 'pointer',
                        flexGrow: 0,
                    }}
                />

                {userInfo && (
                    <Typography sx={{ fontStyle: 'italic', whiteSpace: 'nowrap', ml: '25px', variant: "h5", gap: 20 }}>
                        Hi, {userInfo?.role}!!
                    </Typography>
                )}

                <Box sx={{ flexGrow: 1 }} />

                {userInfo && (
                    <Box sx={{
                        display: "flex",
                        alignItem: 'center',
                        gap: 2
                    }}>

                        {userInfo.role === 'Admin' && (
                            <>

                                <Button sx={{
                                    backgroundColor: "#FDC82F",
                                    color: 'white',
                                    boxShadow: 3,
                                    '&:hover': {
                                        backgroundColor: "#ffdb70",
                                        transform: 'translateY(-5px)',
                                        boxShadow: 6,
                                    }
                                }}
                                    onClick={() => navigate('/admin')}>
                                    List Menu
                                </Button>
                                <Button sx={{
                                    backgroundColor: "#FDC82F",
                                    color: 'white',
                                    boxShadow: 3,
                                    '&:hover': {
                                        backgroundColor: "#ffdb70",
                                        transform: 'translateY(-5px)',
                                        boxShadow: 6,
                                    }
                                }} onClick={() => navigate('/admin/orderList')}>
                                    List Order
                                </Button>
                                <Button sx={{
                                    backgroundColor: "#FDC82F",
                                    color: 'white',
                                    boxShadow: 3,
                                    '&:hover': {
                                        backgroundColor: "#ffdb70",
                                        transform: 'translateY(-5px)',
                                        boxShadow: 6,
                                    }
                                }} onClick={() => navigate('/admin/staffList')}>
                                    List Staff
                                </Button>
                            </>
                        )}

                        {userInfo.role === 'Cashier' && (
                            <Button sx={{
                                backgroundColor: "#FDC82F",
                                color: 'white',
                                boxShadow: 3,
                                '&:hover': {
                                    backgroundColor: "#ffdb70",
                                    transform: 'translateY(-5px)',
                                    boxShadow: 6,
                                }
                            }} onClick={() => navigate('/cashier/addOrder')}>
                                Add Order
                            </Button>
                        )}

                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#FDC82F",
                                color: 'white',
                                boxShadow: 3,
                                '&:hover': {
                                    backgroundColor: "#ffdb70",
                                    transform: 'translateY(-5px)',
                                    boxShadow: 6,
                                }
                            }}
                            size="small"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </Box>
                )}

                {/* {!userInfo && (
                    <Typography variant="h6" sx={{ color: 'white', fontWeight:'bold', fontStyle: 'italic'}}>
                        Login Page
                    </Typography>
                )} */}
            </Toolbar>
        </AppBar>
    );
}