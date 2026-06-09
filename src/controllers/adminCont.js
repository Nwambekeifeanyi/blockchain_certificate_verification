import Admin from "../models/admin.js";

import { regDate, time } from "../middlewares/date.js";
import Certificate from "../models/certificate.js";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import Forgged from "../models/forgged.js";
// import { Transaction } from "mongodb";

const adminCont = {
  getLogin: async (req, res) => {
    console.log(regDate);

    return res.render("./adminViews/login");
  },
  getRegistration: async (req, res) => {
    return res.render("./adminViews/register");
  },
  getDashboard: async (req, res) => {
    const admin_id = req.admin;
    const admin = await Admin.findOne({ _id: admin_id });

     const certificates = await Certificate.find().sort({_id: -1})
    const forgeries = await Forgged.find().sort({_id: -1})
   
    const context = {
      certificates,
      forgeries,
    };

    return res.render("./adminViews/dashboard", { context });
  },
  getAddCertificte: async (req, res) => {
    const admin_id = req.admin;
    const admin = await Admin.findOne({ _id: admin_id });

    
   
    const context = {
    };

    return res.render("./adminViews/add-certificate", { context });
  },
  getCertificates: async (req, res) => {
    const admin_id = req.admin;
    const admin = await Admin.findOne({ _id: admin_id });

    const certificates = await Certificate.find().sort({_id: -1})

    
    
    
   
    const context = {
     
      certificates
    };

    return res.render("./adminViews/certificates", { context });
  },
  getBlockedCertificates: async (req, res) => {
    const admin_id = req.admin;
    const admin = await Admin.findOne({ _id: admin_id });
  const forgeries = await Forgged.find().sort({_id: -1})
    
    
    
   
    const context = {
     
      forgeries
    };

    return res.render("./adminViews/blocked_certificates", { context });
  },


  adminUploadCertificate : async (req, res) => {
    try {
        // 1. Catch Multer validation errors passed through the request object
        if (req.fileValidationError) {
            return res.status(400).json({ error: req.fileValidationError });
        }

        // 2. Ensure a file asset was actually captured by the middleware
        if (!req.file) {
            return res.status(400).json({ error: "Please append the digital certificate file asset." });
        }

        const { fullName, matricNumber, department } = req.body;

        // 3. Robust validation check for textual field presence
        if (!fullName || !matricNumber || !department) {
            // Clean up uploaded file if fields are missing to prevent storage leaks
            fs.unlinkSync(req.file.path);
            return res.status(400).json({ error: "All profile payload fields are mandatory." });
        }

        // 4. Check if a certificate record already exists for this matric number
        const existingRecord = await Certificate.findOne({ matricNumber: matricNumber.toUpperCase().trim() });
        if (existingRecord) {
            fs.unlinkSync(req.file.path);
            return res.status(400).json({ error: "A certificate registry already exists for this Matriculation Number." });
        }

        // 5. Generate a Cryptographic SHA-256 Hash of the file buffer
        const fileBuffer = fs.readFileSync(req.file.path);
        const hashSum = crypto.createHash("sha256");
        hashSum.update(fileBuffer);
        const fileHash = hashSum.digest("hex"); // This acts as the file's immutable digital DNA


        // 🚨 ADD THIS FOR DEBUGGING:
console.log("========================================");
console.log("ADMIN UPLOAD LOG:");
console.log("File Name Saved:", req.file.filename);
console.log("Raw File Size on Disk:", fs.statSync(req.file.path).size, "bytes");
console.log("Generated SHA-256 Hash:", fileHash);
console.log("========================================");


        // 6. Persist records to the database registry
        const newCertificate = new Certificate({
            full_name: fullName.trim(),
            matric_number: matricNumber.toUpperCase().trim(),
            department,
            certificate: req.file.path,   // Reference path for download systems
            fileHash: fileHash,         // Saved hash signature for future verification
            regDate:new Date(),
        });

        await newCertificate.save();

        return res.status(200).json({ 
            success: "Certificate compiled and registered securely on the ledger." 
        });

    } catch (error) {
        // Fallback cleanup of uploaded assets on execution fault drops
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        console.error("Upload controller exception:", error);
        return res.status(500).json({ error: "Internal node failure during ledger serialization." });
    }
}

  

};

export default adminCont;
