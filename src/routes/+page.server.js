import { connectToDB } from '$lib/database/db';

// connect to db and form the recipes object
const client = await connectToDB();
// probably put in some error handling here, eventually
const q1 = await client.query('SELECT title, slug, instructions, imgurl, ingredients FROM recipes');
const recipes = q1.rows ?? [];
client.release();

export function load() {
	return {
		recipes
	};
}
