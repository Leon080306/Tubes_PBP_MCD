import { useState } from "react";
import "../../styles/LoginAdminStyles.css";
import { useNavigate } from "react-router";
import { Box, Typography } from "@mui/material";
import NavBar from "./NavBarAdmin";
import bgLogin from "../../assets/bgMcd.jpeg";

export default function FormResetPassword() {
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleResetPassword = async () => {
        if (newPassword !== confirmPassword) {
            alert("Paswword tidak sesuai");
            return;
        }

        if (newPassword.length < 6) {
            alert("Password minimal 6 karakter")
        }

        try {
            const response = await fetch('...', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    password: newPassword
                })
            });

            if (response.ok) {
                alert("Password berhasil diubah");
                navigate('/admin/login')
            } else {
                const data = await response.json();
                alert("Gagal reset password: " + data.message)
            }
        } catch (error) {
            console.error("Error reset: ", error);
            alert("Terjadi kesalahan")
        }
    }

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#000' }}>
            <NavBar />
            <div className="login-container" style={{ backgroundImage: `url(${bgLogin})` }}>
                <div className="login-overlay">
                    <div className="login-card">
                        <Typography variant="h4" className="login-title" sx={{ mb: 10 }}>
                            New Password
                        </Typography>

                        <div className="input-group">
                            <p>Password Baru</p>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>

                        <div className="input-group">
                            <p>Konfirmasi Password</p>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <button className="btn-login" onClick={handleResetPassword} style={{ marginTop: '20px' }}>
                            Reset Password
                        </button>
                    </div>
                </div>
            </div>
        </Box>
    )
}