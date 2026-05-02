import { Router } from "express";
import {
    getOneUser,
    loginUser,
    forgotPassword,
    resetPassword,
    getAllUser
} from "../controller/userController";
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from "../middlewares/roleMiddleware";

const router: Router = Router();

router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

router.get('/', authMiddleware, roleMiddleware("Admin"), getAllUser);
router.get('/me', authMiddleware, getOneUser);

export default router;