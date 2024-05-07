import {
  findUserBy,
  verifyUser,
  createUser,
  updatePassword,
} from "../models/userModel.js";
import { createNewError } from "../helpers/requestError.js";
import { generateToken, generateTokens } from "../utils/generateToken.js";
import { validateToken } from "../../../../middlewares/validateJWT.js";
import {
  JWT_SECRET,
  PRODUCTION_ENV,
  REFRESH_SECRET,
} from "../../../../config/constants.js";
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const foundUser = await verifyUser(email, password);
    const token = await generateTokens(res, foundUser.id, "1 hour");
    return res.status(200).send({ data: { token, ...foundUser } });
  } catch (error) {
    next(error);
  }
};

const logoutController = async (req, res, next) => {
  try {
    const cookie = req.cookies;
    if (!cookie.jwt) throw createNewError("auth_06");
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: PRODUCTION_ENV,
      sameSite: PRODUCTION_ENV ? "None" : "lax",
    });
    res.status(200).json({ message: "Logged out" });
  } catch (error) {
    next(error);
  }
};

const refreshTokenController = async (req, res, next) => {
  try {
    const cookie = req.cookies;
    if (!cookie.jwt) throw createNewError("auth_07");
    const refreshToken = cookie.jwt;
    const decoded = await validateToken(refreshToken, REFRESH_SECRET);
    const token = generateToken(decoded.id, "1 hour");
    // Check if it will only send the token or both the token and the user info
    return res.status(200).send({ token });
  } catch (error) {
    next(error);
  }
};

const googleAuthController = async (req, res, next) => {
  try {
    console.log("Check req.user and req.isAuthenticated():");
    console.log(req.user);
    console.log(req.isAuthenticated());
    console.log("-----------------------------------------");
    console.log("-----------------------------------------");
    console.log("-----------------------------------------");
    console.log("Check req: \n");
    console.log(req);
    console.log("-----------------------------------------");
    console.log("-----------------------------------------");
    /*    if (!req.user) throw createNewError("auth_04"); */
    const user = req.user?._json;
    const type = req.user?.provider;
    /* 
    await deleteSessionCookie(req, res);  */
    const foundUser = await findUserBy("email", user.email);
    if (!foundUser) {
      const newUser = await createUser({
        first_name: user.name,
        last_name: "",
        email: user.email,
        username: user.email,
        password: "",
        type,
      });
      const token = await generateTokens(res, newUser.id, "1 hour");
      const { password: pwd, ...newUserData } = newUser;
      return res.status(200).json({
        data: {
          token,
          ...newUserData,
        },
      });
    }
    const token = await generateTokens(res, foundUser.id, "1 hour");

    return res.status(200).json({
      data: {
        token,
        ...foundUser,
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

const resetPasswordController = async (req, res, next) => {
  try {
    const { id, password } = req.body;
    await updatePassword(id, password);
    res.status(200).json({ message: "Contraseña cambiada" });
  } catch (error) {
    next(error);
  }
};

export {
  loginUser,
  refreshTokenController,
  logoutController,
  googleAuthController,
  resetPasswordController,
};
