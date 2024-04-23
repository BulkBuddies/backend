import pg from "pg";
import "dotenv/config";
const { Pool } = pg;
import chalk from "chalk";
// Crear un nuevo grupo de conexiones (pool) para interactuar con la base de datos
const pool = new Pool({
  host: process.env.HOST,
  user: process.env.DBUSER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
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
