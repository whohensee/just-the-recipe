import { Pool } from 'pg';
// import { RAILWAY_DB_CONN_STRING } from '$env/static/private';
import { TEST_DB_CONNSTRING } from '$env/static/private';

// const pool = new Pool({ connectionString: RAILWAY_DB_CONN_STRING });
const pool = new Pool({ connectionString: TEST_DB_CONNSTRING });

export const connectToDB = async () => await pool.connect();
