import { Pool } from 'pg';
import 'dotenv/config';

const pool = new Pool({
	database: process.env.R_DB_DBNAME,
	user: process.env.R_DB_USER,
	host: process.env.R_DB_HOST,
	port: process.env.R_DB_PORT,
	password: process.env.R_DB_PWD
});

const client = await pool.connect();

let q = 'SELECT 1';
const resp = client.query(q);
console.log(resp);

client.release();
pool.end();
