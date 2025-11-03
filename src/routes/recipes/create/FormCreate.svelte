<script>
	// a deeply reactive array, ideally
	let instructions = $state([0]);
	let ingredients = $state([0]);
	let { form } = $props();
</script>

<form method="POST" action="?/create">
	<h1>Create a Recipe</h1>

	{#if form?.error}
		<p class="error">{form.error}</p>
	{/if}

	<div class="question">
		<label for="recipe-name">Recipe Name</label>
		<input name="recipe-name" type="text" autocomplete="off" required />
	</div>

	<div class="question">
		<label for="recipe-blurb">Recipe Paragraph</label>
		<textarea name="recipe-blurb" required></textarea>
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
			<textarea name="step-{step}" required></textarea>
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
			<input type="text" name="ingred-{step}" autocomplete="off" required />

			<label for="ingred-amount-{step}">amount</label>
			<input type="text" name="ingred-amount-{step}" autocomplete="off" required />
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
