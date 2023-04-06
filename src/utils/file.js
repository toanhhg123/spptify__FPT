const fs = require("fs");
const path = require("path");
const formidable = require("formidable");

const { v4 } = require("uuid");

const uploadFile = async (req, fileKey, folder = "public") => {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
      let oldPath = files[fileKey].filepath;
      const fileName =
        v4() + "." + files[fileKey].originalFilename.split(".").slice(-1);
      let newPath = path.join(__dirname, "../public", folder, fileName);
      let rawData = fs.readFileSync(oldPath);
      console.log(rawData);
      fs.writeFile(newPath, rawData, function (err) {
        if (err) return resolve(null);
        return resolve(fileName);
      });
    });
  });
};

const deleteFile = (fileName, folder = "public") => {
  return new Promise((resovle, reject) => {
    fs.unlink(path.join(__dirname, "../public", folder, fileName), (err) => {
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
