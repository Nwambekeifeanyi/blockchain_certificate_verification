import { Router } from "express";
import pageCont from "../controllers/pageCont.js";
import { checkUserLogout } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", checkUserLogout, pageCont.getHome);
router.get("/login", checkUserLogout, pageCont.getLogin);
router.get("/register", checkUserLogout, pageCont.getRegister);

export default router;
