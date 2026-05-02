import { Router } from "express";
import { createOrder, getAllOrder, getTOrderById, updateOrder } from "../controller/orderController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const router: Router = Router();

router.get('/', authMiddleware, roleMiddleware("Admin"), getAllOrder);
router.post('/', createOrder);
router.get('/:order_id', authMiddleware, roleMiddleware("Admin"), getTOrderById);
router.put('/:order_id', authMiddleware, roleMiddleware("Admin"), updateOrder);

export default router;