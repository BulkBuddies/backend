import { createNewError } from "../helpers/requestError.js";
import {
  createUser,
  deleteUserById,
  findUserBy,
  getAll,
  uniqueUsername,
} from "../models/userModel.js";

const createNewUser = async (req, res, next) => {
  try {
    const user = req.body;
    console.log(user);
    await createUser(user);
    res.status(200).send({ message: "Usuario registrado con éxito" });
  } catch (error) {
    next(error);
  }
};

const getAllUser = async (req, res, next) => {
  try {
    const users = await getAll();
    if (!users) return res.status(404).json({ message: "No users found" });
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const validateUsernameController = async (req, res) => {
  try {
    const { username } = req.query;
    const result = await uniqueUsername(username);
    if (result === 0) {
      return res.status(200).json({ message: true });
    }
    return res.status(400).json({ message: false });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await findUserBy("id", id);
    if (!user) throw createNewError("auth_01");
    res.status(200).send({ ...user });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteUserById(id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export {
  createNewUser,
  getAllUser,
  validateUsernameController,
  getUserById,
  deleteUser,
};
