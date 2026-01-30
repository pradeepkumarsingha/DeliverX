const multer = require("multer");

const storage = multer.memoryStorage(); // 🔥 KEY CHANGE
const upload = multer({ storage });

module.exports = upload;
