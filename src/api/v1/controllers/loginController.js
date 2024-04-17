import { byEmail } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { createNewError } from "../helpers/requestError.js";
import { generateToken, generateRefreshToken } from "../utils/generateToken.js";

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { id } = await byEmail(email, password);
    const { token, time } = generateToken(id);

    
    res.send({ token, time });
  } catch (error) {
    next(error);
  }
};

export { loginUser };
