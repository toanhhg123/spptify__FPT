const { Router } = require("express");
const { upload, deleteMusic } = require("../controllers/musicController");

const router = Router();

router.post("/upload", upload);
router.delete("/", deleteMusic);
module.exports = router;
