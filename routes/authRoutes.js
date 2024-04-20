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
const router = express.Router();

//routes google

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

const test = async (req, res, next) => {
  try {
    console.log(req.user);
    const { token, time } = generateToken(req.user.id);
    await generateRefreshToken(req.user.id, res);
    const cookies = req.cookies;
    res.clearCookie("connect.sid", { httpOnly: true });
    res.status(200).send({
      data: {
        user: req.user?.displayName,
        credentials: {
          token,
          time,
        },
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

router.get("/logoutg", (req, res) => {
  res.clearCookie("connect.sid", { httpOnly: true });
  res.status(200).send("CLEARED");
});

router.get(
  "/auth/google/redirect",
  passport.authenticate("google", {
    successRedirect: "/success",
    failureRedirect: "/login",
  })
);

router.get("/success", test);

router.post("/login", validateParamLogin, loginUser);
router.get("/logout", logoutController);
router.post("/register", validateParamUser, createNewUser);
router.get("/refresh", refreshTokenController);
export default router;
