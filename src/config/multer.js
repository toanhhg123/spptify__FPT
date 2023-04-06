const multer = require("multer");
const path = require("path");
const { v4 } = require("uuid");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public", file.fieldname));
  },
  filename: function (req, file, cb) {
    cb(null, v4() + "." + file.originalname.split(".").slice(-1));
  },
});

const uploadImg = multer({ storage });

module.exports = {
  uploadImg,
};
