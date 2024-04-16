import pool from "../../../../config/db/db.js";
import bcrypt from "bcrypt";

const createUser = async (user) => {
  let { first_name, last_name, email, username, password } = user;
  const hashedPass = bcrypt.hashSync(password);
  const sqlQuery = {
    text: "INSERT INTO user (first_name, last_name, email, username, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    values: [first_name, last_name, email, username, hashedPass],
  };
  const response = await pool.query(sqlQuery);
  return response.rows[0];
};

const byEmail = async (email, password) => {
  const sqlQuery = {
    text: "SELECT * FROM user where email = $1",
    values: [email],
  };
  const response = await pool.query(sqlQuery);
  const user = response.rows[0];
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return sendErrorResponse(res, "auth_02");
  }
  return user;
};

const getAll = async () => {
  try {
    const sqlQuery = {
      text: "SELECT first_name, last_name, email, username, password FROM user",
    };
    const users = await pool.query(sqlQuery);
    return users.rows;
  } catch (error) {
    console.log(error);
  }
};

export { createUser, byEmail, getAll };
