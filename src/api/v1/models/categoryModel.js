import pool from "../../../../config/db/db.js";

const getAllCategories = async () => {
  const sqlQuery = {
    text: "SELECT id, name FROM category",
  };
  const categories = await pool.query(sqlQuery);
  return categories.rows;
};

export { getAllCategories };