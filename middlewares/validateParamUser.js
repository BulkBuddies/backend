import { createNewError } from "../src/api/v1/helpers/requestError.js";

const validateParamUser = (req, res, next) => {
  try {
    const { first_name, last_name, email, username, password } = req.body;
    if (!first_name || !last_name || !email || !username || !password) {
      throw createNewError("signup");
    }
  } catch (error) {
    next(error);
  }
};

export { validateParamUser };
