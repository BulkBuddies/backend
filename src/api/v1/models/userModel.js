import pool from "../../../../config/db/db.js";
import bcrypt from "bcrypt";
import { createNewError } from "../helpers/requestError.js";

const createUser = async (user) => {
  try {
    let { first_name, last_name, email, username, password, type } = user;

    //RAMON
    if (type === "google") {
      password = "";
    }

    const hashedPass = await bcrypt.hash(password, 10);
    const sqlQuery = {
      text: "INSERT INTO usuario (first_name, last_name, email, username, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      values: [first_name, last_name, email, username, hashedPass],
    };
    const response = await pool.query(sqlQuery);
    return response.rows[0];
  } catch (error) {
    console.log(error);
    throw createNewError(error.code);
  }
};

const uniqueUsername = async (username) => {
  const sqlQuery = {
    text: "SELECT id FROM usuario WHERE username = $1",
    values: [username],
  };
  const { rowCount } = await pool.query(sqlQuery);
  return rowCount;
};

const byEmail = async (email, password) => {
  const sqlQuery = {
    text: "SELECT id, email, username, refresh_token, password FROM usuario where email = $1",
    values: [email],
  };
  const { rowCount, rows } = await pool.query(sqlQuery);
  if (rowCount === 0) {
    throw createNewError("auth_01");
  }
  const user = rows[0];
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw createNewError("auth_02");
  }
  return user;
};

const getAll = async () => {
  try {
    const sqlQuery = {
      text: "SELECT first_name, last_name, email, username FROM usuario",
    };
    const users = await pool.query(sqlQuery);
    return users.rows;
  } catch (error) {
    console.log(error);
  }
};

const updateRefreshToken = async (refreshToken, id) => {
  try {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    const sqlQuery = {
      text: "UPDATE usuario SET refresh_token = $1 WHERE id = $2",
      values: [hashedRefreshToken, id],
    };

    await pool.query(sqlQuery);
  } catch (error) {
    throw createNewError(error.code);
  }
};

export { createUser, byEmail, getAll, updateRefreshToken, uniqueUsername };
