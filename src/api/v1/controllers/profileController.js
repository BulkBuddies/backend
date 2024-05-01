import { updateProfileByUserId } from "../models/profileModel.js";
import { updateUserById } from "../models/userModel.js";

const updateProfileById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      first_name,
      last_name,
      username,
      rut,
      phone,
      address,
      comuna_id,
      postal_code,
      picture,
    } = req.body;

    const updatedProfile = await updateProfileByUserId(id, {
      rut,
      phone,
      address,
      comuna_id,
      postal_code,
      picture,
    });
    const updateUser = await updateUserById(id, {
      first_name,
      last_name,
      username,
    });
    const updatedData = {
      ...updatedProfile,
      ...updateUser,
    };
    res.status(201).json({
      message: "Perfil actualizado correctamente",
      profile: updatedData,
    });
  } catch (error) {
    next(error);
  }
};

export { updateProfileById };
