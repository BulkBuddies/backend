import pool from "../../../../config/db/db.js";
import bcrypt from "bcrypt";
import { createNewError } from "../helpers/requestError.js";
import { text } from "express";
import crypto from "node:crypto";
import format from "pg-format";
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
  const sqlQuery = {
    text: "SELECT id, first_name, last_name, email, username, type FROM usuario",
  };
  const users = await pool.query(sqlQuery);
  return users.rows;
};

const findUserBy = async (identifier, newValue) => {
  const sqlQuery = {
    text: format(
      "SELECT id, first_name, last_name, email, username, type from usuario WHERE %I = $1",
      identifier
    ),
    values: [newValue],
  };
  const { rows } = await pool.query(sqlQuery);
  const user = rows[0];
  return user;
};

const deleteUserById = async (id) => {
  const sqlQuery = {
    text: "DELETE FROM usuario WHERE id = $1 RETURNING *",
    values: [id],
  };
  const { rowCount, rows } = await pool.query(sqlQuery);
  if (rowCount === 0) throw createNewError("auth_01");
  return rows[0];
};

const updatePassword = async (userId, newPassword) => {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const sqlQuery = {
    text: "UPDATE usuario SET password = $1 WHERE id = $2 RETURNING *",
    values: [hashedPassword, userId],
  };
  const { rowCount } = await pool.query(sqlQuery);
  if (rowCount === 0) throw createNewError("auth_01");
};


export {
  createUser,
  verifyUser,
  getAll,
  uniqueUsername,
  findUserBy,
  deleteUserById,
  updatePassword
};
