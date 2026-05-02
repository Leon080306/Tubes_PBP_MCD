import { Navigate } from "react-router";
import { useAppSelector } from "../hooks/useAppSelector";
import type { ReactNode } from "react";

type AllowedRole = "Admin" | "Cashier";

interface RouteGuardProps {
    children: ReactNode;
    allowed: AllowedRole[];
    redirectTo?: string;
}

const defaultRouteForRole = (role: AllowedRole): string => {
    switch (role) {
        case "Admin":
            return "/admin";
        case "Cashier":
            return "/cashier";
        default:
            return "/admin/login";
    }
};

export default function RouteGuard({
    children,
    allowed,
    redirectTo,
}: RouteGuardProps) {
    const { userInfo } = useAppSelector((state) => state.auth);

    if (!userInfo) {
        return <Navigate to="/admin/login" replace />;
    }

    if (!allowed.includes(userInfo.role)) {
        const fallback = redirectTo ?? defaultRouteForRole(userInfo.role);
        return <Navigate to={fallback} replace />;
    }

    return <>{children}</>;
}