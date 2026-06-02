import path from "path";
import multer from "multer";

// File filter for images and videos
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();

  if (file.fieldname === "image") {
    if (![".jpg", ".jpeg", ".png"].includes(ext)) {
      req.fileValidationError = "Invalid image file format";
      return cb(null, false);
    }
  } else if (file.fieldname === "video") {
    if (![".mp4", ".avi"].includes(ext)) {
      req.fileValidationError = "Invalid video file format";
      return cb(null, false);
    }
  }
  cb(null, true);
};

// Storage configuration for both images and videos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder =
      file.fieldname === "image" ? "public/images" : "public/videos";
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Multer configuration
const upload = multer({
  storage,
  fileFilter,
}).fields([
  { name: "image", maxCount: 1 },
  { name: "video", maxCount: 1 },
]);

export default upload;
