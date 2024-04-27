import pool from '../../../../config/db/db.js';

const getPostModel = async () => { 
    const query = await pool.query('SELECT id , title, description, status, product_id FROM POST WHERE visible = true')
    return query.rows;
}

const createPostModel = async (title, created_by, description, status, expiration_date, unit_price, url, img_url, category_id, required_stock, min_contribution, user_stock, visible) => { 
    const query = await pool.query('INSERT INTO POST (title, created_by, description, status, expiration_date, unit_price, url, img_url, category_id, required_stock, min_contribution, user_stock, visible) VALUES ($1, (SELECT id FROM usuario WHERE id = $2), $3, $4, $5, $6, $7, $8, (SELECT id FROM category WHERE id = $9), $10, $11, $12, $13) RETURNING *',
    [title, created_by, description, status, expiration_date, unit_price, url, img_url, category_id, required_stock, min_contribution, user_stock, visible])
    console.log(query.rows)
    return query.rows;
}

export {getPostModel, createPostModel};