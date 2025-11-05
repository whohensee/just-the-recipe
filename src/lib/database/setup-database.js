import { Pool } from 'pg';
import 'dotenv/config';
import { recipes } from '../data/recipes.js';

const pool = new Pool({
	database: process.env.DB_DBNAME,
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	password: process.env.DB_PWD
});

const client = await pool.connect();

// drop the table if it exists
const TABLE_NAME = 'recipes';
console.log('Dropping table ' + TABLE_NAME);
try {
	await client.query('DROP TABLE ' + TABLE_NAME);
	console.log('Table dropped');
} catch {
	console.log('Table did not exist');
}

// create the table
console.log('Creating table');

try {
	await client.query(
		'CREATE TABLE recipes (' +
			'id int GENERATED ALWAYS AS IDENTITY,' +
			'title text NOT NULL,' +
			'slug text UNIQUE NOT NULL,' +
			'instructions jsonb NOT NULL,' +
			'imgurl text,' +
			'ingredients jsonb NOT NULL )'
	);
} catch {
	console.log('failed to create table');
}

// populate the table
console.log('--Populating Table--');
for (const recipe of recipes) {
	let q =
		'INSERT INTO recipes(title, slug, instructions, imgurl, ingredients) VALUES ($1, $2, $3, $4, $5)';
	const values = [
		recipe.title,
		recipe.slug,
		JSON.stringify(recipe.instructions),
		recipe.imgURL,
		JSON.stringify(recipe.ingredients)
	];
	try {
		await client.query(q, values);
		console.log('  Added: ' + recipe.title);
	} catch {
		console.log('  FAILED to add: ' + recipe.title);
	}
}

console.log('Closing Successfully');
client.release();
pool.end();
