import { Router } from "express";
import { getPackageByMenuId } from "../controller/packageController";

const router: Router = Router();

router.get('/:menu_id', getPackageByMenuId);

export default router;