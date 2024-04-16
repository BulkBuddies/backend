import { byEmail } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { createNewError } from "../helpers/requestError.js";

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await byEmail(email, password);
    if (!findUser) {
      throw createNewError("auth_01");
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: 60,
    });
    res.send({ token });
  } catch (error) {
    console.error("Error al autenticar al usuario:", error);
    res.status(500).json({ error: error.message });
  }
};


export { loginUser };
