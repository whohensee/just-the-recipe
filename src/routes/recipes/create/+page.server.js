import { fail, redirect } from '@sveltejs/kit';
import { connectToDB } from '$lib/database/db';
import { CREATE_PWD } from '$env/static/private';
import {
	checkSlugBeforeCreate,
	checkTitleBeforeCreate,
	checkInstructionsBeforeCreate
} from '../../database/database';

async function validateCreate(client, creationValues) {
	let isOK = true;
	// this can be refactored to feel more clean
	if (isOK) {
		isOK = await checkSlugBeforeCreate(client, creationValues[1]);
	}
	if (isOK) {
		isOK = await checkTitleBeforeCreate(client, creationValues[0]);
	}
	if (isOK) {
		isOK = await checkInstructionsBeforeCreate(client, creationValues[2]);
	}
	return isOK;
}

export const actions = {
	create: async ({ request }) => {
		const data = await request.formData();

		// check the creation password
		try {
			if (data.get('create-pwd') != CREATE_PWD) {
				throw new Error('Wrong creation password');
			}
		} catch (error) {
			return fail(422, {
				title: data.get('recipe-name'),
				error: error.message
			});
		}

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
		const q = 'INSERT INTO recipes(title, slug, instructions, ingredients) VALUES ($1, $2, $3, $4)';
		const values = [
			data.get('recipe-name'),
			// I think resolve() actually removes the need to replace spaces in slug
			data.get('recipe-name'),
			JSON.stringify(instructions),
			JSON.stringify(ingredients)
		];

		try {
			await validateCreate(client, values);

			console.log('Trying to insert');
			await client.query(q, values);
			console.log('Actually inserted??');
		} catch (error) {
			client.release();
			console.log('Returning fail');
			return fail(422, {
				title: values[0],
				error: error.message
			});
		}
		client.release();
		redirect(303, '/');
	}
};
