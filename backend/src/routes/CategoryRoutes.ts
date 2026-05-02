import { Router } from "express";
import { createCategory, deleteCategory, getAllCategory, getCategoryById, updateCategory } from "../controller/categoryController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router: Router = Router();

router.get('/', getAllCategory);
router.get('/:category_id', getCategoryById);
router.post('/create', authMiddleware, createCategory);
router.put('/:category_id', authMiddleware, updateCategory);
router.delete('/:category_id', authMiddleware, deleteCategory);

export default router;