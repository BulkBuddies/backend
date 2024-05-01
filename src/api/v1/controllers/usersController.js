import { createNewError } from "../helpers/requestError.js";
import {
  createUser,
  deleteUserById,
  findUserBy,
  getAll,
} from "../models/userModel.js";
import { getProfileByUserId } from "../models/profileModel.js";

const createNewUser = async (req, res, next) => {
  try {
    const user = req.body;
    user.type = "local";
    await createUser(user);
    res.status(201).send({ message: "Usuario registrado con éxito" });
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

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await findUserBy("id", id);
    const profile = await getProfileByUserId(id);
    if (!user) throw createNewError("auth_01");
    res.status(200).send({ ...user, ...profile });
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

export { createNewUser, getAllUser, getUserById, deleteUser };
