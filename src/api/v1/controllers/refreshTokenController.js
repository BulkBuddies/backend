import { validateRefreshToken } from "../../../../middlewares/validateJWT";
import { createNewError } from "../helpers/requestError";
import { generateToken } from "../utils/generateToken";

const refreshTokenController = async (req, res, next) => {
  try {
    const cookie = req.cookies;
    if (!cookie.jwt) throw createNewError("", 401, "Cookie está vacío");
    const refreshToken = cookie.jwt;
    const id = validateRefreshToken(refreshToken);
    generateToken(id);
    next();
  } catch (error) {
    throw createNewError(error.message);
  }
};

export { refreshTokenController };
