import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import StaffRoutes from "./StaffRoutes"
import MenuAdminRoutes from "./MenuAdminRoutes";
import staffRoutes from "./StaffRoutes"
import menuRoutes from "./MenuAdminRoutes";
import orderRoutes from "./OrderRoutes"


const router: Router = Router();

// Public
//router.use("/auth", AuthenticationRoutes);

// Private
//router.use("/tableInformation", authMiddleware, TableInformationRoutes)
//router.use("/staff", authMiddleware, StaffRoutes);
router.use("/staff", StaffRoutes);
router.use("/menu", MenuAdminRoutes);
router.use("/staff", staffRoutes);
router.use("/order", orderRoutes);

export default router; 