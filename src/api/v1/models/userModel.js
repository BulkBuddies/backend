import pool from "../../../../config/db/db.js";
import bcrypt from "bcrypt";
import { createNewError } from "../helpers/requestError.js";

const createUser = async (user) => {
  let { first_name, last_name, email, username, password } = user;
  const hashedPass = await bcrypt.hash(password, 10);
  console.log(hashedPass);
  const sqlQuery = {
    text: "INSERT INTO public.user (first_name, last_name, email, username, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    values: [first_name, last_name, email, username, hashedPass],
  };
  const response = await pool.query(sqlQuery);
  return response.rows[0];
};

const byEmail = async (email, password) => {
  const sqlQuery = {
    text: "SELECT * FROM public.user where email = $1",
    values: [email],
  };
  const response = await pool.query(sqlQuery);
  const user = response.rows[0];
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw createNewError("auth_02");
  }
  return user;
};

const getAll = async () => {
  try {
    const sqlQuery = {
      text: "SELECT * FROM public.user",
    };
    const users = await pool.query(sqlQuery);
    return users;
  } catch (error) {
    console.log(error);
  }
};

export { createUser, byEmail, getAll };
