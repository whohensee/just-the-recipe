<script>
	import { theme } from '$lib/themes/basicTheme';
	// a deeply reactive array, ideally
	let instructions = $state([0]);
	let ingredients = $state([0]);
	let { form, action, recipe } = $props();

	// ensure instructions length matches recipe steps length
	if (recipe) {
		const recipe_steps = recipe.instructions.steps.length;
		for (let i = 0; i < recipe_steps - 1; i++) {
			instructions.push(instructions.length);
		}
	}

	// ensure ingredients length matches recipe ingredients length
	if (recipe) {
		const ingred_count = Object.keys(recipe.ingredients).length;
		for (let i = 0; i < ingred_count - 1; i++) {
			ingredients.push(ingredients.length);
		}
	}
</script>

<form
	method="POST"
	action="?/{action}"
	style="--lightpurple: {theme.header_color}; --grey: #B8B8B8"
>
	{#if form?.error}
		<p class="error">{form.error}</p>
	{/if}

	<div class="question">
		<label for="create-pwd">Admin Password</label>
		<input name="create-pwd" type="password" autocomplete="off" required />
	</div>

	<div class="question">
		<label for="recipe-name">Recipe Name</label>
		<input name="recipe-name" type="text" autocomplete="off" value={recipe?.title ?? ''} required />
	</div>

	<div class="question">
		<label for="recipe-blurb">Recipe Description</label>
		<textarea
			name="recipe-blurb"
			value={recipe?.instructions.intro ?? ''}
			style:height="6rem"
			required
		></textarea>
	</div>

	<div class="question">
		<p class="label">Instructions</p>

		<div class="buttonHolder">
			<button
				type="button"
				onclick={() => {
					instructions.push(instructions.length);
				}}>Add</button
			>
			<button
				type="button"
				onclick={() => {
					instructions.pop(instructions.length);
				}}>Remove</button
			>
		</div>
		{#each instructions as step, i (step)}
			<div class="question">
				<label class="sublabel" for="step-{step}">Step {i + 1}{step.id}</label>
				<textarea name="step-{step}" value={recipe?.instructions.steps[i] ?? ''} required
				></textarea>
			</div>
		{/each}
	</div>

	<div class="question">
		<p class="label">Ingredients</p>

		<div class="buttonHolder">
			<button
				type="button"
				onclick={() => {
					ingredients.push(ingredients.length);
				}}>Add</button
			>
			<button
				type="button"
				onclick={() => {
					ingredients.pop(ingredients.length);
				}}>Remove</button
			>
		</div>

		{#each ingredients as step, i (step)}
			<div class="subquestionHolder">
				<div class="subquestion">
					<label class="sublabel" for="ingred-{step}">ingredient</label>
					<input
						type="text"
						class="ingredients"
						name="ingred-{step}"
						autocomplete="off"
						value={recipe ? Object.keys(recipe.ingredients)[i] : ''}
						required
					/>
				</div>
				<div class="subquestion">
					<label class="sublabel" for="ingred-amount-{step}">amount</label>
					<input
						type="text"
						class="ingredients"
						name="ingred-amount-{step}"
						autocomplete="off"
						value={recipe ? Object.values(recipe.ingredients)[i] : ''}
						required
					/>
				</div>
			</div>
		{/each}
	</div>

	<input type="hidden" name="instruction-count" value={instructions.length} />
	<input type="hidden" name="ingredient-count" value={ingredients.length} />
	<input type="hidden" name="recipe-id" value={recipe?.id ?? ''} />

	<button>Submit</button>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
	}
	.error {
		color: red;
	}

	.question {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 1rem 0rem;
		width: 100%;
	}

	input,
	textarea {
		background-color: var(--grey);
		border: 0px;
		border-radius: 8px;
		font-size: large;
		padding: 0.25rem 1rem;
		text-align: center;
		width: 500px;
	}

	textarea {
		resize: vertical;
	}

	label,
	.label {
		font-size: xx-large;
	}

	label.sublabel {
		font-size: large;
	}

	.buttonHolder {
		display: flex;
		justify-content: center;
		gap: 1rem;
		width: 250px;
	}

	.subquestionHolder {
		flex-direction: row;
		display: flex;
		gap: 1rem;
	}
	.subquestion {
		display: flex;
		flex-direction: column;
		margin: 0.5rem 0rem;
		width: 200px;
		flex: 1 0 350px;
	}

	input.ingredients {
		width: 100%;
		text-align: left;
	}
	button {
		flex: 1;
		padding: 0.5rem 0.25rem;
		background-color: var(--grey);
		border: 2px solid white;
		border-radius: 8px;
		font-size: large;
	}
</style>
