import { createNewError } from "../src/api/v1/helpers/requestError.js";
import { findUserBy } from "../src/api/v1/models/userModel.js";
import sendEmail from "../src/api/v1/utils/sendEmail.js";
import { generateToken } from "../src/api/v1/utils/generateToken.js";


const checkEmailHandler = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await findUserBy("email", email);
    if (!user)
      throw createNewError("", 404, "Este email no se encuentra registrado");
    const { first_name, id } = user;
    const token = generateToken(id, 3600);
    const response = await sendEmail(first_name, email, token)
    res.status(200).send({ message: "SUCCESS" });
  } catch (error) {
    next(error);
  }
};

export { checkEmailHandler };
