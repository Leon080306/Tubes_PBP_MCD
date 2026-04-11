import { Router } from "express";
import { getAllOrder, getTOrderById, updateOrder } from "../controller/orderController";

const router : Router = Router();

router.get('/', getAllOrder);
router.get('/:id', getTOrderById);
router.put('/:id', updateOrder);

export default router;