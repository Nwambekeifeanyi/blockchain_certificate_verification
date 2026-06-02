import path from "path";
import multer from "multer";

// Storage configuration for videos
const storageSpace = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/video");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Multer configuration for video uploads
const video_handler = multer({
  storage: storageSpace,
  fileFilter: (req, file, callback) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (![".mp4", ".avi"].includes(ext)) {
      req.fileValidationError = "Invalid file extension";
      return callback(null, false);
    }
    callback(null, true);
  },
}).single("video");

export { video_handler };
