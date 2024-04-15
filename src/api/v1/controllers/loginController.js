import { byEmail } from '../models/userModel.js';
import jwt from "jsonwebtoken";
import { findError } from '../src/utils/utils.js';


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await byEmail(email, password);
    if (!findUser) {
       return sendErrorResponse(res, 'auth_01');
      }
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: 60,
    });
    res.send({ token });
  } catch (error) {
    console.error('Error al autenticar al usuario:', error);
      res.status(500).json({ error: error.message });
  }
};


const sendErrorResponse = async (res, errorCode) => {
  const errorFound = findError(errorCode);
  res.status(errorFound[0].status).json({ error: errorFound[0].message})
};

export { loginUser };