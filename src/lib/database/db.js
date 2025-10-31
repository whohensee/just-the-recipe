import { Pool } from 'pg';
import { DB_HOST, DB_PORT, DB_USER, DB_PWD, DB_DBNAME } from '$env/static/private';

const pool = new Pool({
	database: DB_DBNAME,
	user: DB_USER,
	host: DB_HOST,
	port: DB_PORT,
	password: DB_PWD
});

export const connectToDB = async () => await pool.connect();
