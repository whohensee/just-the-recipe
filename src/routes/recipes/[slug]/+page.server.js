import { connectToDB } from '$lib/database/db';
import { DELETE_PWD } from '$env/static/private';
import { redirect, fail } from '@sveltejs/kit';

export async function load({ params }) {
	const client = await connectToDB();
	const q1 = await client.query(
		'SELECT id, title, slug, instructions, imgurl, ingredients FROM recipes'
	);
	let recipes = q1.rows ?? [];
	client.release();

	const recipe = recipes.find((recipe) => recipe.slug === params.slug);

	return {
		recipe
	};
}

export const actions = {
	delete: async ({ request }) => {
		const data = await request.formData();

		// check the pwd
		if (data.get('pwd') != DELETE_PWD) {
			console.log('expected: ' + DELETE_PWD + '\nreceived: ' + data.get('pwd'));
			throw new Error('Wrong deletion password');
		}

		if (!data.get('recipe-id')) {
			throw new Error('No recipe id');
		}

		const client = await connectToDB();
		const q = 'DELETE FROM recipes WHERE id = $1';
		const values = [data.get('recipe-id')];

		try {
			await client.query('BEGIN');

			console.log('Trying to delete');
			const resp = await client.query(q, values);

			if (resp.rowCount != 1) {
				throw new Error('Found ' + resp.rowCount + ' rows instead of 1');
			}
			await client.query('COMMIT');
		} catch (error) {
			await client.query('ROLLBACK');
			console.log('Returning fail');
			return fail(422, {
				title: values[0],
				error: error.message
			});
		} finally {
			client.release();
		}
		redirect(303, '/');
	}
};
