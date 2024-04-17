import { byEmail } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { createNewError } from "../helpers/requestError.js";
import { generateToken, generateRefreshToken } from "../utils/generateToken.js";
import { validateToken } from "../../../../middlewares/validateJWT.js";
import { REFRESH_SECRET } from "../../../../config/constants.js";

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { id } = await byEmail(email, password);
    const { token, time } = generateToken(id);
    generateRefreshToken(id, res);
    return res.send({ token, time });
  } catch (error) {
    next(error);
  }
};

const logoutController = async (req, res, next) => {
  try {
    const cookie = req.cookies;
    if (!cookie.jwt) throw createNewError("auth_06");
    res.clearCookie("jwt", { httpOnly: true });
    res.status(200).send("Logged out");
  } catch (error) {
    next(error);
  }
};

const refreshTokenController = async (req, res, next) => {
  try {
    const cookie = req.cookies;
    if (!cookie.jwt) throw createNewError("auth_07");
    const refreshToken = cookie.jwt;
    const id = validateToken(refreshToken, REFRESH_SECRET);
    const { token, time } = generateToken(id);
    return res.send({ token, time });
  } catch (error) {
    next(error);
  }
};

export { loginUser, refreshTokenController, logoutController };
