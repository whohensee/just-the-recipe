import { Pool } from 'pg';
import { env } from '$env/dynamic/private';

console.log('trying the pool');
const pool = new Pool({
	connectionString: env.RAILWAY_DB_CONN_STRING
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
