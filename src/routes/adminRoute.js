import express from "express";
const router = express.Router();
// import adminCont from "../controllers/adminCont.js";
import adminCont from "../controllers/adminCont.js";




import  upload  from "../helpers/img_processor.js";
import {
  checkAdmin,
  checkAdminLogout,
} from "../middlewares/authMiddleware.js";

router.get("/login", checkAdminLogout, adminCont.getLogin);
router.get("/register", checkAdminLogout, adminCont.getRegistration);


router.get("/dashboard", checkAdmin, adminCont.getDashboard);
router.get("/add-certificate",checkAdmin, adminCont.getAddCertificte);
router.get("/certificates", adminCont.getCertificates);
router.get("/blocked-certificates",checkAdmin, adminCont.getBlockedCertificates);


router.post("/upload-certificates", upload, adminCont.adminUploadCertificate);

export default router;
// export const adminRoute = router;
