const { Router } = require("express");
const {
  upload,
  deleteMusic,
  getAll,
  changeLike,
} = require("../controllers/musicController");
const { uploadImg } = require("../config/multer");
const authenticateJWT = require("../middlewares/authMiddleware");

const router = Router();
router.patch("/changelikes/:id", authenticateJWT(), changeLike);

router.get("/", getAll);
router.post(
  "/",
  uploadImg.fields([{ name: "img" }, { name: "audio" }]),
  upload
);

router.delete("/:id", deleteMusic);

module.exports = router;
