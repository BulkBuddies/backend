import { createNewError } from "../src/api/v1/helpers/requestError.js";
import { findUserBy } from "../src/api/v1/models/userModel.js";

const checkUserHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user_id } = req.body;
    const foundUserByParams = await findUserBy("id", id);
    const foundUserByBody = await findUserBy("id", user_id);
    const foundUser = foundUserByParams || foundUserByBody;
    if (!foundUser) {
      throw createNewError("auth_01");
    }
    req.user = foundUser;
    next();
  } catch (error) {
    next(error);
  }
};

export default checkUserHandler;
