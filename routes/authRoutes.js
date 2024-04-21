import express from "express";
import passport from "passport";
import {
  loginUser,
  refreshTokenController,
  logoutController,
} from "../src/api/v1/controllers/authControllers.js";
import { validateParamLogin } from "../middlewares/validateParamLogin.js";
import { validateParamUser } from "../middlewares/validateParamUser.js";
import { createNewUser } from "../src/api/v1/controllers/usersController.js";
import { validateToken } from "../middlewares/validateJWT.js";
import { JWT_SECRET, REFRESH_SECRET } from "../config/constants.js";
import {
  generateRefreshToken,
  generateToken,
} from "../src/api/v1/utils/generateToken.js";
import { createNewError } from "../src/api/v1/helpers/requestError.js";
const router = express.Router();

//routes google

router.get(
  "/auth/google",
  passport.authenticate("google-signin", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/register",
  passport.authenticate("google-signup", { scope: ["profile", "email"] })
);

/**
 * @return user{
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
const googleSignIn = async (req, res, next) => {
  try {
    console.log(req.user)
    if (!req.user) throw createNewError("auth_04");
    const { token, time } = generateToken(req.user.id);
    await generateRefreshToken(req.user.id, res);
    deleteSessionCookie(req, res);

    res.status(200).send({
      data: {
        ...req.user?._json,
        token,
        time
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

const getGoogleAccountInfo = (req, res, next) => {
  try {
    if (!req.user) throw createNewError("auth_04");
    deleteSessionCookie(req, res);
    const userInfo = req.user;
    res.status(200).json({ data: userInfo?._json || "No data" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

router.get("/logoutg", (req, res) => {
  res.clearCookie("connect.sid", { httpOnly: true });
  res.status(200).send("CLEARED");
});

// Reedirecciona al front
router.get(
  "/auth/google/redirect",
  passport.authenticate("google-signin", {
    // Pasar a ENV
    successRedirect: "http://localhost:5173/user/dashboard",
    failureRedirect: "http://localhost:5173/auth/login",
  })
);

router.get(
  "/auth/google/register/redirect",
  passport.authenticate("google-signup", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    try {
      res.redirect("/success");
    } catch (error) {
      console.log(error);
    }
  }
);

router.get("/success", getGoogleAccountInfo);

router.post("/login", validateParamLogin, loginUser);
router.get("/login/success", googleSignIn);
router.get("/logout", logoutController);
router.post("/register", validateParamUser, createNewUser);
router.get("/refresh", refreshTokenController);
export default router;
