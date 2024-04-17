import jwt from "jsonwebtoken";
import { createNewError } from "../src/api/v1/helpers/requestError.js";
import { JWT_SECRET, REFRESH_SECRET } from "../config/constants.js";

const isLoggedin = async (req, res, next) => {
  try {
    validateHeaders(req, res);
    const token = req.header("Authorization").split(" ")[1];
    const tokenData = await validateToken(token);
    req.user = tokenData;
    console.log(req.user.id);
    next();
  } catch (error) {
    next(error);
  }
};

const validateToken = async (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (err) {
    throw createNewError(err.message);
  }
};

const validateRefreshToken = async (token, userId) => {
  try {
    const { id } = jwt.verify(token, REFRESH_SECRET);
    return id;
  } catch (error) {
    throw createNewError(err.message);
  }
};

const validateHeaders = (req) => {
  if (!req.header("Authorization")) {
    throw createNewError("auth_03");
  }
};

export { isLoggedin, validateToken, validateRefreshToken };
