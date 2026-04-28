import { useState } from "react";
import { isEmail } from "../../utils/isEmail";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { authActions } from "../../redux/authSlice";
import "../../styles/LoginAdminStyles.css";
import { useNavigate } from "react-router";
import { AppBar, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import NavBar from "../admin/NavBarAdmin";
import Cookies from "js-cookie";
import type { UserInfo } from "../../type";

import bgLogin from "../../assets/bgMcd.jpeg";

export default function LoginPageAdmin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [popUpEmail, setPopUpEmail] = useState(false);
    const [emailForgotPw, setEmailForgotPw] = useState('');
    const [loadingForgot, setLoadingForgot] = useState(false);

    const login = async () => {
        if (!isEmail(email)) {
            alert('Format email salah!');
            return;
        }

        try {
            const response = await fetch('/api/user/login', {
                method: 'POST',
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.status != 200) {
                alert('Login Gagal: ' + (data.message || 'Cek email/password anda'));
                return;
            }

            const token = data.token;
            Cookies.set('token', token, { expires: 1 }); //buat nyimpen tokennya

            const profileResponse = await fetch('/api/user/me', {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "content-type": "application/json"
                }
            });
            const userData: { message: string, user: UserInfo } = await profileResponse.json();

            dispatch(authActions.setUserInfo(userData.user));

            alert('Login Berhasil!');
            if (userData.user.role === 'Admin') {
                navigate('/admin/');
            } else if (userData.user.role === 'Cashier') {
                navigate('/cashier/');
            } else {
                navigate('/');
            }

        } catch (error) {
            console.error("Fetch error:", error);
            alert('connection gagal');
        }
    }

    const handleSendForgotEmail = async () => {
        if (!isEmail(emailForgotPw)) {
            alert("Email salah")
            return;
        }

        try {
            const response = await fetch('/api/user/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: emailForgotPw })
            });

            if (response.ok) {
                alert("Email reset password berhasil dikirim ke: " + emailForgotPw);
                setPopUpEmail(false);
                setEmailForgotPw("");
            } else {
                alert("Gagal mengirim email")
            }
        } catch (error) {
            console.error("Error: ", error)
        }
    }

    return (
        <>
            <NavBar />
            <div className="login-container" style={{ backgroundImage: `url(${bgLogin})` }}>
                <div className="login-overlay">
                    <div className="login-card">
                        <Typography variant="h4" className="login-title">Login Form Staff</Typography>
                        <div className="input-group">
                            <p>Email</p>
                            <input
                                type='email'
                                value={email}
                                placeholder="Masukkan email..."
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <p>Password</p>
                            <input
                                type='password'
                                value={password}
                                placeholder="Masukkan password..."
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button className="btn-login" onClick={login}>Login Now</button>

                        <p className="forgot-password" onClick={() => setPopUpEmail(true)}>
                            Forgot Password?
                        </p>
                    </div>
                </div>
            </div>

            <Dialog
                open={popUpEmail}
                onClose={() => setPopUpEmail(false)}
                sx={{
                    "& .MuiDialog-paper": {
                        borderRadius: 4,
                        p: 1,
                        width: '100%',
                        maxWidth: 400
                    }
                }}
            >
                <DialogTitle sx={{ fontWeight: '800', color: '#D52B1E', textAlign:'center' }}>
                    Reset Password
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body2" sx={{ mb: 3, color: '#666' }}>
                        Silahkan masukkan email untuk reset password
                    </Typography>
                    <TextField
                        autoFocus
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="outlined"
                        value={emailForgotPw}
                        onChange={(e) => setEmailForgotPw(e.target.value)}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 3,
                                '&.Mui-focused fieldset': { borderColor: '#FDC82F' }
                            }
                        }}
                    />
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button
                        onClick={() => setPopUpEmail(false)}
                        sx={{ color: '#666', fontWeight: 'bold' }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSendForgotEmail}
                        variant="contained"
                        disabled={loadingForgot}
                        sx={{
                            bgcolor: '#D52B1E',
                            borderRadius: 2,
                            px: 4,
                            fontWeight: 'bold',
                            '&:hover': { bgcolor: '#b32419' }
                        }}
                    >
                        Send Link
                    </Button>
                </DialogActions>
            </Dialog>
        </>

    );
}