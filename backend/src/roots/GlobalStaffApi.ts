import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import StaffRoutes from "./StaffRoutes"
import MenuAdminRoutes from "./MenuAdminRoutes";
import menuRoutes from "./MenuAdminRoutes";
import OrderRoutes from "./OrderRoutes"
import UserRoutes from "./UserRoutes"


const router: Router = Router();

// Public
//router.use("/auth", AuthenticationRoutes);

// Private
//router.use("/tableInformation", authMiddleware, TableInformationRoutes)
//router.use("/staff", authMiddleware, StaffRoutes);
router.use("/user", UserRoutes);
router.use("/staff", StaffRoutes)
router.use("/menu", MenuAdminRoutes);
router.use("/order", OrderRoutes);

export default router; 