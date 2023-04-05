var jwt = require("jsonwebtoken");
require("dotenv").config();
const genergateToken = (object) => jwt.sign(object, process.env.SECRET_KEY_JWT);

module.exports = {
  genergateToken,
};
