import { body, param, validationResult, check } from "express-validator";
import { createNewError } from "../src/api/v1/helpers/requestError.js";
import {
  postalCodeRegex,
  rutRegex,
  phoneRegex,
  usernameRegex,
} from "../src/api/v1/utils/regex.js";

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
  body("username", "Ingresa un username")
    .trim()
    .notEmpty()
    .matches(usernameRegex)
    .withMessage(
      "El username debe ser al menos de 6 carácteres y no mayor a 12"
    ),
  body("password", "Debes ingresar una contraseña")
    .trim()
    .notEmpty()
    .isLength({ min: 8, max: 12 }),
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

const currentDate = new Date();
const limitDate = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth() + 3,
  currentDate.getDate()
);

const postValidator = [
  body("title", "No puede estar vacio").trim().notEmpty(),
  body("description", "No puede estar vacio").trim().notEmpty(),
  body("expiration_date")
    .trim()
    .notEmpty()
    .isISO8601()
    .isAfter(currentDate.toString())
    .withMessage("No puede ser antes de ayer"),
  check("expiration_date")
    .isBefore(limitDate.toString())
    .withMessage("No puede ser mayor a 3 meses"),
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
      min: 100,
    })
    .withMessage("El stock debe ser mayor a 0"),
  body("min_contribution", "No puede estar vacio")
    .trim()
    .notEmpty()
    .isInt({
      min: 1,
    })
    .withMessage("La contribución debe ser mayor a 0")
    .custom((value, { req }) => {
      return +value < +req.body.required_stock;
    })
    .withMessage(
      "La contribución no puede ser mayor o igual al stock del producto"
    ),
  body("user_stock", "No puede estar vacio")
    .trim()
    .notEmpty()
    .isInt({
      min: 1,
    })
    .withMessage("La contribución del usuario debe ser mayor a 0")
    .custom((value, { req }) => {
      return (
        +value >= +req.body.min_contribution &&
        +value < +req.body.required_stock
      );
    })
    .withMessage(
      "La contribución del usuario debe ser mayor o igual al minimo y no debe ser mayor que el stock del producto"
    ),
  validatorCheckHandler,
];

const updatePostValidator = [
  body("title", "No puede estar vacio").trim().notEmpty(),
  body("description", "No puede estar vacio").trim().notEmpty(),
  body("url", "No puede estar vacio").trim().notEmpty().isURL(),
  body("img_url", "No puede estar vacio").trim().notEmpty().isURL(),
  body("category_id", "No puede estar vacio").trim().notEmpty().isUUID(),
  validatorCheckHandler,
];

const updateUserStockValidator = [
  body("user_contribution")
    .trim()
    .notEmpty()
    .custom((value, { req }) => {
      return +value > 0 && +value < 100000;
    })
    .withMessage(
      "La contribución del usuario debe ser mayor a 0 y menor 10000"
    ),
  validatorCheckHandler,
];
/* Validaciones para profile */

const profileValidator = [
  body("rut")
    .trim()
    .notEmpty()
    .matches(rutRegex)
    .withMessage("Ingresa un rut valido"),
  body("phone")
    .trim()
    .notEmpty()
    .matches(phoneRegex)
    .withMessage("Ingresa un telefono valido"),
  body("address").trim().notEmpty(),
  body("comuna_id").trim().notEmpty(),
  body("postal_code")
    .trim()
    .notEmpty()
    .matches(postalCodeRegex)
    .withMessage("Ingresa un Código Postal valido"),
  body("picture").trim().notEmpty(),
  validatorCheckHandler,
];

export {
  signInValidator,
  signUpValidator,
  validatorCheckHandler,
  isEmailValidator,
  idValidator,
  uuidValidator,
  postValidator,
  profileValidator,
  updatePostValidator,
  updateUserStockValidator,
};
