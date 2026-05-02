import { Request, Response, NextFunction } from "express";

type AllowedRole = "Admin" | "Cashier";

export const roleMiddleware = (...allowedRoles: AllowedRole[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = (req as any).user;

            if (!user) {
                return res.status(401).json({
                    message: "Unauthorized: no user info found",
                });
            }

            if (!allowedRoles.includes(user.role)) {
                return res.status(403).json({
                    message: `Forbidden: requires one of [${allowedRoles.join(", ")}]`,
                });
            }

            next();
        } catch (error) {
            return res.status(500).json({ message: "Role check failed" });
        }
    };
};