import pool from "../../../../config/db/db.js";
import { createNewError } from "../helpers/requestError.js";

const getAllRegions = async () => {
  const sqlQuery = {
    text: "SELECT id, region FROM regiones",
  };
  const regions = await pool.query(sqlQuery);
  return regions.rows;
};

const getComunaByRegion = async (region_id) => {
  const sqlQuery = {
    text: "SELECT id, comuna, region_id FROM comunas WHERE region_id = $1",
    values: [region_id],
  };
  const { rows } = await pool.query(sqlQuery);
  return rows;
};

export { getAllRegions, getComunaByRegion };
