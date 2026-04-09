import { Router } from "express";
import { getAllStaff, getOneStaff, loginStaff } from "../controller/staffController";
import { authMiddleware } from '../middlewares/authMiddleware';

const router : Router = Router();

router.get('/all', getAllStaff);
router.get('/me', authMiddleware, getOneStaff);
router.post('/login', loginStaff);

export default router;