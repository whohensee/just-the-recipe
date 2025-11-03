export async function checkSlugBeforeCreate(client, slug) {
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

export async function checkTitleBeforeCreate(client, target) {
	if (target === '') {
		throw new Error('Title must not be empty');
	}

	return true;
}

export async function checkInstructionsBeforeCreate(client, target) {
	const targetobj = JSON.parse(target);
	if (targetobj.intro === '') {
		throw new Error('Description must not be empty');
	}
	if (targetobj.steps.length === 0) {
		throw new Error('Must be at least one instruction step');
	}

	return true;
}
