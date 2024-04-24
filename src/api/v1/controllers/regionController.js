import { getAllRegions, getComunaByRegion } from "../models/regionModel.js";


const getAllRegiones = async (req, res, next) => {
    try {
      const regions = await getAllRegions();
      res.status(200).json({ regions: regions });
    } catch (error) {
      next(error);
    }
  };

const getComunaByRegionId = async (req, res, next) => {
    try {
      const { id } = req.params;
      const comuna = await getComunaByRegion(id);
      res.status(200).json({ comuna: comuna });
    } catch (error) {
      next(error);
    }
  };
  


  export { getAllRegiones, getComunaByRegionId }