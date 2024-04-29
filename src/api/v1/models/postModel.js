import pool from "../../../../config/db/db.js";
import { createNewError } from "../helpers/requestError.js";

const getAllPostModel = async () => {
  const query = await pool.query(
    "SELECT id , title, created_by, description, status, expiration_date, unit_price, url, img_url, category_id, required_stock, min_contribution, user_stock FROM POST"
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

const getUserPostModel = async (id) => {
  try {
    const sqlQuery = {
      text: "SELECT * FROM post WHERE created_by = $1 AND visible = true",
      values: [id],
    };
    const { rows } = await pool.query(sqlQuery);
    return rows[0];
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
      order by a.date asc;      
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
      select  a.email,
      a.username,
      b.post_id,
      c.title,
      b.role,
      b.date,
      b.item_by_this_user
      from usuario a left join log_post b on a.id = b.user_id
             left join post c on b.post_id = c.id
      where a.id = $1
      order by b.date asc;
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
  status,
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
    "INSERT INTO POST (title, created_by, description, status, expiration_date, unit_price, url, img_url, category_id, required_stock, min_contribution, user_stock, visible) VALUES ($1, (SELECT id FROM usuario WHERE id = $2), $3, $4, $5, $6, $7, $8, (SELECT id FROM category WHERE id = $9), $10, $11, $12, true) RETURNING *",
    [
      title,
      created_by,
      description,
      status,
      expiration_date,
      unit_price,
      url,
      img_url,
      category_id,
      required_stock,
      min_contribution,
      user_stock
    ]
  );
  console.log(query.rows);
  return query.rows;
};

const updatePostModel = async (postId, newData) => {
  try {
    const {
      title,
      description,
      status,
      expiration_date,
      unit_price,
      url,
      img_url,
      category_id
    } = newData;

    const sqlQuery = {
      text: `
      UPDATE post 
      SET title = $2, 
      description = $3, 
      status = $4, 
      expiration_date = $5, 
      unit_price = $6, 
      url = $7, 
      img_url = $8, 
      category_id = $9
      WHERE id = $1 
      RETURNING *
      `,
      values: [
        postId,
        title,
        description,
        status,
        expiration_date,
        unit_price,
        url,
        img_url,
        category_id
      ],
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
        VALUES ($1, $2, CURRENT_TIMESTAMP, 'Partner', $3)
        `,
        values: [userId, postId, userContribution],
      };

      await pool.query(insertQuery);
      return updatedRows[0];    
    }
  } catch (error) {
    console.log(error)
    throw createNewError(error.code);
  }
};


const softDeletePostModel = async (id) => {
  try {
    const sqlQuery = {
      text: `
    UPDATE post 
    SET  visible = FALSE
    WHERE id = $1 
    RETURNING *
    `,
      values: [id],
    };
    const { rows } = await pool.query(sqlQuery);
    return rows[0];
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
  getUserDataById
};
