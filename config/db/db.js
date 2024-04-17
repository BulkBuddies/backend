import pg from "pg";
import "dotenv/config";
const { Pool } = pg;

// Crear un nuevo grupo de conexiones (pool) para interactuar con la base de datos
const pool = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  allowExitOnIdle: true,
  ssl: true,
});

pool.query('SELECT NOW()', (err,res) =>{
  res ? console.log('DB-Connected', res.rows[0].now) : console.log({err});
});


export default pool;
