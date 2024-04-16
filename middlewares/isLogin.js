import jwt from "jsonwebtoken";
import { findError } from "../src/api/v1/utils/utils.js";
import { createNewError } from "../src/api/v1/helpers/requestError.js";

const isLogin = async (req, res, next) => {
  try {
    validateHeaders(req, res);
    const token = req.header("Authorization").split(" ")[1];
    const tokenData = await validateToken(token);
    req.user = tokenData;
    next();
  } catch (error) {
    next(error);
  }
};

const validateToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("here is decoded", decoded);
    return decoded;
  } catch (err) {
    throw createNewError("auth_04");
  }
};

const validateHeaders = (req) => {
  if (!req.header("Authorization")) {
    throw createNewError("auth_03");
  }
};

export { isLogin };
