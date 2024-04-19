import { body, validationResult } from "express-validator";

const signUpValidator = () => {
  body("first_name").trim().notEmpty();
  body("last_name").trim().notEmpty();
  body("email").trim().notEmpty();
  body("username").trim().notEmpty();
  body("password").trim().notEmpty();
};

const signInValidator = () => {
  body("email", "El email debe ser valido").trim().notEmpty().isEmail();
  body("password").trim().notEmpty;
};

export { signInValidator, signUpValidator };
