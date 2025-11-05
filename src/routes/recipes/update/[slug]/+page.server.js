import { fail, redirect } from '@sveltejs/kit';
import { connectToDB } from '$lib/database/db';
import { checkTitleBeforeCreate, checkInstructionsBeforeCreate } from '../../../database/database';

async function validateCreate(client, creationValues) {
	let isOK = true;
	if (isOK) {
		isOK = await checkTitleBeforeCreate(client, creationValues[0]);
	}
	if (isOK) {
		isOK = await checkInstructionsBeforeCreate(client, creationValues[2]);
	}
	return isOK;
}

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
	// TODO this code is EXTREMELY not DRY. Move this to functions
	// and update this and create/+page.server.js
	update: async ({ request }) => {
		const data = await request.formData();
		// create the jsonb objects
		console.log(data);
		const instructions = {};
		instructions['steps'] = [];
		for (let i = 0; i < data.get('instruction-count'); i++) {
			instructions['steps'].push(data.get('step-' + i));
		}
		instructions['intro'] = data.get('recipe-blurb');

		const ingredients = {};
		for (let i = 0; i < data.get('ingredient-count'); i++) {
			ingredients[data.get('ingred-' + i)] = data.get('ingred-amount-' + i);
		}

		const client = await connectToDB();
		// const q = 'INSERT INTO recipes(title, slug, instructions, ingredients) VALUES ($1, $2, $3, $4)';
		const q =
			'UPDATE recipes SET title = $1, slug = $2, instructions = $3, ingredients = $4 WHERE id = $5';
		const values = [
			data.get('recipe-name'),
			// I think resolve() actually removes the need to replace spaces in slug
			data.get('recipe-name'),
			JSON.stringify(instructions),
			JSON.stringify(ingredients),
			data.get('recipe-id')
		];

		try {
			await client.query('BEGIN');
			await validateCreate(client, values);

			console.log('Trying to update');
			const resp = await client.query(q, values);

			if (resp.rowCount != 1) {
				throw new Error('Found ' + resp.rowCount + ' rows instead of 1');
			}
			console.log('Actually updated??');
			// console.log(resp);
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
