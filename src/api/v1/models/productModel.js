import pool from "../../../../config/db/db.js";
import format from "pg-format";
import { createNewError } from "../helpers/requestError.js";

const getAllPro = async () => {
  try {
    const sqlQuery = {
      text: "SELECT id, name, description, required_stock, unit_price, created_at, updated_at, url, category_id FROM product",
    };
    const users = await pool.query(sqlQuery);
    return users.rows;
  } catch (error) {
    throw createNewError(error.code);
  }
};

const getProductById = async (id) => {
  try {
    const sqlQuery = {
      text: "SELECT id, name, description, required_stock, unit_price, created_at, updated_at, url, category_id FROM product where id = $1",
      values: [id],
    };
    const { rows } = await pool.query(sqlQuery);
    return rows[0];
  } catch (error) {
    throw createNewError(error.code);
  }
};

const getCategoryName = async (id) => {
  try {
    const sqlQuery = {
      text: "SELECT name FROM category where id = $1",
      values: [id],
    };
    const { rows } = await pool.query(sqlQuery);
    return rows[0];
  } catch (error) {
    throw createNewError(error.code);
  }
};

const getProductByCategoryId = async (category_id) => {
  try {
    const sqlQuery = {
      text: "SELECT id, name, description, required_stock, unit_price, created_at, updated_at, url, category_id FROM product where category_id = $1",
      values: [category_id],
    };
    const { rows } = await pool.query(sqlQuery);
    return rows;
  } catch (error) {
    throw createNewError(error.code);
  }
};


const getProLimitOrder = async (
  field = "name",
  direction = "ASC",
  limit = 10,
  page = 0
) => {
  try {
  const offset = Math.abs((page - 1) * limit);
  const formattedQuery = format(
    "SELECT * FROM product ORDER BY %s %s LIMIT %s OFFSET %s",
    field,
    direction,
    limit,
    offset
  );
  const result = await pool.query(formattedQuery);
  return result.rows;
}
  catch (error) {
    throw createNewError(error.code);
  }
};

// export getProductFilter = async ({}) =>{

// }

export { getAllPro,getProductById,getCategoryName, getProLimitOrder, getProductByCategoryId  }

