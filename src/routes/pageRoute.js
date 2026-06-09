import { Router } from "express";
import pageCont from "../controllers/pageCont.js";
import { checkAdminLogout, checkUserLogout } from "../middlewares/authMiddleware.js";
import upload from "../helpers/img_processor.js";

const router = Router();

router.get("/", pageCont.getHome);
router.get("/login", checkAdminLogout, pageCont.getLogin);
router.get("/register", checkAdminLogout, pageCont.getRegister);
router.get("/verify", pageCont.getVerify);
router.post("/verify", upload, pageCont.postVerifyCertificate);

export default router;
