const express = require("express");
const app = express();
const accountRoute = require("./src/routes/accountRoute");
const authRoute = require("./src/routes/authRoute");
const musicRoute = require("./src/routes/musicRoute");
const categoryRoute = require("./src/routes/categoryRoute");

const {
  errorHandler,
  handleErrorNotFound,
} = require("./src/middlewares/errorMiddleware");
const authMiddleWare = require("./src/middlewares/authMiddleware");
var path = require("path");
require("dotenv").config();
const connectDB = require("./src/config/db");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(express.static(path.join(__dirname, "src", "public"))); //  "public" off of current is root

//middeware header
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// database conection
connectDB();

//router
app.use("/v1/account", authMiddleWare(["admin"]), accountRoute);
app.use("/v1/auth", authRoute);
app.use("/v1/music", musicRoute);
app.use("/v1/category", categoryRoute);

//error middleware
app.use(handleErrorNotFound);
app.use(errorHandler);

app.listen(process.env.PORT || 8081, () => {
  console.log("app listen in port 8080");
});
