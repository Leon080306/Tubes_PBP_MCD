import { Router } from "express";
import { getOneUser, loginUser, forgotPassword, getAllUser } from "../controller/userController";
import { authMiddleware } from '../middlewares/authMiddleware';

const router : Router = Router();

router.get('/', getAllUser);
router.get('/me', authMiddleware, getOneUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword)

export default router;