const multer = require("multer");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "application/pdf" ||
    file.mimetype === "application/msword" || // .doc
    file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" // .docx
  ) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file type"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 10 }, // 10MB max
  fileFilter: fileFilter,
});

module.exports = upload;
