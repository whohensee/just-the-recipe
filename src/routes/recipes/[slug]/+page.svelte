<script>
	let { data } = $props();
</script>

{#if data.recipe}
	<h1>{data.recipe.title}</h1>
	<h2>Ingredients</h2>
	<p>{data.recipe.ingredients}</p>
	<h2>Instructions</h2>
	<p>{data.recipe.instructions}</p>
{:else}
	<h1>There's no recipe here!</h1>
{/if}
