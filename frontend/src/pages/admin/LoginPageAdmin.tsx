import { useState } from "react";
import { isEmail } from "../../utils/isEmail";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { authActions } from "../../redux/authSlice";
import "../../styles/LoginAdminStyles.css";
import { useNavigate } from "react-router";
import { AppBar } from "@mui/material";
import NavBar from "../admin/NavBarAdmin";
import Cookies from "js-cookie";

export default function LoginPageAdmin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const login = async () => {
        if (!isEmail(email)) {
            alert('Format email salah!');
            return;
        }

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { "content-type": "application/json"},
                body: JSON.stringify({email, password})
            });

            const data = await response.json();

            if (response.status != 200) {
                alert('Login Gagal: ' + (data.message || 'Cek email/password anda'));
                return;
            }

            const token = data.token;
            Cookies.set('token', token, { expires: 1}); //buat nyimpen tokennya

            const profileResponse = await fetch('/api/auth/me', {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "content-type": "application/json"
                }
            });
            const userData = await profileResponse.json();

            dispatch(authActions.setUserInfo(userData.user));

            alert('Login Berhasil!');
            navigate('/admin/login');

        } catch (error) {
            console.error("Fetch error:", error);
            alert('connection gagal');
        }
    }

    const handleForgotPassword = async () => {
        const emailTarget = prompt("Masukkan email anda untuk reset password");
        if (!emailTarget) {
            return;
        }

        try {
            const response = await fetch('/api/auth/forgot-password', {
                method:'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({email: emailTarget})
            });

            if (response.ok) {
                alert("Email reset password berhasil dikirim")
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
            <div className="login-container">
                <div className="login-card">
                    <h4>Login Form Admin</h4>
                    <div className="input-group">
                        <p>Email</p>
                        <input
                            type='text'
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
                    <button className="btn-login" onClick={login}>Login</button>

                    <p className="forgot-password" onClick={handleForgotPassword}>
                        Forgot Password?
                    </p>
                </div>
            </div>
        </>

    );
}