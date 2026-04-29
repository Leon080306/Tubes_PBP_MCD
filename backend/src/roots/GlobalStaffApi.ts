import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import StaffRoutes from "./StaffRoutes"
import MenuAdminRoutes from "./MenuAdminRoutes";
import OrderRoutes from "./OrderRoutes"
import UserRoutes from "./UserRoutes"
import CategoryRoutes from "./CategoryRoutes"


const router: Router = Router();

router.use("/user", UserRoutes);
router.use("/staff", StaffRoutes)
router.use("/menu", MenuAdminRoutes);
router.use("/order", OrderRoutes);
router.use("/category", CategoryRoutes);

export default router; 