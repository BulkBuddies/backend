import pool from "../../../../config/db/db.js";
import bcrypt from "bcrypt";
import { createNewError } from "../helpers/requestError.js";
import { text } from "express";
import crypto from "node:crypto";

const createUser = async (user) => {
  try {
    let { first_name, last_name, email, username, password, type } = user;

    if (type === "google") {
      password = crypto.randomUUID().split("-").join("").slice(-10);
    }

    const hashedPass = await bcrypt.hash(password, 10);
    const sqlQuery = {
      text: "INSERT INTO usuario (first_name, last_name, email, username, password, type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      values: [first_name, last_name, email, username, hashedPass, type],
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

const verifyUser = async (email, password) => {
  const sqlQuery = {
    text: "SELECT * FROM usuario where email = $1",
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
  const { password: pwd, ...rest } = rows[0];
  return rest;
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

const findUserByEmail = async (newEmail) => {
  const sqlQuery = {
    text: "SELECT id, first_name, last_name, email, username, type from usuario WHERE email = $1",
    values: [newEmail],
  };
  const { rowCount, rows } = await pool.query(sqlQuery);
  if (rowCount === 1) {
    return rows[0];
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

export {
  createUser,
  verifyUser,
  getAll,
  updateRefreshToken,
  uniqueUsername,
  findUserByEmail,
};
