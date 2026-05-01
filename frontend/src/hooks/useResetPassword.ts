import { useState } from "react";

type ResetPasswordPayload = {
    token: string;
    newPassword: string;
};

export function useResetPassword() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const resetPassword = async ({ token, newPassword }: ResetPasswordPayload): Promise<boolean> => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/user/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, newPassword }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Gagal reset password");
                return false;
            }

            return true;
        } catch (err) {
            console.error("Reset password error:", err);
            setError("Connection gagal");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { resetPassword, loading, error };
}