const Account = require("../models/Account");
const expressAsyncHandler = require("express-async-handler");
const { genergateToken } = require("../utils/jwt");

const login = expressAsyncHandler(async (req, res) => {
  const { userName, password } = req.body;
  const account = await Account.findOne({ userName });
  if (!account) throw new Error("not found user please register!!");
  if (!(await account.comparePassword(password)))
    throw new Error("Your password is incorrect");

  const { passwordHash, ...user } = account._doc;
  const accessToken = genergateToken({ ...user });
  return res.json({
    status: "success",
    data: {
      account: user,
      accessToken,
    },
    message: "login success",
  });
});

const register = expressAsyncHandler(async (req, res) => {
  const { userName, password } = req.body;
  const account = await Account.create({ userName, passwordHash: password });
  const { passwordHash, ...user } = account._doc;
  const accessToken = genergateToken({ ...user });
  return res.json({
    status: "success",
    data: {
      account: user,
      accessToken,
    },
    message: "login success",
  });
});

module.exports = {
  login,
  register,
};
