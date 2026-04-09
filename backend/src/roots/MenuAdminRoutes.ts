import { Router } from "express";
import { createMenu, getMenus, getMenuById, updateMenu, deleteMenu } from "../controller/menuCRUD";

const router = Router();

router.get("/", getMenus);
router.get("/:id", getMenuById);

router.post("/create", createMenu);

router.put("/:id", updateMenu);

router.delete("/:id", deleteMenu);


export default router;