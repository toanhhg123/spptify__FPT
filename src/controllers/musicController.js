const expressAsyncHandler = require("express-async-handler");
const { uploadFile, deleteFile } = require("../utils/file");

const upload = expressAsyncHandler(async (req, res) => {
  const newPath = await uploadFile(req);
  res.json({
    status: "success",
    data: newPath,
    message: "upload file success",
  });
});

const deleteMusic = expressAsyncHandler(async (req, res) => {
  const isDelete = await deleteFile("/images/a.png");
  console.log(isDelete);
  if (!isDelete) throw new Error("delete faild");
  return res.json({
    status: "success",
    data: isDelete,
    message: "delete file success",
  });
});

module.exports = {
  upload,
  deleteMusic,
};
