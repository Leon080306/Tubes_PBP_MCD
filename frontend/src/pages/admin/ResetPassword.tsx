import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Typography, CircularProgress, Box } from "@mui/material";
import "../../styles/LoginAdminStyles.css";
import NavBar from "../admin/NavBarAdmin";
import { useResetPassword } from "../../hooks/useResetPassword";

import bgLogin from "../../assets/bgMcd.jpeg";

export default function ResetPassword() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token") ?? "";

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [tokenValid, setTokenValid] = useState<boolean | null>(null); // null = checking, true = valid, false = invalid

    const { resetPassword, loading, error } = useResetPassword();

    useEffect(() => {
        const verifyToken = async () => {
            if (!token) {
                setTokenValid(false);
                return;
            }

            try {
                const response = await fetch(`/api/user/verify-reset-token?token=${token}`);
                const data = await response.json();
                setTokenValid(response.ok && data.valid);
            } catch (err) {
                console.error("Verify token error:", err);
                setTokenValid(false);
            }
        };

        verifyToken();
    }, [token]);

    const handleReset = async () => {
        if (newPassword.length < 8) {
            alert("Password minimal 8 karakter");
            return;
        }
        if (newPassword !== confirmPassword) {
            alert("Password tidak sama");
            return;
        }

        const success = await resetPassword({ token, newPassword });
        if (success) {
            alert("Password berhasil direset! Silakan login.");
            navigate("/admin/login");
        }
    };

    // Loading state while verifying token
    if (tokenValid === null) {
        return (
            <>
                <NavBar />
                <div className="login-container" style={{ backgroundImage: `url(${bgLogin})` }}>
                    <div className="login-overlay">
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', gap: 2 }}>
                            <CircularProgress sx={{ color: 'white' }} />
                            <Typography>Memvalidasi token...</Typography>
                        </Box>
                    </div>
                </div>
            </>
        );
    }

    // Invalid / expired token
    if (!tokenValid) {
        return (
            <>
                <NavBar />
                <div className="login-container" style={{ backgroundImage: `url(${bgLogin})` }}>
                    <div className="login-overlay">
                        <div className="login-card">
                            <Typography variant="h4" className="login-title" sx={{ color: '#D52B1E' }}>
                                Token Tidak Valid
                            </Typography>
                            <Typography sx={{ textAlign: 'center', my: 2, color: '#666' }}>
                                Link reset password ini tidak valid atau sudah kadaluarsa.
                                Silakan minta link baru dari halaman login.
                            </Typography>
                            <button className="btn-login" onClick={() => navigate("/admin/login")}>
                                Kembali ke Login
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    // Valid token → show reset form
    return (
        <>
            <NavBar />
            <div className="login-container" style={{ backgroundImage: `url(${bgLogin})` }}>
                <div className="login-overlay">
                    <div className="login-card">
                        <Typography variant="h4" className="login-title">Reset Password</Typography>
                        <div className="input-group">
                            <p>New Password</p>
                            <input
                                type='password'
                                value={newPassword}
                                placeholder="Masukkan password baru..."
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <p>Confirm New Password</p>
                            <input
                                type='password'
                                value={confirmPassword}
                                placeholder="Masukkan ulang password baru..."
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
                        <button className="btn-login" onClick={handleReset} disabled={loading}>
                            {loading ? "Loading..." : "Save"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}