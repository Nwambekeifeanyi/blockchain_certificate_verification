import path from "path";
import multer from "multer";

import fs from "fs";  
/**
 * Enhanced file filter for official credentials
 * Restricts uploads strictly to clean PDFs or high-resolution images
 */
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();

  if (file.fieldname === "certificateFile") {
    const allowedExtensions = [".pdf", ".jpg", ".jpeg", ".png"];
    
    if (!allowedExtensions.includes(ext)) {
      // Custom hook matching the client-side JavaScript error layout handling
      req.fileValidationError = "Invalid asset format. Only PDFs and clear image layers are accepted.";
      return cb(null, false);
    }
  }
  
  cb(null, true);
};

/**
 * Storage Engine Configuration
 * Organizes files into dedicated administrative directory structures
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = "public/certificates";
    
    // 2. Automatically generate the directories if they don't exist
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
    
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    // Generates a collision-resistant, timestamped indexing string signature
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(
      null,
      `CERT_${uniqueSuffix}${path.extname(file.originalname).toLowerCase()}`
    );
  },
});

/**
 * Finalized Multer Middleware Configuration
 * Plugs directly into your Express runtime routes
 */
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // Enforces a strict 10MB individual file size roof limit
  }
}).single("certificateFile"); // Uses .single() as we only expect one file attachment per upload request

export default upload;