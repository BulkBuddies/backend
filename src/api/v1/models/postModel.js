import pool from "../../../../config/db/db.js";
import { createNewError } from "../helpers/requestError.js";

const getAllPostModel = async () => {
  const query = await pool.query(
    "SELECT id , title, created_by, description, status, expiration_date, unit_price, url, img_url, category_id, required_stock, min_contribution, user_stock FROM POST ORDER BY created_at desc"
  );
  return query.rows;
};

const getPostById = async (id) => {
  try {
    const sqlQuery = {
      text: "SELECT * from post where id = $1",
      values: [id],
    };
    const { rows } = await pool.query(sqlQuery);
    return rows[0];
  } catch (error) {
    throw createNewError(error.code);
  }
};

const getRequiredStockPostId = async (id) => {
  try {
    const sqlQuery = {
      text: "SELECT required_stock, min_contribution, user_stock from post where id = $1",
      values: [id],
    };
    const { rows } = await pool.query(sqlQuery);
    return rows[0];
  } catch (error) {
    throw createNewError(error.code);
  }
};

const getUserPostModel = async (userId) => {
  try {
    const sqlQuery = {
      text: "SELECT * FROM post WHERE created_by = $1 AND visible = true order by created_at desc",
      values: [userId],
    };
    const { rows } = await pool.query(sqlQuery);
    return rows;
  } catch (error) {
    throw createNewError(error.code);
  }
};

const getItemDataFromPostById = async (id) => {
  try {
    const sqlQuery = {
      text: "SELECT id, title, description FROM post WHERE id = $1",
      values: [id],
    };
    const { rows } = await pool.query(sqlQuery);
    return rows[0];
  } catch (error) {
    throw createNewError(error.code);
  }
};

const getUserDataById = async (id) => {
  try {
    const sqlQuery = {
      text: "SELECT id,email,username  FROM usuario WHERE id = $1",
      values: [id],
    };
    const { rows } = await pool.query(sqlQuery);
    return rows[0];
  } catch (error) {
    throw createNewError(error.code);
  }
};

const getCategoryNameById = async (id) => {
  try {
    const sqlQuery = {
      text: "SELECT id,name FROM category WHERE id = $1",
      values: [id],
    };
    const { rows, rowCount } = await pool.query(sqlQuery);
    if (rowCount === 0) throw createNewError("category_01");
    return rows[0];
  } catch (error) {
    throw createNewError(error.code);
  }
};

const getLogByPostId = async (id) => {
  try {
    const sqlQuery = {
      text: `
      select c.id post_id,
      b.username,
      b.id user_id,
      a.role,
      a.item_by_this_user,
      a.date
      from log_post a left join usuario b on a.user_id = b.id 
                       left join post c on a.post_id = c.id
      where a.post_id = $1
      order by a.date desc;      
      `,
      values: [id],
    };
    const { rows } = await pool.query(sqlQuery);
    return rows;
  } catch (error) {
    throw createNewError(error.code);
  }
};

const getLogByUsertId = async (id) => {
  try {
    const sqlQuery = {
      text: `
      select  
      b.post_id,
      c.title,
      b.role,
      b.date,
      b.item_by_this_user
      from log_post b  left join post c on b.post_id = c.id
      where b.user_id =  $1
      order by b.date desc
;
      `,
      values: [id],
    };
    const { rows } = await pool.query(sqlQuery);
    return rows;
  } catch (error) {
    throw createNewError(error.code);
  }
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
  return query.rows;
};

const updatePostModel = async (postId, newData) => {
  try {
    const { title, description, url, img_url, category_id } = newData;

    const sqlQuery = {
      text: `
      UPDATE post 
      SET title = $2, 
      description = $3, 
      url = $4, 
      img_url = $5, 
      category_id = $6
      WHERE id = $1 
      RETURNING *
      `,
      values: [postId, title, description, url, img_url, category_id],
    };

    const { rows } = await pool.query(sqlQuery);
    return rows[0];
  } catch (error) {
    throw createNewError(error.code);
  }
};

const updateUserStockById = async (postId, userContribution, userId) => {
  try {
    const updateQuery = {
      text: `
    UPDATE post 
    SET  user_stock = user_stock + $2
    WHERE id = $1 
    RETURNING *`,
      values: [postId, userContribution],
    };
    const { rows: updatedRows } = await pool.query(updateQuery);

    if (updatedRows && updatedRows.length > 0) {
      const insertQuery = {
        text: `

        INSERT INTO log_post (user_id, post_id, date, role, item_by_this_user)
        SELECT $1, $2, CURRENT_TIMESTAMP,
               CASE
                   WHEN (SELECT role FROM log_post WHERE user_id = $1 and post_id = $2 ORDER BY date ASC LIMIT 1) = 'Owner' THEN 'Owner'
                   ELSE 'Partner'
               END,
               $3;
        `,
        values: [userId, postId, userContribution],
      };

      await pool.query(insertQuery);
      return updatedRows[0];
    }
  } catch (error) {
    throw createNewError(error.code);
  }
};

const softDeletePostModel = async (userId, postId) => {
  try {
    const sqlQuery = {
      text: `
    UPDATE post 
    SET  visible = FALSE
    WHERE created_by = $1 AND id = $2
    RETURNING *
    `,
      values: [userId, postId],
    };
    const { rows } = await pool.query(sqlQuery);
    return rows[0];
  } catch (error) {
    throw createNewError(error.code);
  }
};

const getPostCategoryId = async (id) => {
  try {
    const sqlQuery = {
      text: "SELECT * FROM post WHERE category_id = $1",
      values: [id],
    };
    const { rows } = await pool.query(sqlQuery);
    return rows;
  } catch (error) {
    throw createNewError(error.code);
  }
};

export {
  getAllPostModel,
  getPostById,
  getUserPostModel,
  getLogByPostId,
  getLogByUsertId,
  createPostModel,
  updatePostModel,
  softDeletePostModel,
  getRequiredStockPostId,
  updateUserStockById,
  getItemDataFromPostById,
  getCategoryNameById,
  getPostCategoryId,
  getUserDataById,
};
