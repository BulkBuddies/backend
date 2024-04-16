import { RequestError } from "../src/api/v1/helpers/requestError.js";

const errorHandler = (error, req, res, next) => {
  if (error instanceof RequestError) {
    return res.status(error.statusCode).send(error.message);
  } else {
    return res.status(500).send(error.message);
  }
};
export default errorHandler;
