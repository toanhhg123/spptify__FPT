const Account = require("../models/Account");
const expressAsyncHandler = require("express-async-handler");

const createAccount = expressAsyncHandler(async (req, res) => {
  const account = new Account(req.body);
  await account.save();

  return res.json({
    status: "success",
    data: account,
    message: "add user success",
  });
});

const deleteUser = expressAsyncHandler(async (req, res) => {
  const account = await Account.findByIdAndDelete(req.params.id);
  return res.json({
    status: "success",
    data: account,
    message: "delete user success",
  });
});

const updateUser = expressAsyncHandler(async (req, res) => {
  const account = await Account.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );

  return res.json({
    status: "success",
    data: account,
    message: "update  user success",
  });
});

const getAllUser = expressAsyncHandler(async (req, res) => {
  const accounts = await Account.find();
  return res.json({
    status: "success",
    data: accounts,
    message: "query user success",
  });
});

module.exports = {
  createAccount,
  deleteUser,
  updateUser,
  getAllUser,
};
