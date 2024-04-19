import { createUser, getAll } from "../models/userModel.js";

const createNewUser = async (req, res, next) => {
  try {
    const user = req.body;
    console.log(user);
    await createUser(user);
    res.status(200).send("Usuario registrado con éxito");
  } catch (error) {
    next(error);
  }
};

const getAllUser = async (req, res, next) => {
  try {
    const users = await getAll();
    if (!users) return res.status(404).json({ Message: "No users found" });
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export { createNewUser, getAllUser };
