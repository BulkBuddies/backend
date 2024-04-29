import { getProfileByUserId, updateProfileByUserId } from "../models/profileModel.js";

const getProfileById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const profile = await getProfileByUserId(id);
      res.status(200).json({ profile: profile });
    } catch (error) {
      next(error);
    }
  };

  const updateProfileById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const newData = req.body;
      const updatedProfile = await updateProfileByUserId(id, newData);
      res.status(201).json({ message: 'Perfil actualizado correctamente', profile: updatedProfile });
    } catch (error) {
      next(error);
    }
  }; 

  export { getProfileById, updateProfileById }