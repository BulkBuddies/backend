import { createNewError } from "../src/api/v1/helpers/requestError.js";
import { findUserBy } from "../src/api/v1/models/userModel.js";

const checkEmailHandler = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await findUserBy("email", email);
    if (!user)
      throw createNewError("", 404, "Este email no se encuentra registrado");
    const { first_name, email: foundUserEmail } = user;
    console.log(user);
    return res.status(200).send({ first_name, foundUserEmail });
  } catch (error) {
    next(error);
  }
};

export { checkEmailHandler };
