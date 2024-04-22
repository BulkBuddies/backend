import { RequestError } from "../src/api/v1/helpers/requestError.js";

const errorHandler =  async (error, req, res, next) => {
  if (error instanceof RequestError) {
    return res.status(error.statusCode).send({
      status: error.statusCode,
      message: error.message,
    });
  } else {
 
    return res.status(500).send({
      status: 500,
      message: error.message,
    });
  }
};


export default errorHandler;
