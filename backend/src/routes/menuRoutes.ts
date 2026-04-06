import { Router } from 'express';
import { MenuController } from '../controllers/menu.controller';

const menuRouter = express.Router();

Router.get("/", menuRouter.getAll());
Router.get("/:id", menuRouter.getById());

export default router;