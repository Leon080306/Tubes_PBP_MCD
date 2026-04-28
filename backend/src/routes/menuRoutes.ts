import { Router } from 'express';
import { menuController } from '../controller/menuController';
import { uploadMiddleware } from '../middlewares/imageUploadMiddleware';

const menuRouter: Router = Router();

menuRouter.get("/", menuController.getAll);
menuRouter.get("/:id", menuController.getById);

export default menuRouter;