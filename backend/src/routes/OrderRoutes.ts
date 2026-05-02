import { Router } from "express";
import { createOrder, getAllOrder, getTOrderById, updateOrder } from "../controller/orderController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router: Router = Router();

router.get('/', authMiddleware, getAllOrder);
router.post('/', createOrder);
router.get('/:order_id', getTOrderById);
router.put('/:order_id', authMiddleware, updateOrder);

export default router;