const fs = require("fs");
const path = require("path");
const formidable = require("formidable");

const { v4 } = require("uuid");
const uploadFile = async (req) => {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      console.log(files);
      let oldPath = files.img.filepath;
      const fileName =
        v4() + "." + files.img.originalFilename.split(".").slice(-1);
      let newPath = path.join(__dirname, "../public", fileName);
      let rawData = fs.readFileSync(oldPath);
      fs.writeFile(newPath, rawData, function (err) {
        if (err) return reject("upload file faild");
        return resolve(fileName);
      });
    });
  });
};

const deleteFile = (fileName) => {
  return new Promise((resovle, reject) => {
    fs.unlink(path.join(__dirname, "../public", fileName), (err) => {
      if (err) {
        return resovle(false);
      }
      return resovle(true);
    });
  });
};

module.exports = {
  uploadFile,
  deleteFile,
};
