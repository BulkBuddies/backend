import { getProfileByUserId } from "../models/profileModel.js";

const getProfileById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const profile = await getProfileByUserId(id);
      res.status(200).json({ profile: profile });
    } catch (error) {
      next(error);
    }
  };

  export { getProfileById }