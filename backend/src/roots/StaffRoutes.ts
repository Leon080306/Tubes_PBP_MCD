import { Router } from "express";
import { getAllStaff, loginStaff } from "../controller/staffController";

const router : Router = Router();

router.get('/all', getAllStaff);
router.post('/login', loginStaff);

export default router;