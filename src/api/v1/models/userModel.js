import pool from "../../../../config/db/db.js";
import bcrypt from "bcrypt";
import { createNewError } from "../helpers/requestError.js";

const createUser = async (user) => {
  let { first_name, last_name, email, username, password } = user;
  const hashedPass = await bcrypt.hash(password, 10);
  const sqlQuery = {
    text: "INSERT INTO public.user (first_name, last_name, email, username, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    values: [first_name, last_name, email, username, hashedPass],
  };
  const response = await pool.query(sqlQuery);
  return response.rows[0];
};

const byEmail = async (email, password) => {
  const sqlQuery = {
    text: "SELECT email, username, refresh_token, password FROM public.user where email = $1",
    values: [email],
  };
  const { rowCount, rows } = await pool.query(sqlQuery);
  if (rowCount === 0) {
    throw createNewError("auth_01");
  }
  const user = rows[0];
  const isPasswordValid = await bcrypt.compare(password, user.password);
  console.log(isPasswordValid);
  if (!isPasswordValid) {
    throw createNewError("auth_02");
  }
  const { password: pwd, ...rest } = user;
  return rest;
};

const getAll = async () => {
  try {
    const sqlQuery = {
      text: "SELECT first_name, last_name, email, username FROM public.user",
    };
    const users = await pool.query(sqlQuery);
    return users.rows;
  } catch (error) {
    console.log(error);
  }
};

const addRefreshToken = async (refreshToken) => {
  const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
  try {
    const sqlQuery = {
      text: "UPDATE public.user SET refresh_token = $1",
      values: [hashedRefreshToken],
    };
  } catch (error) {}
};

export { createUser, byEmail, getAll };
