import { Router } from "express";
import { createOrder, getAllOrder, getTOrderById, updateOrder } from "../controller/orderController";

const router: Router = Router();

router.get('/', getAllOrder);
router.post('/', createOrder);
router.get('/:order_id', getTOrderById);
router.put('/:order_id', updateOrder);

export default router;