import {
  findUserByEmail,
  verifyUser,
  createUser,
} from "../models/userModel.js";
import { createNewError } from "../helpers/requestError.js";
import {
  generateToken,
  generateRefreshToken,
  generateTokens,
} from "../utils/generateToken.js";
import { validateToken } from "../../../../middlewares/validateJWT.js";
import { REFRESH_SECRET } from "../../../../config/constants.js";

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const foundUser = await verifyUser(email, password);
    const token = generateTokens(res, foundUser.email);
    return res.status(200).send({ token, ...foundUser });
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
    const { email } = await validateToken(refreshToken, REFRESH_SECRET);
    const { token } = generateToken(email);
    return res.status(200).send({ token });
  } catch (error) {
    next(error);
  }
};

/**
 * @return
 * user{
 * sub:            string;
 * name:           string;
 * given_name:     string;
 * picture:        string;
 * email:          string;
 * email_verified: boolean;
 * locale:         string;
 *}
 **/

// Inicia el login con google
const googleAuthController = async (req, res, next) => {
  try {
    console.log("requi", req.user.provider);
    if (!req.user) throw createNewError("auth_04");
    const user = req.user?._json;
    const type = req.user.provider;

    await deleteSessionCookie(req, res);
    const foundUser = await findUserByEmail(user.email);
    if (!foundUser) {
      const newUser = await createUser({
        first_name: user.name,
        last_name: "",
        email: user.email,
        username: user.email,
        password: "",
        type,
      });
      const token = await generateTokens(res, newUser.id);
      const { password: pwd, ...newUserData } = newUser;
      return res.status(200).json({
        data: {
          ...newUserData,
          token,
        },
      });
    }
    const token = await generateTokens(res, foundUser.id);

    console.log("token", token);
    return res.status(200).json({
      data: {
        ...foundUser,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteSessionCookie = (req, res) => {
  const cookies = req.cookies;
  if (cookies["connect.sid"]) {
    res.clearCookie("connect.sid", { httpOnly: true });
  }
  return;
};

export {
  loginUser,
  refreshTokenController,
  logoutController,
  googleAuthController,
};
