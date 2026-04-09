import { useNavigate } from "react-router";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { authActions } from "../../redux/authSlice";
import logoMcD from '../../assets/logo_mcd.png';
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

export default function NavBar() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const userInfo = useAppSelector(state => state.auth.userInfo);

    const handleLogout = () => {
        dispatch(authActions.logout());
        alert("Berhasil logout");
        navigate('/admin/login');
    }

    return (
        <AppBar position="static" sx={{ mb: 4, backgroundColor: "#D52B1E" }}>
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
                    <Typography variant="h5" gap={20} sx={{ fontStyle: 'italic', whiteSpace: 'nowrap', ml: '25px' }}>
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
                        <Button sx={{ backgroundColor: "#FDC82F", color: 'white', boxShadow: 3 }} onClick={() => navigate('/')}>Update Menu</Button>
                        <Button sx={{ backgroundColor: "#FDC82F", color: 'white', boxShadow: 3 }} onClick={() => navigate('/post')}>List order</Button>

                        <Button
                            variant="contained"
                            sx={{ backgroundColor: "#FDC82F", color: 'white', boxShadow: 3 }}
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