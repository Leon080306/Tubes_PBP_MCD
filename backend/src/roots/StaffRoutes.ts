import { Router } from "express";
import { getAllStaff, getOneStaff, loginStaff, forgotPassword } from "../controller/staffController";
import { authMiddleware } from '../middlewares/authMiddleware';

const router : Router = Router();

router.get('/', getAllStaff);
router.get('/me', authMiddleware, getOneStaff);
router.post('/login', loginStaff);
router.post('/forgot-password', forgotPassword)

export default router;