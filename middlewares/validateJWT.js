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
    const userIdFromEndpoint = req.params.id;
    const userIdFromToken = req.token.id;
    if (!userIdFromEndpoint) {
      return next();
    }
    if (userIdFromToken !== userIdFromEndpoint) {
      return res.status(403).json({
        messsage: " No estás autorizado para acceder a este recurso.",
      });
    }
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

export { verifyJWT, validateToken, validateUsername };
