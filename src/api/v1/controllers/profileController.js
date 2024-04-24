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
      const newData = req.body; // Suponiendo que los nuevos datos a actualizar se envían en el cuerpo de la solicitud
  
      // Llama a la función para actualizar el perfil
      const updatedProfile = await updateProfileByUserId(id, newData);
  
      res.status(200).json({ message: 'Perfil actualizado correctamente', profile: updatedProfile });
    } catch (error) {
      next(error);
    }
  }; 

  export { getProfileById, updateProfileById }