import jwt from "jsonwebtoken";
import { JWT_SECRET, REFRESH_SECRET } from "../../../../config/constants.js";
import { createNewError } from "../helpers/requestError.js";
import { updateRefreshToken } from "../models/userModel.js";

const generateToken = (id) => {
  const time = 60;
  try {
    const token = jwt.sign({ id }, JWT_SECRET, { expiresIn: time });
    return { token, time };
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
    /*  await addRefreshToken(token, id); */
    res.cookie("jwt", refreshToken, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
  } catch (error) {
    throw createNewError("", 400, error.message);
  }
};

export { generateToken, generateRefreshToken };
