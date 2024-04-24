import pg from "pg";
import "dotenv/config";
const { Pool } = pg;
import chalk from "chalk";
import { TEST_ENV } from "../constants.js";



// Crear un nuevo grupo de conexiones (pool) para interactuar con la base de datos
const pool = new Pool({
  host: TEST_ENV ? process.env.DB_TEST_HOST : process.env.HOST,
  user: TEST_ENV ? process.env.DB_TEST_USER : process.env.DBUSER,
  password: TEST_ENV ? process.env.DB_TEST_PASSWORD : process.env.PASSWORD,
  database: TEST_ENV ? process.env.TEST_DATABASE : process.env.DATABASE,
  allowExitOnIdle: true,
  ssl: true,
});

//console.log(process.env.USER);
//

async () => {
  await pool.query("SELECT NOW()", (err, res) => {
    res
      ? console.log("DB-Connected", chalk.cyan(res.rows[0].now.toString()))
      : console.log({ err });
  });
};

export default pool;
