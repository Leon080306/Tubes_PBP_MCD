import { Router } from "express";
import { createCategory, deleteCategory, getAllCategory, getCategoryById, updateCategory } from "../controller/categoryController";

const router : Router = Router();

router.get('/', getAllCategory);
router.get('/:category_id', getCategoryById);
router.post('/create', createCategory);
router.put('/:category_id', updateCategory);
router.delete('/:category_id', deleteCategory);

export default router;