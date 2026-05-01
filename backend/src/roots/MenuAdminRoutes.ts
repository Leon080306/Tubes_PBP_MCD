import { Router } from "express";
import { createMenu, getMenus, getMenuById, updateMenu, deleteMenu } from "../controller/menuCRUDController";
import { createUploadMiddleware } from "../middlewares/upload.middleware";

const menuAdminRouter: Router = Router();
const uploadMenu = createUploadMiddleware("menus");

menuAdminRouter.get("/", getMenus);
menuAdminRouter.get("/:id", getMenuById);

menuAdminRouter.post("/", uploadMenu.single("image"), createMenu);

menuAdminRouter.put("/:id", uploadMenu.single("image"), updateMenu);

menuAdminRouter.delete("/:id", deleteMenu);


export default menuAdminRouter;