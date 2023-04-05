const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async () =>
  mongoose
    .connect(process.env.CONNECT_STRING)
    .then(() => console.log("connect success"))
    .catch((e) => console.log("connect faild"));

module.exports = connectDB;
