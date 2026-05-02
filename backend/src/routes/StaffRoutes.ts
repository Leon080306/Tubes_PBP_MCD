import { Router } from "express";
import { createStaff, deleteStaff, getAllStaff, getStaffById, updateStaff } from "../controller/staffController";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const router: Router = Router();

router.use(roleMiddleware("Admin"));

router.get('/', getAllStaff);
router.get('/:id', getStaffById);
router.post('/', createStaff)
router.put('/:id', updateStaff);
router.delete('/:id', deleteStaff)

export default router;