import ERRORS from "./errors";

class RequestError extends Error {
  constructor(message, statusCode, code) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.code = code;
  }
  checkCode(code) {
    const error = ERRORS.get(code);
    if (typeof code === "string" && error) {
      this.message = error.message;
      this.statusCode = error.statusCode;
    } else {
      this.message = this.message;
      this.statusCode = this.statusCode;
    }
  }
}
const createNewError = (code, statusCode = 400, message = "") => {
  const error = new RequestError(message, statusCode, code);
  error.checkCode(code);
  return error;
};
export { createNewError, RequestError };
