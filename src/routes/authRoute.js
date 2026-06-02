import { Router } from "express";
import authCont from "../controllers/authCont.js";

const router = Router();

router.post("/admin-login", authCont.adminLogin);
router.post("/admin-registration", authCont.adminRegistration);
router.get("/admin-logout", authCont.AdminLogout);

router.post("/user-login", authCont.userLogin);
router.post("/registration", authCont.userRegistration);
router.get("/user-logout", authCont.userLogout);

export default router;
