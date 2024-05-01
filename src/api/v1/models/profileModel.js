import pool from "../../../../config/db/db.js";
import { createNewError } from "../helpers/requestError.js";

const getProfileByUserId = async (id) => {
  const sqlQuery = {
    text: "select fk_user, rut, phone, address, comuna_id, postal_code, created_at, picture,b.email from profile a left join usuario b on a.fk_user = b.id where b.id = $1",
    values: [id],
  };
  const { rows } = await pool.query(sqlQuery);
  const { fk_user, ...rest } = rows[0];
  return rest;
};

const updateProfileByUserId = async (userId, newData) => {
  try {
    const { rut, phone, address, comuna_id, postal_code, picture } = newData;

    const sqlQuery = {
      text: `
        UPDATE profile 
        SET rut = $2, 
            phone = $3, 
            address = $4, 
            comuna_id = $5, 
            postal_code = $6, 
            picture = $7,
            updated_at = CURRENT_TIMESTAMP
        WHERE fk_user = $1
        RETURNING *
      `,
      values: [userId, rut, phone, address, comuna_id, postal_code, picture],
    };
    const { rows } = await pool.query(sqlQuery);
    return rows[0];
  } catch (error) {
    throw createNewError(error.code);
  }
};

export { getProfileByUserId, updateProfileByUserId };
