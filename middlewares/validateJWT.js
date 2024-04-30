import jwt from "jsonwebtoken";
import { createNewError } from "../src/api/v1/helpers/requestError.js";
import { JWT_SECRET, REFRESH_SECRET } from "../config/constants.js";
import { usernameRegex } from "../src/api/v1/utils/regex.js";

const verifyJWT = async (req, res, next) => {
  try {
    validateHeaders(req, res);
    const token = req.header("Authorization").split(" ")[1];
    const tokenData = await validateToken(token, JWT_SECRET);
    req.token = tokenData;

    next();
  } catch (error) {
    next(error);
  }
};

const validateToken = async (token, secretKey) => {
  try {
    const decoded = jwt.verify(token, secretKey);

    return decoded;
  } catch (err) {
    throw createNewError(err.message);
  }
};

const validateTokenFromParams = async (req, res, next) => {
  try {
    const { token } = req.params;
    const decoded = await validateToken(token, JWT_SECRET);
    if (decoded) {
      return res
        .status(200)
        .send({ message: "Token verificado", userId: decoded.id });
    }
  } catch (error) {
    next(error);
  }
};

const validateHeaders = (req) => {
  if (!req.header("Authorization")) {
    throw createNewError("auth_03");
  }
};

const validateUsername = async (req, res, next) => {
  const { username } = req.query;
  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }
  if (usernameRegex.test(username)) {
    return res.status(400).json({ message: "Invalid username" });
  }
  next();
};

export { verifyJWT, validateToken, validateUsername, validateTokenFromParams };
