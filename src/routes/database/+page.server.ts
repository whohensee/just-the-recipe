import { connectToDB } from '$lib/database/db';

const client = await connectToDB();
const resp = await client.query('SELECT NOW()');
client.release();

export function load() {
	const stats = 'good';
	const resp1: string = resp.rows[0].now ?? 'failed';
	return {
		stats,
		resp1
	};
}
