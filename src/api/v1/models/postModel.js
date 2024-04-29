import pool from "../../../../config/db/db.js";

const getAllPostModel = async () => {
  const query = await pool.query(
    "SELECT id , title, created_by, description, status, expiration_date, unit_price, url, img_url, category_id, required_stock, min_contribution, user_stock FROM POST"
  );
  return query.rows;
};

const getUserPostModel = async (userId) => {
  const query = await pool.query(
    "SELECT id, title, created_by, description, status, expiration_date, unit_price, url, img_url, category_id, required_stock, min_contribution, user_stock, visible FROM post WHERE created_by = $1 AND visible = true",
    [userId]
  );
  console.log(query);
  return query.rows;
};

const createPostModel = async (
  title,
  created_by,
  description,
  expiration_date,
  unit_price,
  url,
  img_url,
  category_id,
  required_stock,
  min_contribution,
  user_stock
) => {
  const query = await pool.query(
    "INSERT INTO POST (title, created_by, description, expiration_date, unit_price, url, img_url, category_id, required_stock, min_contribution, user_stock) VALUES ($1, (SELECT id FROM usuario WHERE id = $2), $3, $4, $5, $6, $7, (SELECT id FROM category WHERE id = $8), $9, $10, $11) RETURNING *",
    [
      title,
      created_by,
      description,
      expiration_date,
      unit_price,
      url,
      img_url,
      category_id,
      required_stock,
      min_contribution,
      user_stock,
    ]
  );
  console.log(query.rows);
  return query.rows;
};

const updatePostModel = async (
  userId,
  title,
  description,
  status,
  expiration_date,
  unit_price,
  url,
  img_url,
  category_id,
  required_stock,
  min_contribution,
  user_stock,
  visible
) => {
  const query = await pool.query(
    "UPDATE post SET title = $2, description = $3, status = $4, expiration_date = $5, unit_price = $6, url = $7, img_url = $8, category_id = $9, required_stock = $10, min_contribution = $11, user_stock = $12 WHERE created_by = $1 RETURNING *",
    [
      userId,
      title,
      description,
      status,
      expiration_date,
      unit_price,
      url,
      img_url,
      category_id,
      required_stock,
      min_contribution,
      user_stock,
    ]
  );
  return query.rows;
};

const softDeletePostModel = async (id) => {
  const query = await pool.query(
    "UPDATE post SET visible = false WHERE created_by = $1 RETURNING *",
    [id]
  );
  return query.rows[0];
};

export {
  getAllPostModel,
  getUserPostModel,
  createPostModel,
  updatePostModel,
  softDeletePostModel,
};
