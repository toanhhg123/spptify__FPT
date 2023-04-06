const expressAsyncHandler = require("express-async-handler");
const Category = require("../models/category");

const getAll = expressAsyncHandler(async (req, res) => {
  const categories = await Category.aggregate([
    { $match: {} },
    {
      $lookup: {
        from: "musics",
        localField: "_id",
        foreignField: "category",
        as: "musics",
      },
    },
  ]);

  return res.json({
    status: "success",
    data: categories,
    message: "query category success",
  });
});

const addCategory = expressAsyncHandler(async (req, res) => {
  const category = await Category.create(req.body);

  return res.json({
    status: "success",
    data: category,
    message: "query category success",
  });
});

const deleteCategory = expressAsyncHandler(async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  return res.json({
    status: "success",
    data: category,
    message: "query category success",
  });
});

const updateCategory = expressAsyncHandler(async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  return res.json({
    status: "success",
    data: category,
    message: "query category success",
  });
});

module.exports = {
  getAll,
  addCategory,
  deleteCategory,
  updateCategory,
};
