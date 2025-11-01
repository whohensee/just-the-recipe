import { connectToDB } from '$lib/database/db';

export const actions = {
	create: async ({ request }) => {
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
		const q = 'INSERT INTO recipes(title, slug, instructions, ingredients) VALUES ($1, $2, $3, $4)';
		const values = [
			data.get('recipe-name'),
			data.get('recipe-name'), // This needs to be a find and replace whitespace with dashes
			JSON.stringify(instructions),
			JSON.stringify(ingredients)
		];

		console.log('Trying to insert');
		await client.query(q, values);
		console.log('Actually inserted??');
		client.release();
	}
};
