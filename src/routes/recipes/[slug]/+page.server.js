import { connectToDB } from '$lib/database/db';

export async function load({ params }) {
	const client = await connectToDB();
	const q1 = await client.query(
		'SELECT title, slug, instructions, imgurl, ingredients FROM recipes'
	);
	let recipes = q1.rows ?? [];
	client.release();

	const recipe = recipes.find((recipe) => recipe.slug === params.slug);

	return {
		recipe
	};
}
