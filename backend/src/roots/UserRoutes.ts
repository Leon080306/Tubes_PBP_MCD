import { Router } from "express";
import {
    getOneUser,
    loginUser,
    forgotPassword,
    resetPassword,
    getAllUser
} from "../controller/userController";
import { authMiddleware } from '../middlewares/authMiddleware';

const router: Router = Router();

router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

router.get('/', authMiddleware, getAllUser);
router.get('/me', authMiddleware, getOneUser);

export default router;