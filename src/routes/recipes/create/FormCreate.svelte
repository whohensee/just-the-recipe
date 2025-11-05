<script>
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

<form method="POST" action="?/{action}">
	<h1>{action} a recipe</h1>

	{#if form?.error}
		<p class="error">{form.error}</p>
	{/if}

	<div class="question">
		<label for="recipe-name">Recipe Name</label>
		<input name="recipe-name" type="text" autocomplete="off" value={recipe?.title ?? ''} required />
	</div>

	<div class="question">
		<label for="recipe-blurb">Recipe Paragraph</label>
		<textarea name="recipe-blurb" value={recipe?.instructions.intro ?? ''} required></textarea>
	</div>

	<button
		type="button"
		onclick={() => {
			instructions.push(instructions.length);
		}}>Add Step</button
	>
	<button
		type="button"
		onclick={() => {
			instructions.pop(instructions.length);
		}}>Remove Step</button
	>

	{#each instructions as step, i (step)}
		<div class="question">
			<label for="step-{step}">Step {step.id}</label>
			<textarea name="step-{step}" value={recipe?.instructions.steps[i] ?? ''} required></textarea>
		</div>
	{/each}

	<button
		type="button"
		onclick={() => {
			ingredients.push(ingredients.length);
		}}>Add Ingredient</button
	>
	<button
		type="button"
		onclick={() => {
			ingredients.pop(ingredients.length);
		}}>Remove Ingredient</button
	>

	{#each ingredients as step, i (step)}
		<div class="question">
			<label for="ingred-{step}">ingredient</label>
			<input
				type="text"
				name="ingred-{step}"
				autocomplete="off"
				value={recipe ? Object.keys(recipe.ingredients)[i] : ''}
				required
			/>

			<label for="ingred-amount-{step}">amount</label>
			<input
				type="text"
				name="ingred-amount-{step}"
				autocomplete="off"
				value={recipe ? Object.values(recipe.ingredients)[i] : ''}
				required
			/>
		</div>
	{/each}

	<input type="hidden" name="instruction-count" value={instructions.length} />
	<input type="hidden" name="ingredient-count" value={ingredients.length} />

	<button>Submit</button>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.error {
		color: red;
	}
</style>
