<script>
	// a deeply reactive array, ideally
	let instructions = $state([]);
	let ingredients = $state([]);
</script>

<form method="POST" action="?/create">
	<h1>Create a Recipe</h1>

	<div class="question">
		<label for="recipe-name">Recipe Name</label>
		<input name="recipe-name" type="text" autocomplete="off" />
	</div>

	<div class="question">
		<label for="recipe-blurb">Recipe Paragraph</label>
		<textarea name="recipe-blurb"></textarea>
	</div>

	<button
		type="button"
		onclick={() => {
			instructions.push(instructions.length);
		}}>Add Step</button
	>

	{#each instructions as step (step)}
		<div class="question">
			<label for="step-{step}">Step {step.id}</label>
			<textarea name="step-{step}"></textarea>
		</div>
	{/each}

	<button
		type="button"
		onclick={() => {
			ingredients.push(ingredients.length);
		}}>Add Ingredient</button
	>

	{#each ingredients as step (step)}
		<div class="question">
			<label for="ingred-{step}">ingredient</label>
			<input type="text" name="ingred-{step}" autocomplete="off" />

			<label for="ingred-amount-{step}">amount</label>
			<input type="text" name="ingred-amount-{step}" autocomplete="off" />
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
</style>
