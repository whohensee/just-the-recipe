import { Pool } from 'pg';
import { RAILWAY_DB_CONN_STRING } from '$env/static/private';

const pool = new Pool({ connectionString: RAILWAY_DB_CONN_STRING });

export const connectToDB = async () => await pool.connect();
