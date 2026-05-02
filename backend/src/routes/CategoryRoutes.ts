import { Router } from "express";
import { createCategory, deleteCategory, getAllCategory, getCategoryById, updateCategory } from "../controller/categoryController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const router: Router = Router();

router.get('/', getAllCategory);
router.get('/:category_id', getCategoryById);
router.post('/create', authMiddleware, roleMiddleware("Admin"), createCategory);
router.put('/:category_id', authMiddleware, roleMiddleware("Admin"), updateCategory);
router.delete('/:category_id', authMiddleware, roleMiddleware("Admin"), deleteCategory);

export default router;