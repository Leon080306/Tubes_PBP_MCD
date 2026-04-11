import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import StaffRoutes from "./StaffRoutes"
import MenuAdminRoutes from "./MenuAdminRoutes";


const router: Router = Router();

// Public
//router.use("/auth", AuthenticationRoutes);

// Private
//router.use("/tableInformation", authMiddleware, TableInformationRoutes)
//router.use("/staff", authMiddleware, StaffRoutes);
router.use("/staff", StaffRoutes);
router.use("/menu", MenuAdminRoutes);

export default router; 