import pool from '../../../../config/db/db.js';

const getPostModel = async () => { 
    const query = await pool.query('SELECT id , title, description, status, product_id FROM POST WHERE visible = true')
    return query.rows;
}

const createPostModel = async (title, description, status, product_id) => { 
    const query = await pool.query('INSERT INTO POST (title, description, status, product_id, visible) SELECT $1, $2, $3, id, true FROM product WHERE id = $4 RETURNING *',
    [title, description, status, product_id])
    console.log(query.rows)
    return query.rows;
}

export {getPostModel, createPostModel};