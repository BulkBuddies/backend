import pool from '../../../../config/db/db.js';

const getAllPostModel = async () => { 
    const query = await pool.query('SELECT id , title, created_by, description, status, expiration_date, unit_price, url, img_url, category_id, required_stock, min_contribution, user_stock FROM POST WHERE visible = true')
    return query.rows;
}

const getUserPostModel = async (created_by) => { 
    const query = await pool.query('SELECT id, title, created_by, description, status, expiration_date, unit_price, url, img_url, category_id, required_stock, min_contribution, user_stock, visible FROM post WHERE created_by = $1'
    [created_by])
    return query.rows;
}

const createPostModel = async (title, created_by, description, status, expiration_date, unit_price, url, img_url, category_id, required_stock, min_contribution, user_stock, visible) => { 
    const query = await pool.query('INSERT INTO POST (title, created_by, description, status, expiration_date, unit_price, url, img_url, category_id, required_stock, min_contribution, user_stock, visible) VALUES ($1, (SELECT id FROM usuario WHERE id = $2), $3, $4, $5, $6, $7, $8, (SELECT id FROM category WHERE id = $9), $10, $11, $12, $13) RETURNING *',
    [title, created_by, description, status, expiration_date, unit_price, url, img_url, category_id, required_stock, min_contribution, user_stock, visible])
    console.log(query.rows)
    return query.rows;
}

const updatePostModel = async (id, title, description, status, expiration_date, unit_price, url, img_url, category_id, required_stock, min_contribution, user_stock, visible) => {
    const query = await pool.query('UPDATE post SET title = $2, description = $3, status = $4, expiration_date = $5, unit_price = $6, url = $7, img_url = $8, category_id = $9, required_stock = $10, min_contribution = $11, user_stock = $12, visible = $13 WHERE id = $1 RETURNING *',
    [id, title, description, status, expiration_date, unit_price, url, img_url, category_id, required_stock, min_contribution, user_stock, visible])
    return query.rows;
}

const softDeletePostModel = async (id) => {
    const query = await pool.query("UPDATE post SET visible = false WHERE created_by = $1 RETURNING *",
  [id])
  return query.rows[0];
};

export {getAllPostModel, getUserPostModel, createPostModel, updatePostModel, softDeletePostModel};