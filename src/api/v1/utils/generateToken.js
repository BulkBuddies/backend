import jwt from "jsonwebtoken";
import {
  JWT_SECRET,
  PRODUCTION_ENV,
  REFRESH_SECRET,
} from "../../../../config/constants.js";
import { createNewError } from "../helpers/requestError.js";

const generateToken = (id, time) => {
  try {
    const token = jwt.sign({ id }, JWT_SECRET, { expiresIn: time });
    return token;
  } catch (error) {
    throw createNewError("", 400, error.message);
  }
};

const generateRefreshToken = (id, res) => {
  const time = 60 * 60 * 24;
  try {
    const refreshToken = jwt.sign({ id }, REFRESH_SECRET, {
      expiresIn: time,
    });
    res.cookie("jwt", refreshToken, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: PRODUCTION_ENV,
    });
  } catch (error) {
    throw createNewError("", 400, error.message);
  }
};

const generateTokens = async (res, id, time) => {
  const token = generateToken(id, time);
  generateRefreshToken(id, res);
  return token;
};

export { generateToken, generateRefreshToken, generateTokens };
