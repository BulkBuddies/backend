import { createNewError } from "../src/api/v1/helpers/requestError.js";

const notFoundHandler = async (req, res, next) => {
  try {
    throw createNewError("", 404, "Not found");
  } catch (error) {
    next(error);
  }
};

export { notFoundHandler };
