import { Router } from 'express';
import { menuController } from '../controller/menuController';

const menuRouter: Router = Router();

menuRouter.get("/", menuController.getAll);
menuRouter.get("/:id", menuController.getById);
menuRouter.get('/:menu_id/recommendations', menuController.getRecommendation);

export default menuRouter;