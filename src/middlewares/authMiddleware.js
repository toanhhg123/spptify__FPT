const expressAsyncHandler = require("express-async-handler");
const createHttpError = require("http-errors");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticateJWT = (roles) =>
  expressAsyncHandler((req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(" ")[1];

      jwt.verify(token, process.env.SECRET_KEY_JWT, (err, user) => {
        if (err) return next(createHttpError.Forbidden("forbidden"));
        if (roles && !roles.some((role) => role === user.role))
          return next(createHttpError.Forbidden("forbidden"));
        req.user = user;
        next();
      });
    } else {
      throw new Error("authencation");
    }
  });

module.exports = authenticateJWT;
