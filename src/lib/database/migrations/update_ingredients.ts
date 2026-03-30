import { Pool } from 'pg';
import 'dotenv/config';
import type { ingredients } from '$lib/types';

const pool = new Pool({
	connectionString: process.env.RAILWAY_DB_CONN_STRING
});

const client = await pool.connect();

const TABLE_NAME = 'recipes';

function turn_old_ingredients_into_new(old_ingred) {
	const new_ingred = [];
	for (const [key, value] of Object.entries(old_ingred)) {
		new_ingred.push({
			name: key,
			amount: value
		});
	}
	return new_ingred;
}

try {
	const qstring = 'SELECT id, ingredients FROM ' + TABLE_NAME;

	console.log(qstring);
	let result = await client.query(qstring);
	console.log('Query successful');

	await client.query('BEGIN');

	for (let i = 0; i < result.rows.length; i++) {
		const old_ingredients = result.rows[i].ingredients;

		// console.log(!Array.isArray(old_ingredients));
		if (!Array.isArray(old_ingredients)) {
			const new_ingredients = turn_old_ingredients_into_new(result.rows[i].ingredients);

			const qstring = 'UPDATE recipes SET ingredients = $1 WHERE id = $2';
			const values = [JSON.stringify(new_ingredients), result.rows[i].id];

			try {
				await client.query(qstring, values);
				console.log('Modified row with id: ' + result.rows[i].id);
			} catch (error) {
				console.log(error);
			}
		}
		await client.query('COMMIT');
	}
} catch (error) {
	console.log('Query failed.');
	await client.query('ROLLBACK');
	// console.log(result)
	console.log(error);
}

console.log('Closing Successfully');
client.release();
pool.end();
