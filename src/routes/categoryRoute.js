const { Router } = require("express");
const {
  getAll,
  deleteCategory,
  updateCategory,
  addCategory,
} = require("../controllers/categoryController");

const router = Router();
router.get("/", getAll);
router.post("/", addCategory);
router.patch("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
