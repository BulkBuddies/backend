import jwt from "jsonwebtoken";
import { createNewError } from "../src/api/v1/helpers/requestError.js";
import { JWT_SECRET, REFRESH_SECRET } from "../config/constants.js";

const verifyJWT = async (req, res, next) => {
  try {
    validateHeaders(req, res);
    const token = req.header("Authorization").split(" ")[1];
    const tokenData = await validateToken(token, JWT_SECRET);
    req.id = tokenData;
    next();
  } catch (error) {
    next(error);
  }
};

const validateToken = async (token, secretKey) => {
  try {
    const { id, exp } = jwt.verify(token, secretKey);
    return { id, exp };
  } catch (err) {
    throw createNewError(err.message);
  }
};

const validateHeaders = (req) => {
  if (!req.header("Authorization")) {
    throw createNewError("auth_03");
  }
};

const validateRefreshToken = async (req, res, next) => {
  try {
  } catch (error) {}
};

export { verifyJWT, validateToken };
