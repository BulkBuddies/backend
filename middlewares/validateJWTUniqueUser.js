import jwt from "jsonwebtoken";
import { createNewError } from "../src/api/v1/helpers/requestError.js";
import { JWT_SECRET, REFRESH_SECRET } from "../config/constants.js";
import { usernameRegex } from "../src/api/v1/utils/regex.js"

const verifyJWTbyUser = async (req, res, next) => {
  try {
    validateHeaders(req, res);
    const token = req.header("Authorization").split(" ")[1];
    const tokenData = await validateToken(token, JWT_SECRET);
    req.token = tokenData;
    const userIdFromToken = req.token.id;
    const userIdFromEndpoint = req.params.id;
    //vamos a ver si existe id en params, si no, que vaya a body y tome ese valor.
    if (!userIdFromEndpoint && req.body && req.body.id) {
      userIdFromEndpoint = req.body.id;
    }    

    if (!userIdFromEndpoint) {
      return res.status(400).json({ message: 'Se requiere un ID de usuario.' });
    }   
  
  if (userIdFromToken !== userIdFromEndpoint) {
      return res.status(403).json({ message: 'No estás autorizado para acceder a este recurso.' });
  }

    next();
  } catch (error) {
    next(error);
  }
};

const validateToken = async (token, secretKey) => {
  try {
    const { id, exp } = jwt.verify(token, secretKey);
    return { id, exp };
  } catch (err) {
    throw createNewError(err.message);
  }
};

const validateHeaders = (req) => {
  if (!req.header("Authorization")) {
    throw createNewError("auth_03");
  }
}; 


export { verifyJWTbyUser, validateToken };
