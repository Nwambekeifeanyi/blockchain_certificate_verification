import { Router } from "express";
import authCont from "../controllers/authCont.js";
import { checkAdmin } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/admin-login", checkAdmin, authCont.adminLogin);
router.post("/admin-registration", checkAdmin, authCont.adminRegistration);
router.get("/admin-logout", checkAdmin, authCont.AdminLogout);

export default router;
