import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import StaffRoutes from "./StaffRoutes"
import menuRoutes from "./MenuAdminRoutes";


const router: Router = Router();

// Public
//router.use("/auth", AuthenticationRoutes);

// Private
//router.use("/tableInformation", authMiddleware, TableInformationRoutes)
//router.use("/staff", authMiddleware, StaffRoutes);
router.use("/staff", StaffRoutes);
router.use("/menu", menuRoutes);

export default router; 