import pool from "../../../../config/db/db.js";
import format from "pg-format";
import { createNewError } from "../helpers/requestError.js";

const getProfileByUserId = async (id) => {
  try {
    const sqlQuery = {
      text: "select fk_user, rut, phone, address, comuna_id, postal_code, created_at, picture,b.email from profile a left join usuario b on a.fk_user = b.id where b.id = $1",
      values: [id],
    };
    const { rows } = await pool.query(sqlQuery);
    return rows[0];
  } catch (error) {
    throw createNewError(error.code);
  }
};

const updateProfileByUserId = async (id) => {


  
}

export { getProfileByUserId };
