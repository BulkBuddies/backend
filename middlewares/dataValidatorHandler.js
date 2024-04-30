import { body, param, validationResult } from "express-validator";
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

const isEmailChain = body("email", "Debes ingresar un email válido")
  .trim()
  .notEmpty()
  .isEmail()
  .normalizeEmail();

const isThereAnIdChain = param("id", "Ingresa un ID").trim().notEmpty();
const isUUIDChain = param("id", "Ingresa un UUID").trim().notEmpty().isUUID();

const signUpValidator = [
  body("first_name", "No puede estar vacio").trim().notEmpty(),
  body("last_name", "El apellido no puede estar vacío").trim().notEmpty(),
  isEmailChain,
  body("username", "Ingresa un username").trim().notEmpty(),
  body("password", "Debes ingresar una contraseña").trim().notEmpty().matches,
  validatorCheckHandler,
];

const signInValidator = [
  isEmailChain,
  body("password", "Ingresa una contraseña").trim().notEmpty(),
  validatorCheckHandler,
];

const idValidator = [isThereAnIdChain, validatorCheckHandler];

const uuidValidator = [isUUIDChain, validatorCheckHandler];

const isEmailValidator = [isEmailChain, validatorCheckHandler];

/* Validaciones para posts */

const postValidator = [
  body("title", "No puede estar vacio").trim().notEmpty(),
  body("description", "No puede estar vacio").trim().notEmpty(),
  body("expiration_date").trim().notEmpty().isISO8601(),
  body("unit_price")
    .trim()
    .notEmpty()
    .isInt({ min: 1 })
    .withMessage("El precio unitario debe ser mayor a 0"),
  body("url", "No puede estar vacio").trim().notEmpty().isURL(),
  body("img_url", "No puede estar vacio").trim().notEmpty().isURL(),
  body("category_id", "No puede estar vacio").trim().notEmpty().isUUID(),
  body("required_stock", "No puede estar vacio")
    .trim()
    .notEmpty()
    .isInt({
      min: 1,
    })
    .withMessage("El stock debe ser mayor a 0"),
  body("min_contribution", "No puede estar vacio")
    .trim()
    .notEmpty()
    .isInt({
      min: 1,
    })
    .withMessage("La contribución debe ser mayor a 0"),
  body("user_stock", "No puede estar vacio")
    .trim()
    .notEmpty()
    .isInt({
      min: 1,
    })
    .withMessage("La contribución del usuario debe ser mayor a 0"),
  validatorCheckHandler,
];
/* Validaciones para profile */

export {
  signInValidator,
  signUpValidator,
  validatorCheckHandler,
  isEmailValidator,
  idValidator,
  uuidValidator,
  postValidator,
};
