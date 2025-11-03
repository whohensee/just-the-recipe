export async function checkIfSlugUnique(client, slug) {
	if (slug === '') {
		throw new Error('slug (title) must not be empty');
	}

	const q = 'SELECT slug FROM recipes WHERE slug = $1';
	const values = [slug];
	console.log('Trying to check slug:' + slug);
	const resp = await client.query(q, values);
	if (resp.rowCount) {
		console.log('ERROR: Slug exists already');
		throw new Error('slug (title) already exists in database');
	} else {
		console.log('Slug is okay');
		return true;
	}
}
