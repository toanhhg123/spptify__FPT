const expressAsyncHandler = require("express-async-handler");
const { deleteFile } = require("../utils/file");
const Music = require("../models/music");
const createHttpError = require("http-errors");
const getAll = expressAsyncHandler(async (req, res) => {
  const musics = await Music.find({})
    .populate("category")
    .populate("likes", "_id, userName");
  return res.json({
    status: "success",
    data: musics,
    message: "query music success",
  });
});

const upload = expressAsyncHandler(async (req, res) => {
  try {
    const img = req.files["img"][0].filename;
    const audio = req.files["audio"][0].filename;
    const music = new Music(req.body);
    music.image = img;
    music.audioFile = audio;

    await music.save();

    return res.json({
      status: "success",
      data: music,
      message: "upload music success",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteMusic = expressAsyncHandler(async (req, res) => {
  const music = await Music.findByIdAndDelete(req.params.id);
  if (music) {
    await deleteFile(music.image, "img");
    await deleteFile(music.audioFile, "audio");
  }
  return res.json({
    status: "success",
    data: music,
    message: "delete file success",
  });
});

const changeLike = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  console.log(_id);

  const music = await Music.findById(req.params.id);

  if (!music) throw createHttpError.NotFound("not found music !!");
  music.likes = !music.likes.find((id) => id.toString() === _id)
    ? [...music.likes, _id]
    : music.likes.filter((id) => id.toString() !== _id);
  await music.save();
  return res.json({
    status: "success",
    data: music,
    message: "changle like  success",
  });
});

module.exports = {
  upload,
  deleteMusic,
  getAll,
  changeLike,
};
