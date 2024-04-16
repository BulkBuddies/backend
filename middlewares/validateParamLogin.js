import { createNewError } from "../src/api/v1/helpers/requestError.js";

const validateParamLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw createNewError("auth_05");
  }
  next(error);
};

export { validateParamLogin };
