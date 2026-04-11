import { Router } from "express";
import { createMenu, getMenus, getMenuById, updateMenu, deleteMenu } from "../controller/menuCRUDController";

const menuAdminRouter: Router = Router();

menuAdminRouter.get("/", getMenus);
menuAdminRouter.get("/:id", getMenuById);

menuAdminRouter.post("/", createMenu);

menuAdminRouter.put("/:id", updateMenu);

menuAdminRouter.delete("/:id", deleteMenu);


export default menuAdminRouter;