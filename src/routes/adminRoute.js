import express from "express";
const router = express.Router();
import adminCont from "../controllers/adminCont.js";


import  upload  from "../helpers/img_processor.js";
import {
  checkAdmin,
  checkAdminLogout,
} from "../middlewares/authMiddleware.js";

router.get("/login", checkAdminLogout, adminCont.getLogin);
router.get("/register", checkAdminLogout, adminCont.getRegistration);


router.get("/dashboard", adminCont.getDashboard);
router.get("/certificates", adminCont.getCertificates);
router.get("/blocked-certificates", adminCont.getCertificates);


export default router;
// export const adminRoute = router;
