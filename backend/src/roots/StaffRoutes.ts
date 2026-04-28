import { Router } from "express";
import { createStaff, deleteStaff, getAllStaff, getStaffById, updateStaff } from "../controller/staffController";

const router : Router = Router();

router.get('/', getAllStaff);
router.get('/:id',getStaffById);
router.post('/', createStaff)
router.put('/:id', updateStaff);
router.delete('/:id', deleteStaff)

export default router;