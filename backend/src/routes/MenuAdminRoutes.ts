import { Router } from "express";
import { createMenu, getMenus, getMenuById, updateMenu, deleteMenu } from "../controller/menuCRUDController";
import { createUploadMiddleware } from "../middlewares/upload.middleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const menuAdminRouter: Router = Router();
const uploadMenu = createUploadMiddleware("menus");

menuAdminRouter.get("/", getMenus);
menuAdminRouter.get("/:id", getMenuById);
menuAdminRouter.post("/", roleMiddleware("Admin"), uploadMenu.single("image"), createMenu);
menuAdminRouter.put("/:id", roleMiddleware("Admin"), uploadMenu.single("image"), updateMenu);
menuAdminRouter.delete("/:id", roleMiddleware("Admin"), deleteMenu);


export default menuAdminRouter;