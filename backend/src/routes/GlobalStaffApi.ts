import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import StaffRoutes from "./StaffRoutes"
import MenuAdminRoutes from "./MenuAdminRoutes";
import OrderRoutes from "./OrderRoutes"
import UserRoutes from "./UserRoutes"
import CategoryRoutes from "./CategoryRoutes"
import { verifyResetToken } from "../controller/userController";


const router: Router = Router();

router.get("/user/verify-reset-token", verifyResetToken);
router.use("/user", UserRoutes);

// router.use(authMiddleware);
router.use("/staff", authMiddleware, StaffRoutes);
router.use("/admin/menu", authMiddleware, MenuAdminRoutes);
router.use("/order", OrderRoutes);
router.use("/category", CategoryRoutes);

export default router; 