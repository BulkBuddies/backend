import pool from "../../../../config/db/db.js";
import { createNewError } from "../helpers/requestError.js";

const getAllRegions = async () => {
  try {
    const sqlQuery = {
      text: "SELECT id, region FROM regiones",
    };
    const regions = await pool.query(sqlQuery);
    return regions.rows;
  } catch (error) {
    throw createNewError(error.code);
  }
};

const getComunaByRegion = async (region_id) => {
  try {
    const sqlQuery = {
      text: "SELECT id, comuna, region_id FROM comunas WHERE region_id = $1",
      values: [region_id],
    };
    const { rows } = await pool.query(sqlQuery);
    return rows;
  } catch (error) {
    throw createNewError(error.code);
  }
};

export { getAllRegions, getComunaByRegion };
