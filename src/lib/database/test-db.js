import { Pool } from 'pg';
import 'dotenv/config';

console.log('trying the pool');
const pool = new Pool({
	connectionString: process.env.RAILWAY_DB_CONN_STRING
});

console.log('Made the pool');
const client = await pool.connect();

let q = 'SELECT 1';
const resp = await client.query(q);
console.log(resp);

client.release();
pool.end();
