<script>
	let { data } = $props();
	import Instructions from './Instructions.svelte';
	import Ingredients from './Ingredients.svelte';
</script>

{#if data.recipe}
	<div class="wrapper">
		<h1>{data.recipe.title}</h1>
		<div class="content">
			<Instructions instructionText={data.recipe.instructions} />
			<Ingredients ingredientText={data.recipe.ingredients} />
		</div>
	</div>
{:else}
	<h1>There's no recipe here!</h1>
{/if}

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.content {
		display: flex;
		justify-content: space-between;
		max-width: 1000px;
		width: 100%;
	}
</style>
