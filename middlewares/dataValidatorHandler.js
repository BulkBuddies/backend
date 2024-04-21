import { body, validationResult } from "express-validator";
import { createNewError } from "../src/api/v1/helpers/requestError.js";

const validatorCheckHandler = async (req, res, next) => {
  try {
    const check = validationResult(req);
    if (check.isEmpty()) {
      next();
    } else {
      const errors = check.array().map(({ path, msg }) => {
        return { [path]: msg };
      });

      const errorMessages = Object.assign({}, ...errors);
      throw createNewError("", 400, errorMessages);
    }
  } catch (error) {
    next(error);
  }
};

const signUpValidator = [
  body("first_name", "No puede estar vacio").trim().notEmpty(),
  body("last_name", "El apellido no puede estar vacío").trim().notEmpty(),
  body("email", "Debes ingresar un email válido").trim().notEmpty().isEmail(),
  body("username", "El username debe estar").trim().notEmpty(),
  body("password", "Debes ingresar una contraseña").trim().notEmpty(),
  validatorCheckHandler,
];

const signInValidator = [
  body("email", "El email debe ser valido").trim().notEmpty().isEmail(),
  body("password").trim().notEmpty,
  validatorCheckHandler,
];

/* Validaciones para posts */
/* Validaciones para profile */

export { signInValidator, signUpValidator, validatorCheckHandler };
