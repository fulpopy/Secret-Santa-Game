const multer = require("multer");

const upload = multer({ dest: "uploads/" });

const uploadMiddleware = upload.fields([
  { name: "employees" },
  { name: "prev-year-secret-santa" },
]);

module.exports = uploadMiddleware;
