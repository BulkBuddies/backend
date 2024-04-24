import jwt from "jsonwebtoken";
import { JWT_SECRET, REFRESH_SECRET } from "../../../../config/constants.js";
import { createNewError } from "../helpers/requestError.js";
import { updateRefreshToken } from "../models/userModel.js";

const generateToken = (id) => {
  const time = 60;
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
    });
  } catch (error) {
    throw createNewError("", 400, error.message);
  }
};

const generateTokens = async (res, id) => {
  const token = generateToken(id);
  generateRefreshToken(id, res);
  return token;
};

export { generateToken, generateRefreshToken, generateTokens };
