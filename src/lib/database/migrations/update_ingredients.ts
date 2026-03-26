import { Pool } from 'pg';
import 'dotenv/config';
import type { ingredients } from '$lib/types';

// Goal: connect to the db, pull the first recipe with an ID that isn't yet used
// then update the ingredients into the new format.
// repeat until none are left.

const pool = new Pool({
	connectionString: process.env.RAILWAY_DB_CONN_STRING
});

const client = await pool.connect();

const used_IDs = [];
const TABLE_NAME = 'recipes';

function expand_array_for_query(arr: number[]) {
	let array_string = '(';
	console.log(arr.length);
	if (arr.length > 0) {
		for (const elem in arr) {
			array_string += String(elem) + ', ';
		}
		array_string = array_string.slice(0, -2);
	}
	array_string += ')';
	return array_string;
}

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

	for (let i = 0; i < result.rows.length; i++) {
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
} catch (error) {
	console.log('Query failed.');
	// console.log(result)
	console.log(error);
}

console.log('Closing Successfully');
client.release();
pool.end();
