import bcrypt from "bcrypt";
import crypto from "crypto";
import fs from "fs";
import Certificate from "../models/certificate.js";
import Forgged from "../models/forgged.js";
import path from "path";

export default {
      getHome: (req,res)=>{
            const context = {
          
            }
            res.render('./pageViews/home.ejs', {context});
      },
      getLogin: (req,res)=>{
            const context = {
          
            }
            res.render('./pageViews/login.ejs', {context});
      },
      getRegister: (req,res)=>{

            const context = {
          
            }
            
            res.render('./pageViews/register.ejs', {context})
      },
      getVerify: (req,res)=>{

            const context = {
          
            }
            
            res.render('./pageViews/verify.ejs', {context})
      },


      postVerifyCertificate : async (req, res) => {
 try {
        // 1. Catch Multer validation errors passed from your public middleware route
        if (req.fileValidationError) {
            return res.status(400).json({ error: req.fileValidationError });
        }

        const { matricNumber } = req.body;
        const uploadedFile = req.file;

        // 2. Pre-flight Check: Ensure the user provided at least one verification vector
        if (!matricNumber && !uploadedFile) {
            return res.status(400).json({ 
                error: "Please provide a matriculation number or upload a certificate file to run verification." 
            });
        }

        // =================================================================
        // METHOD 1: VERIFICATION VIA MATRICULATION NUMBER ONLY
        // =================================================================
        if (matricNumber && !uploadedFile) {
            const record = await Certificate.findOne({ 
                matricNumber: matricNumber.toUpperCase().trim() 
            });
            
            if (!record) {
                return res.status(404).json({ 
                    error: "Verification Failed. No record matches this Matriculation Number in our registry." 
                });
            }

            return res.status(200).json({
                success: "Authentic Ledger Record Located.",
                data: { 
                    fullName: record.fullName, 
                    matricNumber: record.matricNumber,
                    department: record.department 
                }
            });
        }

        // =================================================================
        // METHOD 2: VERIFICATION VIA DIGITAL FILE INTEGRITY MATCHING
        // =================================================================
        if (uploadedFile) {
            // Compute the SHA-256 cryptographic fingerprint
            const verifyBuffer = fs.readFileSync(uploadedFile.path);
            const hashSum = crypto.createHash("sha256");
            hashSum.update(verifyBuffer);
            const computedVerifyHash = hashSum.digest("hex");

            // Debug prints to system terminal console
            console.log("========================================");
            console.log("PUBLIC VERIFICATION LOG:");
            console.log("File Checked:", uploadedFile.originalname);
            console.log("Size:", uploadedFile.size, "bytes");
            console.log("SHA-256 Hash:", computedVerifyHash);
            console.log("========================================");

            // Query strictly by the unique fileHash signature
            const verifiedRecord = await Certificate.findOne({ fileHash: computedVerifyHash });

            // 🚨 FORGERY TRACKING HOOK: Execution catches an illegitimate document
            if (!verifiedRecord) {
                const forgeFolder = path.join(process.cwd(), "public", "forgeries");
                
                let calculatedName, calculatedDept
              if (matricNumber) {
        const thisUser = await Certificate.findOne({ matric_number: matricNumber });

        // Only map values if the database actually returns a valid object (not null!)
        if (thisUser) {
            calculatedName =  thisUser.full_name || calculatedName;
            calculatedDept = thisUser.department || calculatedDept;
        }
    }
                // Automatically build the forgeries directory architecture if missing
                if (!fs.existsSync(forgeFolder)) {
                    fs.mkdirSync(forgeFolder, { recursive: true });
                }

                // Relocate the suspicious file out of temporary storage into the permanent forgery bucket
                const secureForgeFileName = `FORGE_${Date.now()}_${uploadedFile.filename || uploadedFile.originalname}`;
                const destinationForgePath = path.join(forgeFolder, secureForgeFileName);
                
                // Copy the file out to the new home destination
                fs.renameSync(uploadedFile.path, destinationForgePath);

                // Commit the security incident context directly to your Forgged collection schema
                const logForgeryIncident = new Forgged({
                    fullName: calculatedName || "Unknown/Altered Input Layer",
                    matricNumber: matricNumber ? matricNumber.toUpperCase().trim() : "NOT_PROVIDED",
                    department: calculatedDept || "Suspicious Node Vector",
                    certificate: `public/forgeries/${secureForgeFileName}`, // Saved path reference to view fakes
                    fileHash: computedVerifyHash, 
                    regDate: new Date()
                });

                await logForgeryIncident.save();

                return res.status(401).json({ 
                    error: "Verification Invalid. The document's cryptographic hash does not match any official record. Incident flagged, tracked, and stored on security logs." 
                });
            }

            // --- VALID RECORD SUBMISSION PATHWAYS ---
            // If the certificate is authentic, delete the verification temp file copies instantly
            if (fs.existsSync(uploadedFile.path)) {
                fs.unlinkSync(uploadedFile.path);
            }

            return res.status(200).json({
                success: "Cryptographic Certificate Authenticity Verified Successfully.",
                data: {
                    fullName: verifiedRecord.fullName || verifiedRecord.full_name,
                    matricNumber: verifiedRecord.matricNumber || verifiedRecord.matric_number,
                    department: verifiedRecord.department
                }
            });
        }

    } catch (error) {
        // Safe check using native catch blocks to avoid recursive throwing
        try {
            if (req.file && req.file.path && fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path);
            }
        } catch (cleanupError) {
            console.error("Secondary error during file asset deletion:", cleanupError);
        }
        
        console.error("Public Verification execution fault:", error);
        return res.status(500).json({ error: error.message || "System failure encountered during verification routing." });
    }
    }
}

// /export default pageCont;