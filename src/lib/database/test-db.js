import { Pool } from 'pg';
import 'dotenv/config';

console.log('trying the pool');
const pool = new Pool({
	connectionString: process.env.RAILWAY_DB_CONN_STRING
	// connectionString: process.env.TEST_DB_CONNSTRING
});

console.log('Made the pool');
const client = await pool.connect();
console.log('Connected the client.');

let q = 'SELECT 1';
const resp = await client.query(q);
console.log(resp);

client.release();
console.log('Released the client');
pool.end();
console.log('Closed the pool');
