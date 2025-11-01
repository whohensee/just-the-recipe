import { connectToDB } from '$lib/database/db';

// connect to db and form the recipes object

export async function load() {
	const client = await connectToDB();

	const q1 = await client.query(
		'SELECT title, slug, instructions, imgurl, ingredients FROM recipes'
	);
	let recipes = q1.rows ?? [];
	client.release();
	return {
		recipes
	};
}
